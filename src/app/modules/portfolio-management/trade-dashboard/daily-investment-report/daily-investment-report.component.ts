import { PaginationChangeType } from '#shared/components/table/table.model';
import { Component, Input, OnChanges } from '@angular/core';
import { DailyInvestmentReportService } from './daily-investment-report.service';

@Component({
    selector: 'app-daily-investment-report',
    templateUrl: './daily-investment-report.component.html',
    styleUrls: ['./daily-investment-report.component.scss'],
    providers: [DailyInvestmentReportService],
})
export class DailyInvestmentReportComponent implements OnChanges {
    @Input() date: Date;
    columns: Array<any>;
    today = new Date();
    dailyInvestment = { state: 'LOADING', data: [] };
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(public dailyInvestmentReportService: DailyInvestmentReportService) {
        this.initTableColumns();
    }

    ngOnChanges() {
        this.getDailyInvestmentReport();
    }

    getDailyInvestmentReport(): void {
        this.dailyInvestment.state = 'LOADING';
        this.dailyInvestmentReportService.getDailyInvestmentReport(this.date, this.pagination).subscribe(
            (response: any) => {
                this.dailyInvestment.data = response.items;
                this.pagination.total = response.total;
                this.dailyInvestment.state = 'PRESENT';
            },
            () => (this.dailyInvestment.state = 'FAIL')
        );
    }

    pageHandler(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getDailyInvestmentReport();
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
}
