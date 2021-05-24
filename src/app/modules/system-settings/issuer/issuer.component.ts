import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { IssuerDto } from 'app/services/API/models';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IssuerGoal } from '../../../services/App/IssuerGoal/issuer-goal.service';
import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import * as _ from 'lodash';

enum StateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'issuer',
    templateUrl: './issuer.component.html',
    styleUrls: ['./issuer.component.scss'],
    animations: fuseAnimations,
    providers: [IssuersService],
})
export class IssuerComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<IssuerGoal> = [];
    column: Array<Column>;
    pagination: PaginationModel = { skip: 0, limit: 15, total: 100 };
    status: StateType = StateType.LOADING;
    public issuerName: FormControl = new FormControl('');
    selectedIssuer = 0;

    constructor(private _issuerService: IssuersService, private formBuilder: FormBuilder) {
        this.issuerName = new FormControl('');
    }

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'هدف انتشار',
                id: 'name',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER,
                },
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    {
                        name: 'ویرایش',
                        icon: 'create',
                        color: 'accent',
                        operation: ({ row }: any) => this.editIssuer(row),
                    },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: ({ row }: any) => this.remove(row),
                    },
                ],
            },
        ];
    }

    initSearch(): void {
        const mapKeys = _.dropRight(_.map(this.column, 'id'));
        const objectFromKeys = {};
        mapKeys.forEach((id) => {
            objectFromKeys[id] = '';
        });
        this.searchFormGroup = this.formBuilder.group({
            ...objectFromKeys,
        });
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }
        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });
        this.get(this.searchFormGroup.value);
    }

    paginationControl(pageEvent?: PaginationChangeType): void {
        if (this.status === StateType.LOADING) {
            console.log('return')
            return;
        }
        console.log('happened')
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.status = StateType.LOADING;
        this._issuerService
            .$getIssuers(this.pagination, search)
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((response) => {
                this.data = [...this.data, ...response.items];
                this.pagination.limit = response.limit;
                this.pagination.total = response.total;
                this.status = StateType.PRESENT;
            });
    }


    addIssuer(): void {
        this._issuerService.addIssuer(this.issuerName.value).subscribe(() => {});
        this.issuerName.reset();
    }

    editIssuer(issuer): void {
        this.selectedIssuer = issuer.id;
        this.issuerName.setValue(issuer.name);
    }

    clear(): void {
        this.selectedIssuer = 0;
        this.issuerName.setValue('');
    }

    edit(): void {
        this._issuerService.editIssuer(this.selectedIssuer, this.issuerName.value).subscribe(() => {});
    }

    remove(issuer): void {
        this._issuerService.deleteIssuer(issuer.id).subscribe(() => {});
    }
}
