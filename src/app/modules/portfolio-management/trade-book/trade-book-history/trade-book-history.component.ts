import { PaginationChangeType } from '#shared/components/table/table.model';
import { StateManager } from '#shared/pipes/stateManager.pipe';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TradeBookHistoryService } from './trade-book-history.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

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
        this.initializeTableColumns();
        this.form.valueChanges.subscribe((newFormValue) => {
            if (newFormValue.date) newFormValue.date = UtilityFunctions.convertDateToGregorianFormatForServer(new Date(newFormValue.date));
            this.searchParams = newFormValue;
            this.pagination.skip = 0;
            this.getTradeBookHistory();
        });

        this.searchParams = this.form.value;
        if (this.searchParams.date) this.searchParams.date = UtilityFunctions.convertDateToGregorianFormatForServer(new Date(this.searchParams.date));

        this.getTradeBookHistory();
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

    private initializeTableColumns(): void {
        this.columns = [
            { name: 'سبد', id: 'organizationType', type: 'string' },
            { name: 'نماد', id: 'bourseAccount', type: 'string' },
            { name: 'کارگزاری', id: 'broker', type: 'string' },
            {
                name: 'تاریخ بروزرسانی',
                id: 'date',
                type: 'date',
                convert: (value: any) =>
                    new Date(value).toLocaleDateString('fa-Ir', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
            },
        ];
    }
}
