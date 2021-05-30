import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { IssueDate, IssueStartEndDateService } from 'app/services/issue-start-end-date/issue-start-end-date.service';
import * as moment from 'jalali-moment';
import { Column, PaginationChangeType } from '#shared/components/table/table.model';
import * as _ from 'lodash';
import { PaginationModel } from '#shared/models/pagination.model';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    animations: fuseAnimations,
})
export class DateComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: Array<IssueDate> = [];
    column: Array<Column> = [];
    pagination: PaginationModel = { skip: 0, limit: 5, total: 100 };
    public selectedDate: number;
    public dateForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<DateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private dateService: IssueStartEndDateService,
        private formBuilder: FormBuilder
    ) {
        this.dateForm = this.formBuilder.group({
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.matDialogRef.beforeClosed().subscribe((r) => {
            this.matDialogRef.close(this.data[this.data.length - 1]);
        });
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'startDate',
                name: 'تاریخ شروع پذیره نویسی',
                type: 'date',
            },
            {
                id: 'endDate',
                name: 'تاریخ پایان پذیره نویسی',
                type: 'date',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({row}: any) => this.editDate(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.deleteDate(row.id) },
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

    paginationControl(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.dateService.getDate(this._data.id, search).subscribe((response) => {
            this.data = [...response.items];
            this.pagination.limit = response.limit;
            this.pagination.total = response.total;
        });
        this.initColumns();
    }

    add(): void {
        this.dateService
            .addDate(
                this._data.id,
                this.dateForm.controls['startDate'].value.locale('en').format('YYYY-MM-DD'),
                this.dateForm.controls['endDate'].value.locale('en').format('YYYY-MM-DD')
            )
            .subscribe(() => {
                this.get();
            });
        this.clear();
    }

    edit(): void {
        this.dateService
            .editDate(
                this.selectedDate,
                moment(this.dateForm.controls['startDate'].value).locale('en').format('YYYY-MM-DD'),
                moment(this.dateForm.controls['endDate'].value).locale('en').format('YYYY-MM-DD')
            )
            .subscribe(() => {
                this.get();
            });
        this.clear();
    }

    deleteDate(id): void {
        this.dateService.delete(id).subscribe(() => {
            this.get();
        });
    }

    editDate(date): void {
        this.selectedDate = date.id;
        this.dateForm.controls['startDate'].setValue(new Date(date.startDate));
        this.dateForm.controls['endDate'].setValue(new Date(date.endDate));
    }

    clear(): void {
        this.selectedDate = null;
        this.dateForm.reset();
    }
}
