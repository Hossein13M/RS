import { StateType } from '#shared/state-type.enum';
import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { stateType } from 'app/shared/components/tree-select/tree-select.types';
import { TradeDashboardPieChartService } from './trade-dashboard-pie-chart.service';

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

    ngOnChanges() {
        this.getTradePieChart();
    }

    getTradePieChart(): void {
        this.stateType = StateType.LOADING;
        this.data = null;
        this.tradeDashboardPieChartService.getTradeDashboardPieChart(formatDate(new Date(this.date), 'yyyy-MM-dd', 'en_US')).subscribe(
            (response) => {
                this.stateType = StateType.PRESENT;
                this.data = response;
            },
            () => (this.stateType = StateType.FAIL)
        );
    }
}
