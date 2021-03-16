import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TradeDashboardTableService } from './trade-dashboard-table.service';

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'app-trade-dashboard-table',
    template: `
        <div class="container fuse-card">
            <!--  Table  -->
            <div class="table" *ngIf="state === stateType.PRESENT">
                <app-table [data]="data" [columns]="columns" (searchCall)="search($event)"> </app-table>
            </div>

            <!--   Getting Data Failed  -->
            <div *ngIf="state === stateType.FAILED" fxLayout="row wrap" fxLayoutAlign="center center">
                دریافت داده ناموفق بود

                <button mat-button class="againBtn" (click)="get()">دریافت دوباره</button>
            </div>

            <!--   Help Quotes  -->
            <p *ngIf="data && data.length == 0 && state === stateType.PRESENT" class="text-center">داده‌ای برای نمایش وجود ندارد</p>

            <!--     Loading       -->
            <div *ngIf="state === stateType.LOADING" class="loader">
                <mat-spinner [diameter]="50"></mat-spinner>
            </div>
        </div>
    `,
    styles: [
        `
            .container {
                min-height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .container {
                overflow: hidden;
            }

            .loader {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .table {
                height: 100%;
                width: 100%;
            }
        `,
    ],
    providers: [TradeDashboardTableService],
})
export class TradeDashboardTableComponent implements OnInit, OnChanges {
    @Input() date: Date;

    data: Array<any>;
    columns: Array<any>;
    searchFormGroup: FormGroup;
    isWorking: any = false;
    failed = false;
    today = new Date();
    stateType = stateType;
    state = stateType.LOADING;

    constructor(private tdts: TradeDashboardTableService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.columns = [
            { name: 'ارزش دارایی‌های تمدن', id: 'totalAssets', type: 'price', headerAlign: 'center', dataAlign: 'center' },
            { name: 'سهام', id: 'stock', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'صکوک', id: 'sukuk', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'سلف', id: 'forward', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'مشارکت', id: 'bond', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'شاخص آتی', id: 'indexFuture', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'ETF', id: 'etf', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'حق تقدم', id: 'right', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'اسناد خزانه', id: 'treasury', type: 'number', headerAlign: 'center', dataAlign: 'center' },
            { name: 'وجه نقد', id: 'cash', type: 'number', headerAlign: 'center', dataAlign: 'center' },
        ];

        this.get();
    }

    ngOnChanges() {
        this.tdts.searchForm.get('date').setValue(this.date);
        this.get();
    }

    get(): void {
        this.state = stateType.LOADING;
        this.data = null;
        this.tdts.getTradeTable(this).subscribe(
            (data) => {
                this.data = [data];
                this.state = stateType.PRESENT;
                this.tdts.setPageDetailData(data);
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
