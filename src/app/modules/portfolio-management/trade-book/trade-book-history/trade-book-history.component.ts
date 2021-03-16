import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { TradeBookHistoryService } from './trade-book-history.service';

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
            const searchFilter = newFormValue;

            if (searchFilter.date) {
                searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
            }
            this.tbhs.specificationModel.searchKeyword = searchFilter;
            this.tbhs.specificationModel.skip = 0;
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
                    return new Date(value).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' });
                },
            },
        ];

        const searchFilter = this.searchFormGroup.value;
        if (searchFilter.date) {
            searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
        }
        this.tbhs.specificationModel.searchKeyword = searchFilter;
        this.get();
    }

    get(): void {
        this.tbhs.show(this).subscribe(
            (data) => {
                this.data = data.items;
                this.tbhs.setPageDetailData(data);
            },
            () => (this.failed = true)
        );
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

        this.tbhs.specificationModel.searchKeyword = searchFilter;
        this.tbhs.specificationModel.skip = 0;
        this.get();
    }

    pageHandler(e: PagingEvent): void {
        this.tbhs.specificationModel.limit = e.pageSize;
        this.tbhs.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }
}
