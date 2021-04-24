import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaginationChangeType } from '#shared/components/table/table.model';
import { StateManager } from '#shared/pipes/stateManager.pipe';
import { TradeBookHistoryService } from './trade-book-history.service';

@Component({
    selector: 'app-trade-book-history',
    templateUrl: './trade-book-history.component.html',
    styleUrls: ['./trade-book-history.component.scss'],
    providers: [TradeBookHistoryService],
})
export class TradeBookHistoryComponent implements OnInit {
    form: FormGroup = this.fb.group({ date: [this.dialogData.date] });
    tradeBook = { data: [], state: '' };
    columns: Array<any>;

    isWorking: any = false;
    failed = false;
    today = new Date();

    pagination = { skip: 0, limit: 5, total: 100 };
    searchParams: any = {};

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<TradeBookHistoryComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData,
        public tradeBookHistoryService: TradeBookHistoryService
    ) {}

    ngOnInit(): void {
        this.createColumns();
        this.form.valueChanges.subscribe((newFormValue) => {
            if (newFormValue.date) newFormValue.date = formatDate(new Date(newFormValue.date), 'yyyy-MM-dd', 'en_US');
            this.searchParams = newFormValue;
            this.pagination.skip = 0;
            this.getTradeBookHistory();
        });

        this.searchParams = this.form.value;
        if (this.searchParams.date) this.searchParams.date = formatDate(new Date(this.searchParams.date), 'yyyy-MM-dd', 'en_US');

        this.getTradeBookHistory();
    }

    private createColumns(): void {
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
    }

    public getTradeBookHistory(): void {
        this.tradeBookHistoryService
            .getIpsUpdateHistory({ ...this.searchParams, ...this.pagination })
            .pipe(StateManager(this.tradeBook))
            .subscribe((data: any) => {
                this.tradeBook.data = data.items;
                this.pagination.total = data.total;
            });
    }

    public pageHandler(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getTradeBookHistory();
    }
}
