import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'app/services/alert.service';
import { forkJoin } from 'rxjs';
import { OpRiskManagementService } from '../../op-risk-managment/op-risk-management.service';
import { OpRiskReportingService } from '../op-risk-reporting.service';

@Component({
    selector: 'app-op-risk-reporting',
    templateUrl: './op-risk-reporting.component.html',
    styleUrls: ['./op-risk-reporting.component.scss'],
})
export class OpRiskReportingComponent implements OnInit {
    tops: Array<{ items: Array<{ titleFA: string; treeNodeId: number; maxCount: string }>; name: string }>;
    isSelectedTabRisk: boolean = true;
    xAxis: Array<{ titleFA: string; type: string }>;
    yAxis: Array<{ titleFA: string; type: string }>;
    barChartSearchForm: FormGroup = this.formBuilder.group({
        xAxis: ['', [Validators.required]],
        yAxis: ['', [Validators.required]],
        isSelectedTabRisk: [this.isSelectedTabRisk],
    });
    riskBarChartData: Array<{ name: string; treeNodeId: number; value: string }>;
    lossBarChartData: Array<{ name: string; treeNodeId: number; value: string }>;
    categories: { OPRiskDriver: Array<number>; OPRiskLevel: Array<number>; OPRiskRecovery: Array<number>; losse: Array<number> } = {
        OPRiskDriver: [],
        OPRiskLevel: [],
        OPRiskRecovery: [],
        losse: [],
    };
    diversPieChartData = [];
    recoveryPieChartData = [];
    levelPieChartData = [];
    losePieChartData = [];

    // the two bellow variables are for heatmap
    // heatMapData: any;
    // heatMapSearchForm: FormGroup;

    constructor(
        private opRiskReportingService: OpRiskReportingService,
        private opRiskManagementService: OpRiskManagementService,
        private AlertService: AlertService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.barChartSearchForm.reset();
        this.getTops();
        this.getAxis();
        this.getCategories();
    }

    getTops(): void {
        this.opRiskReportingService.getTops(this.isSelectedTabRisk).subscribe((response) => (this.tops = response));
    }

    getAxis(): void {
        this.opRiskReportingService.getAxis('xAxis').subscribe((response) => (this.xAxis = response));
        this.opRiskReportingService.getAxis('yAxis').subscribe((response) => (this.yAxis = response));
    }

    getBarChart(barchartType: string): void {
        this.opRiskReportingService
            .getBarChart(this.barChartSearchForm.value.xAxis, this.barChartSearchForm.value.yAxis, this.isSelectedTabRisk)
            .subscribe((response) => (this[barchartType] = response.chart.data));
    }

    changeTab(): void {
        this.isSelectedTabRisk = !this.isSelectedTabRisk;
        this.ngOnInit();
    }

    getCategories(): void {
        Object.keys(this.categories).map((key) => (this.categories[key] = []));
        this.opRiskManagementService.getCategories().subscribe((response) => {
            response.map((el) => {
                switch (el.titleEN) {
                    case 'od':
                        this.categories['OPRiskDriver'].push(el.id);
                        break;
                    case 'rc':
                        this.categories['OPRiskLevel'].push(el.id);
                        break;
                    case 'olc':
                        this.categories['OPRiskRecovery'].push(el.id);
                        break;
                    default:
                        // cases of 'dl' and 'il'
                        this.categories['losse'].push(el.id);
                        break;
                }
            });
            this.getPieCharts();
        });
    }

    getPieCharts(): void {
        Object.keys(this.categories).forEach((tableName) => {
            if (tableName == 'losse') {
                forkJoin([
                    ...this.categories[tableName].map((id) => {
                        return this.opRiskReportingService.getPieChart(id, this.isSelectedTabRisk, tableName);
                    }),
                ]).subscribe((res) => {
                    this.losePieChartData = [];
                    res.forEach((item: any) => item.chart.data.forEach((el) => this.losePieChartData.push(el)));
                });
            } else {
                this.opRiskReportingService.getPieChart(this.categories[tableName][0], this.isSelectedTabRisk, tableName).subscribe((response) => {
                    switch (tableName) {
                        case 'OPRiskDriver':
                            this.diversPieChartData = response.chart.data;
                            break;
                        case 'OPRiskLevel':
                            this.recoveryPieChartData = response.chart.data;
                            break;
                        case 'OPRiskRecovery':
                            this.levelPieChartData = response.chart.data;
                            break;
                        default:
                            break;
                    }
                });
            }
        });
    }

    getChildPie(data, tableName): void {
        let treeNodeId = 0;
        data == false ? (treeNodeId = this.categories[tableName][0]) : (treeNodeId = data.treeNodeId);
        this.opRiskReportingService.getPieChart(treeNodeId, this.isSelectedTabRisk, tableName).subscribe((response) => {
            response.chart.data.length == 0 ? this.AlertService.onError('داده ای یافت نشد') : (this.diversPieChartData = response.chart.data);
        });
    }

    // the bellow is for heatmap which needs to be changed
    // getHeatMap() {
    //     this.opRiskReportingService.getHeatMap(this.isRisk).subscribe((response) => {
    //         Math.max.apply(
    //             Math,
    //             response.map((o) => {
    //                 this.heatMapSearchForm.get('criticalX').setValue(o.xAxis);
    //             })
    //         );
    //     });
    // }
}
