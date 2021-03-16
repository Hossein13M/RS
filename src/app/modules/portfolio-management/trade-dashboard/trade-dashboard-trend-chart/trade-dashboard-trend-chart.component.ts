import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TradeDashboardTrendChartService } from './trade-dashboard-trend-chart.service';

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'app-trade-dashboard-trend-chart',
    template: `
        <div class="container fuse-card" [ngStyle]="{ minHeight: height }">
            <div class="header" fxLayout="row wrap" fxLayoutAlign="space-between center" dir="rtl">
                <h3>روند ارزش بازار دارایی‌ها</h3>
            </div>

            <mat-divider></mat-divider>

            <app-trend-chart
                *ngIf="state === stateType.PRESENT && (data != undefined || data != null)"
                convertJalali="true"
                [height]="'420px'"
                [data]="data"
            >
            </app-trend-chart>

            <!--   Getting Data Failed  -->
            <div *ngIf="state === stateType.FAILED" fxLayout="row wrap" fxLayoutAlign="center center" class="full">
                دریافت داده ناموفق بود

                <button mat-button class="againBtn" (click)="get()">دریافت دوباره</button>
            </div>

            <!--   Help Quotes  -->
            <p *ngIf="state === stateType.PRESENT && data && data.length == 0" class="text-center">داده‌ای برای نمایش وجود ندارد</p>

            <!--     Loading       -->
            <div *ngIf="state === stateType.LOADING" class="loader">
                <mat-spinner></mat-spinner>
            </div>
        </div>
    `,
    styles: [
        `
            .fuse-card {
                display: flex;
                flex-direction: column;
            }

            .header {
                padding: 0 1rem;
            }

            .loader {
                height: 420px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .full {
                height: 420px;
                width: 100%;
            }
        `,
    ],
    providers: [TradeDashboardTrendChartService],
})
export class TradeDashboardTrendChartComponent implements OnInit, OnChanges {
    @Input() date: Date;
    @Input() height = '400px';

    data: Array<any>;
    columns: Array<any>;
    searchFormGroup: FormGroup;
    isWorking: any = false;
    failed = false;
    today = new Date();
    stateType = stateType;
    state = stateType.LOADING;

    constructor(private tdtcs: TradeDashboardTrendChartService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.get();
    }

    ngOnChanges() {
        this.tdtcs.searchForm.get('date').setValue(this.date);
        this.get();
    }

    get(): void {
        this.state = stateType.LOADING;
        this.tdtcs.getTradeChart(this).subscribe(
            (data) => {
                this.state = stateType.PRESENT;
                if (data) data.map((x) => (x.value = x.totalValue));
                this.data = null;
                setTimeout(() => (this.data = data), 100);
            },
            () => {
                this.state = stateType.FAILED;
                this.failed = true;
            }
        );
    }

    search(searchFilter: any): void {
        if (!searchFilter) return;
        if (searchFilter.date) searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
        Object.keys(searchFilter).forEach((key) => this.searchFormGroup.controls[key].setValue(searchFilter[key]));
        //
        // this.dirs.specificationModel.searchKeyword = searchFilter;
        // this.dirs.specificationModel.skip = 0;
        this.get();
    }

    pageHandler(): void {
        // this.dirs.specificationModel.limit = e.pageSize;
        // this.dirs.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }
}
