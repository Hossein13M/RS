import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { stateType } from 'app/shared/components/tree-select/tree-select.types';
import { TradeDashboardPieChartService } from './trade-dashboard-pie-chart.service';

@Component({
    selector: 'app-trade-dashboard-pie-chart',
    template: `
        <div class="container fuse-card" [ngStyle]="{ minHeight: height, height: height }">
            <div class="header" fxLayout="row wrap" fxLayoutAlign="space-between center" dir="rtl">
                <h3>ترکیب ابزار‌ها</h3>
            </div>

            <mat-divider></mat-divider>

            <div class="chart" *ngIf="state !== stateType.FAILED">
                <app-pie-chart [data]="data" [state]="state"> </app-pie-chart>
            </div>

            <div *ngIf="state === stateType.FAILED" fxLayout="row wrap" fxLayoutAlign="center center" class="full">
                دریافت داده ناموفق بود

                <button mat-button class="againBtn" (click)="get()">دریافت دوباره</button>
            </div>
        </div>
    `,
    styles: [
        `
            .fuse-card {
                display: flex;
                flex-direction: column;
            }

            .chart {
                height: 100%;
                width: 100%;
            }

            .header {
                padding: 0 1rem;
            }

            .full {
                height: 420px;
                width: 100%;
            }
        `,
    ],
    providers: [TradeDashboardPieChartService],
})
export class TradeDashboardPieChartComponent implements OnInit, OnChanges {
    @Input() date: Date;
    @Input() height = '500px';

    data: Array<any>;
    columns: Array<any>;
    searchFormGroup: FormGroup;
    isWorking: any = false;
    failed = false;
    today = new Date();
    stateType = stateType;
    state = stateType.LOADING;

    constructor(private tradeDashboardPieChartService: TradeDashboardPieChartService) {}

    ngOnInit(): void {
        this.get();
    }

    ngOnChanges() {
        this.tradeDashboardPieChartService.searchForm.get('date').setValue(this.date);
        this.get();
    }

    get(): void {
        this.state = stateType.LOADING;
        this.data = null;
        this.tradeDashboardPieChartService.getPieChart(this).subscribe(
            (data) => {
                this.state = stateType.PRESENT;
                this.data = data;
            },
            () => {
                this.state = stateType.FAILED;
                this.failed = true;
            }
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
        //
        // this.dirs.specificationModel.searchKeyword = searchFilter;
        // this.dirs.specificationModel.skip = 0;
        this.get();
    }

    pageHandler(e: PagingEvent): void {
        // this.dirs.specificationModel.limit = e.pageSize;
        // this.dirs.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }
}
