import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DailyInvestmentReportService } from './daily-investment-report.service';
import { StateManager } from '#shared/pipes/stateManager.pipe';
import { PaginationChangeType } from '#shared/components/table/table.model';

@Component({
    selector: 'app-daily-investment-report',
    templateUrl: './daily-investment-report.component.html',
    styleUrls: ['./daily-investment-report.component.scss'],
    providers: [DailyInvestmentReportService],
})
export class DailyInvestmentReportComponent implements OnChanges {
    @Input() date: Date;
    @Input() ownDatePicker = false;
    columns: Array<any>;
    searchFormGroup: FormGroup;
    isWorking: any = false;
    failed = false;
    today = new Date();
    dailyInvestment = { state: 'LOADING', data: [] };
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private fb: FormBuilder, public dirs: DailyInvestmentReportService) {
        this.initTableColumns();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.searchFormGroup) {
            this.createForm();
            const searchFilter = this.searchFormGroup.value;
            if (searchFilter.date) searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
        }

        if (changes.hasOwnProperty('date')) {
            this.searchFormGroup.get('date').setValue(this.date);
        }
        this.get(this.searchFormGroup.value.date);
    }

    get(date): void {
        this.dirs
            .show(date, this.pagination)
            .pipe(StateManager(this.dailyInvestment))
            .subscribe((data: any) => {
                this.dailyInvestment.data = data.items;
                this.pagination.total = data.total;
            });
    }

    private createForm(): void {
        this.searchFormGroup = this.fb.group({ date: [new Date()] });

        this.searchFormGroup.valueChanges.subscribe(({ date }) => {
            this.get(date);
        });
    }

    private initTableColumns(): void {
        this.columns = [
            { name: 'نماد', id: 'bourseAccount', type: 'string' },
            { name: 'حجم تمدن', id: 'tamadonVolume', type: 'number' },
            { name: 'حجم بازارگردانی', id: 'marketVolume', type: 'number' },
            { name: 'حجم کل', id: 'totalVolume', type: 'number' },
            { name: 'ارزش کل', id: 'totalValue', type: 'price' },
        ];
    }

    pageHandler(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get(this.searchFormGroup.value.date);
    }
}
