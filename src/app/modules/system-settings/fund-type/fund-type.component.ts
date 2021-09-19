import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FundType, FundTypesService } from 'app/services/App/FundType/fund-type.service';
import { Column, TableSearchMode } from '#shared/components/table/table.model';
import { PaginationModel } from '#shared/models/pagination.model';
import * as _ from 'lodash';

enum StateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'fund-type',
    templateUrl: './fund-type.component.html',
    styleUrls: ['./fund-type.component.scss'],
    animations: fuseAnimations,
})
export class FundTypeComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<FundType> = [];
    column: Array<Column>;
    pagination: PaginationModel = { skip: 0, limit: 15, total: 100 };
    status: StateType = StateType.LOADING;
    public fundTypeName: FormControl = new FormControl('');
    selectedIssuer = 0;

    constructor(private _fundTypeService: FundTypesService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'نرخ صندوق',
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

    get(search?: any): void {
        this.status = StateType.LOADING;
        this._fundTypeService
            .$getFundTypes(search)
            .subscribe((response) => {
                this.data = [...response];
                this.status = StateType.PRESENT;
            });
        this.initColumns();
    }

    addIssuer(): void {
        this._fundTypeService.addFundType(this.fundTypeName.value).subscribe(() => {
            this.data = [];
            this.get();
        });
        this.fundTypeName.reset();
    }

    editIssuer(fundType): void {
        this.selectedIssuer = fundType.id;
        this.fundTypeName.setValue(fundType.name);
    }

    clear(): void {
        this.selectedIssuer = 0;
        this.fundTypeName.setValue('');
    }

    edit(): void {
        this._fundTypeService.editFundType(this.selectedIssuer, this.fundTypeName.value).subscribe(() => {
            this.data = [];
            this.get();
        });
    }

    remove(fundType): void {
        this._fundTypeService.deleteFundType(fundType.id).subscribe(() => {
            this.data = [];
            this.get();
        });
    }
}
