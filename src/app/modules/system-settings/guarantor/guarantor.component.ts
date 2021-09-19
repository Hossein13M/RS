import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Guarantor, GuarantorsService } from 'app/services/App/Guarantor/guarantor.service';
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
    selector: 'guarantor',
    templateUrl: './guarantor.component.html',
    styleUrls: ['./guarantor.component.scss'],
    animations: fuseAnimations,
})
export class GuarantorComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<Guarantor> = [];
    column: Array<Column>;
    pagination: PaginationModel = { skip: 0, limit: 15, total: 100 };
    status: StateType = StateType.LOADING;
    public guarantorForm: FormGroup = new FormGroup({ guarantor: new FormControl(''), type: new FormControl(), otc: new FormControl() });
    selectedGuarantor = 0;

    constructor(private _guarantorService: GuarantorsService, public formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'نام ضامن',
                id: 'guarantor',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER,
                },
            },
            {
                name: 'نوع',
                id: 'type',
                type: 'string',
            },
            {
                name: 'بورسی/غیر بورسی',
                id: 'otc',
                type: 'string',
                convert: (value: number) => (value === 0 ? 'بورسی' : 'غیر بورسی'),
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
        this._guarantorService
            .$getGuarantor(this.pagination, search)
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
        this._guarantorService
            .addGuarantor(this.guarantorForm.controls['guarantor'].value, this.guarantorForm.controls['type'].value, this.guarantorForm.controls['otc'].value)
            .subscribe(() => {
                this.data = [];
                this.get();
            });
        this.guarantorForm.reset();
    }

    editIssuer(guarantor): void {
        this.selectedGuarantor = guarantor.id;
        this.guarantorForm.controls['guarantor'].setValue(guarantor.guarantor);
        this.guarantorForm.controls['type'].setValue(guarantor.type);
        this.guarantorForm.controls['otc'].setValue(guarantor.otc);
    }

    clear(): void {
        this.selectedGuarantor = 0;
        this.guarantorForm.controls['guarantor'].setValue('');
        this.guarantorForm.controls['type'].setValue(null);
        this.guarantorForm.controls['otc'].setValue(null);
    }

    edit(): void {
        this._guarantorService
            .editGuarantor(
                this.selectedGuarantor,
                this.guarantorForm.controls['guarantor'].value,
                this.guarantorForm.controls['type'].value,
                this.guarantorForm.controls['otc'].value
            )
            .subscribe(() => {
                this.data = [];
                this.get();
            });
    }

    remove(guarantor): void {
        this._guarantorService.deleteGuarantor(guarantor.id).subscribe(() => {
            this.data = [];
            this.get();
        });
    }
}
