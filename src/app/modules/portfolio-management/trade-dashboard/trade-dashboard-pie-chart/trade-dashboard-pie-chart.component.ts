import { StateType } from '#shared/state-type.enum';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TradeDashboardPieChartService } from './trade-dashboard-pie-chart.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-trade-dashboard-pie-chart',
    templateUrl: './trade-dashboard-pie-chart.component.html',
    styleUrls: ['./trade-dashboard-pie-chart.component.scss'],
    providers: [TradeDashboardPieChartService],
})
export class TradeDashboardPieChartComponent implements OnInit, OnChanges {
    @Input() date: Date;

    data: Array<any>;
    columns: Array<any>;
    today = new Date();
    stateType: StateType = StateType.LOADING;

    constructor(private tradeDashboardPieChartService: TradeDashboardPieChartService) {}

    ngOnInit(): void {
        this.getTradePieChart();
    }

    ngOnChanges(): void {
        this.getTradePieChart();
    }

    getTradePieChart(): void {
        this.stateType = StateType.LOADING;
        this.data = null;
        this.tradeDashboardPieChartService.getTradeDashboardPieChart(UtilityFunctions.convertDateToPersianDateString(new Date(this.date))).subscribe(
            (response) => {
                this.stateType = StateType.PRESENT;
                this.data = response;
            },
            () => (this.stateType = StateType.FAIL)
        );
    }
}
