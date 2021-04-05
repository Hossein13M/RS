import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TradeBookHistoryService } from './trade-book-history.service';
import { StateManager } from '../../../../shared/pipes/stateManager.pipe';
import { PaginationChangeType } from '../../../../shared/components/table/table-consts';

@Component({
    selector: 'app-trade-book-history',
    templateUrl: './trade-book-history.component.html',
    styleUrls: ['./trade-book-history.component.scss'],
    providers: [TradeBookHistoryService],
})
export class TradeBookHistoryComponent implements OnInit {
    data: Array<any>;
    columns: Array<any>;
    searchFormGroup: FormGroup;

    isWorking: any = false;
    failed = false;
    today = new Date();

    pagination = { skip: 0, limit: 5, total: 100 };
    searchParams: any = {};

    state: any;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<TradeBookHistoryComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData,
        public tbhs: TradeBookHistoryService
    ) {}

    ngOnInit(): void {
        // Search Group Init
        this.searchFormGroup = this.fb.group({
            date: [this.dialogData.date],
        });
        this.searchFormGroup.valueChanges.subscribe((newFormValue) => {
            if (newFormValue.date) {
                newFormValue.date = formatDate(new Date(newFormValue.date), 'yyyy-MM-dd', 'en_US');
            }
            this.searchParams = newFormValue;
            this.pagination.skip = 0;
            this.get();
        });

        this.columns = [
            { name: 'سبد', id: 'organizationType', type: 'string' },
            { name: 'نماد', id: 'bourseAccount', type: 'string' },
            { name: 'کارگزاری', id: 'broker', type: 'string' },
            {
                name: 'تاریخ بروزرسانی',
                id: 'date',
                type: 'date',
                convert: (value: any) => {
                    return new Date(value).toLocaleDateString('fa-Ir', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                },
            },
        ];

        this.searchParams = this.searchFormGroup.value;
        if (this.searchParams.date) {
            this.searchParams.date = formatDate(new Date(this.searchParams.date), 'yyyy-MM-dd', 'en_US');
        }

        this.get();
    }

    get(): void {
        this.tbhs
            .show({ ...this.searchParams, ...this.pagination })
            .pipe(StateManager({ state: this.state }))
            .subscribe((data: any) => {
                this.data = data.items;
                this.pagination.total = data.total;
            });
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }

        if (searchFilter.date) {
            searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });

        this.searchParams = searchFilter;
        this.pagination.skip = 0;
        this.get();
    }

    pageHandler(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }
}
