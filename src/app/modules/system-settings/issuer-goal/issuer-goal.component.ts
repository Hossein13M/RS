import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IssuerGoal, IssuerGoalsService } from 'app/services/App/IssuerGoal/issuer-goal.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import * as _ from 'lodash';

enum StateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'issuer-goal',
    templateUrl: './issuer-goal.component.html',
    styleUrls: ['./issuer-goal.component.scss'],
    animations: fuseAnimations,
})
export class IssuerGoalComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<IssuerGoal> = [];
    column: Array<Column>;
    pagination: PaginationModel = { skip: 0, limit: 15, total: 100 };
    status: StateType = StateType.LOADING;
    public issuerName: FormControl = new FormControl('');
    selectedIssuer = 0;

    constructor(private _issuerGoalsService: IssuerGoalsService, private formBuilder: FormBuilder) {}

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
            return;
        }
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.status = StateType.LOADING;
        this._issuerGoalsService
            .$getIssuerGoal(this.pagination, search)
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((response) => {
                this.data = [...this.data, ...response.items];
                this.pagination.limit = response.limit;
                this.pagination.total = response.total;
                this.status = StateType.PRESENT;
            });
        this.initColumns();
    }

    addIssuer(): void {
        this._issuerGoalsService.addIssuer(this.issuerName.value).subscribe(() => {
            this.data = [];
            this.get();
        });
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
        this._issuerGoalsService.editIssuer(this.selectedIssuer, this.issuerName.value).subscribe(() => {
            this.data = [];
            this.get();
        });
    }

    remove(issuer): void {
        this._issuerGoalsService.deleteIssuer(issuer.id).subscribe(() => {
            this.data = [];
            this.get();
        });
    }
}
