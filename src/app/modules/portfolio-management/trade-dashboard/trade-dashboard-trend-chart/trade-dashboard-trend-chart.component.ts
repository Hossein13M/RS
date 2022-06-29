import { StateType } from '#shared/state-type.enum';
import { Component, Input, OnChanges } from '@angular/core';
import { TradeDashboardTrendChartService } from './trade-dashboard-trend-chart.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-trade-dashboard-trend-chart',
    templateUrl: 'trade-dashboard-trend-chart.component.html',
    styleUrls: ['trade-dashboard-trend-chart.component.scss'],
    providers: [TradeDashboardTrendChartService],
})
export class TradeDashboardTrendChartComponent implements OnChanges {
    @Input() date: Date;
    data: Array<any>;
    columns: Array<any>;
    today = new Date();
    stateType: StateType = StateType.LOADING;

    constructor(private tradeDashboardTrendChartService: TradeDashboardTrendChartService) {}

    ngOnChanges(): void {
        this.getTradeDashboardTrendChart();
    }

    getTradeDashboardTrendChart(): void {
        this.stateType = StateType.LOADING;
        this.tradeDashboardTrendChartService.getTradeTrendChart(UtilityFunctions.convertDateToGregorianFormatForServer(new Date(this.date))).subscribe(
            (response) => {
                this.stateType = StateType.PRESENT;
                if (response) response.map((x) => (x.value = x.totalValue));
                this.data = null;
                setTimeout(() => (this.data = response), 100);
            },
            () => (this.stateType = StateType.FAIL)
        );
    }
}
