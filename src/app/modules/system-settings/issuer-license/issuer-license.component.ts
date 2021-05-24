import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IssuerLicense } from './issuer-license.model';
import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import * as _ from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IssuerLicenceService } from '../../../services/App/IssuerLicence/issuer-licence.service';

enum StateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'issuer-license',
    templateUrl: './issuer-license.component.html',
    styleUrls: ['./issuer-license.component.scss'],
    animations: fuseAnimations,
})
export class IssuerLicenseComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<IssuerLicense> = [];
    column: Array<Column>;
    pagination: PaginationModel = { skip: 0, limit: 15, total: 100 };
    status: StateType = StateType.LOADING;
    public issuerName: FormControl = new FormControl('');
    selectedIssuer = 0;

    constructor(private issuerLicenceService: IssuerLicenceService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'مجوز سازمان',
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
        console.log(pageEvent);
        if (this.status === StateType.LOADING) {
            return;
        }
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.status = StateType.LOADING;
        this.issuerLicenceService
            .getIssuerLicense(this.pagination, search)
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((response) => {
                this.data = [...this.data, ...response.items];
                this.pagination.limit = response.limit;
                this.pagination.total = response.total;
                this.status = StateType.PRESENT;
            });
    }

    addIssuer(): void {
        this.issuerLicenceService.addIssuer(this.issuerName.value).subscribe(() => {
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
        this.issuerLicenceService.editIssuer(this.selectedIssuer, this.issuerName.value).subscribe((res) => {
            this.get();
        });
    }

    remove(issuer): void {
        this.issuerLicenceService.deleteIssuer(issuer.id).subscribe(() => {
            this.get();
        });
    }
}
