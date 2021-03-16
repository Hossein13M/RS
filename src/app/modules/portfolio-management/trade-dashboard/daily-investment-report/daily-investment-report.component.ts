import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { DailyInvestmentReportService } from './daily-investment-report.service';

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
}

@Component({
    selector: 'app-daily-investment-report',
    templateUrl: './daily-investment-report.component.html',
    styleUrls: ['./daily-investment-report.component.scss'],
    providers: [DailyInvestmentReportService],
})
export class DailyInvestmentReportComponent implements OnInit {
    @Input() date: Date;
    @Input() ownDatePicker = false;
    data: Array<any>;
    columns: Array<any>;
    searchFormGroup: FormGroup;
    isWorking: any = false;
    failed = false;
    today = new Date();
    stateType = stateType;
    state = stateType.LOADING;

    constructor(private fb: FormBuilder, public dirs: DailyInvestmentReportService) {}

    ngOnInit(): void {
        this.searchFormGroup = this.fb.group({ date: [new Date()] });

        this.searchFormGroup.valueChanges.subscribe((newFormValue) => {
            const searchFilter = newFormValue;
            if (searchFilter.date) searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
            this.dirs.specificationModel.searchKeyword = searchFilter;
            this.dirs.specificationModel.skip = 0;
            this.get();
        });

        this.columns = [
            { name: 'سبد/میز', id: 'organizationType', type: 'string' },
            { name: 'نماد', id: 'bourseAccount', type: 'string' },
            { name: 'حجم', id: 'volume', type: 'number' },
            { name: 'حجم کل', id: 'totalVolume', type: 'number' },
            { name: 'ارزش', id: 'value', type: 'price' },
            { name: 'ارزش کل', id: 'totalValue', type: 'price' },
        ];

        const searchFilter = this.searchFormGroup.value;
        if (searchFilter.date) searchFilter.date = formatDate(new Date(searchFilter.date), 'yyyy-MM-dd', 'en_US');
        this.dirs.specificationModel.searchKeyword = searchFilter;
        this.get();

        this.searchFormGroup.get('date').setValue(this.date);
    }

    get(): void {
        this.state = stateType.LOADING;
        this.data = null;
        this.dirs.show(this).subscribe(
            (data) => {
                this.state = stateType.PRESENT;
                this.data = data.items;
                this.dirs.setPageDetailData(data);
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
        this.dirs.specificationModel.searchKeyword = searchFilter;
        this.dirs.specificationModel.skip = 0;
        this.get();
    }

    pageHandler(e: PagingEvent): void {
        this.dirs.specificationModel.limit = e.pageSize;
        this.dirs.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }
}
