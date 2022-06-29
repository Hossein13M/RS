import { Component, Input, OnInit } from '@angular/core';
import { ORRoutePrefix } from '../../op-risk.module';
import { OpRiskChartSelectService } from './op-risk-chart-select.service';

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'app-op-risk-chart-select',
    templateUrl: './op-risk-chart-select.component.html',
    styleUrls: ['./op-risk-chart-select.component.scss'],
    providers: [OpRiskChartSelectService],
})
export class OpRiskChartSelectComponent implements OnInit {
    @Input() selected: string;
    opRiskPrefix = ORRoutePrefix;
    isWorking: any = false;
    failed = false;
    stateType = stateType;
    state = stateType.PRESENT;
    treeCharts: Array<any>;

    constructor(private opRiskChartSelectService: OpRiskChartSelectService) {}

    ngOnInit(): void {
        this.get();
    }

    get(): void {
        this.state = stateType.LOADING;
        this.opRiskChartSelectService.categories().subscribe(
            (categories) => {
                this.state = stateType.PRESENT;
                this.treeCharts = categories;
            },
            () => (this.state = stateType.FAILED)
        );
    }
}
