import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { TableSearchMode } from '../../../shared/components/table/table-consts';
import { YieldCurveService } from '../yield-curve.service';

@Component({
    selector: 'app-yield-curve',
    templateUrl: './yield-curve.component.html',
    styleUrls: ['./yield-curve.component.scss'],
})
export class YieldCurveComponent implements OnInit {
    show = false;
    searchFormGroup: FormGroup;
    today = new Date();
    yieldCurveData: any;
    gapData: any;
    yieldCurveDetailsData: any;
    pageEvent = { currentIndex: 0, length: 0, pageSize: 10 };
    showingData = [];

    columns = [
        {
            // NO Search Option Example
            name: 'نام',
            id: 'name',
            type: 'string',
            minWidth: '360px',
            search: { type: 'select', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'نماد',
            id: 'symbol',
            type: 'string',
            minWidth: '150px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'نوع',
            id: 'typeName',
            type: 'string',
            minWidth: '150px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'قیمت',
            id: 'price',
            type: 'price',
            minWidth: '150px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'نرخ کوپن',
            id: 'coponRate',
            type: 'string',
            minWidth: '150px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
            convert: this.fixNumber,
        },
        {
            name: 'دوره پرداخت سال',
            id: 'paymentPeriod',
            type: 'string',
            minWidth: '150px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'سر رسید',
            id: 'maturityDate',
            type: 'string',
            convert: (value) =>
                new Date(value).toLocaleDateString('fa-Ir', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
            minWidth: '250px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'سال تا سر رسید',
            id: 'yearToMaturity',
            type: 'string',
            minWidth: '100px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
            convert: this.fixNumber,
        },
        {
            name: 'بازده تا سر رسید',
            id: 'YTMVwap',
            type: 'string',
            minWidth: '100px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
            convert: this.fixNumber,
        },
        {
            name: 'منحنی بازده',
            id: 'yieldCurveValue',
            type: 'string',
            minWidth: '150px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
            convert: this.fixNumber,
        },
        {
            name: 'تاریخ به روز رسانی',
            id: 'date',
            type: 'string',
            minWidth: '150px',
            convert: (value: any) => {
                return new Date(value).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' });
            },
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '130px',
            sticky: true,
        },
    ];

    constructor(public readonly yieldCurveService: YieldCurveService) {}

    ngOnInit(): void {
        this.searchFormGroup = new FormGroup({ date: new FormControl(new Date()) });
        this.get();
        this.searchFormGroup.valueChanges.subscribe(() => this.get());
    }

    pageHandler(e: PagingEvent): void {
        this.pageEvent = e;
        this.showingData = this.yieldCurveDetailsData.slice(e.currentIndex * e.pageSize, (e.currentIndex + 1) * e.pageSize);
    }

    fixNumber(inputNumber): number {
        return inputNumber && inputNumber?.toFixed ? inputNumber?.toFixed(2) : 0;
    }

    search($event: any): void {}

    get(): void {
        this.yieldCurveDetailsData = null;
        this.showingData = null;
        this.gapData = null;
        this.yieldCurveData = null;
        this.yieldCurveService.getYieldCurve(formatDate(this.searchFormGroup.value.date, 'yyyy-MM-dd', 'en_US')).subscribe(
            (response) => {
                this.yieldCurveData = response.yieldCurve;
                // TODO: data bug!!
                if (this.yieldCurveData.length > 0)
                    Object.keys(this.yieldCurveData).forEach(
                        (name) => (this.yieldCurveData[name] = this.yieldCurveData[name].filter((el) => el.yearToMaturity < 10))
                    );

                if (response.gap.length > 0) this.gapData = response.gap.filter((el) => el.yearToMaturity < 10);
                if (!response || !response.yieldCurveDetails || response.yieldCurveDetails.length === 0) return;

                this.pageEvent = { currentIndex: 0, length: response.yieldCurveDetails.length, pageSize: 10 };

                if (response.yieldCurveDetails.length > 0) {
                    this.yieldCurveDetailsData = response.yieldCurveDetails;
                    this.showingData = this.yieldCurveDetailsData;
                    this.show = true;
                }
            },
            () => {
                this.show = false;
            }
        );
    }
}
