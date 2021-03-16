import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { MarketMakingFeesReceivingInfo } from '../../models/market-making-fees-receiving-info';

@Component({
    selector: 'app-market-making-fees-receiving-info',
    templateUrl: './market-making-fees-receiving-info.component.html',
    styleUrls: ['./market-making-fees-receiving-info.component.scss'],
    animations: fuseAnimations,
})
export class MarketMakingFeesReceivingInfoComponent {
    public ELEMENT_DATA: MarketMakingFeesReceivingInfo[] = [];
    public dataSource = new MatTableDataSource<MarketMakingFeesReceivingInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['yearNumber', 'feeRate', 'feeAmount', 'edit'];

    public selectedMarketMakingFeeIndex: number;
    public marketMakingFeeForm: FormGroup = new FormGroup({
        yearNumber: new FormControl(0, [Validators.required]),
        feeRate: new FormControl(0, [Validators.required]),
        feeAmount: new FormControl(0, [Validators.required]),
    });

    @ViewChild('myForm') myForm: NgForm;

    @Input('data') set data(value: Array<any>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<MarketMakingFeesReceivingInfo>(this.ELEMENT_DATA);
    }

    @Output() newData = new EventEmitter();

    constructor() {}

    editMarketMakingFee(marketMakingFee, index) {
        this.selectedMarketMakingFeeIndex = index;
        this.marketMakingFeeForm.controls['yearNumber'].setValue(marketMakingFee.yearNumber);
        this.marketMakingFeeForm.controls['feeRate'].setValue(marketMakingFee.feeRate);
        this.marketMakingFeeForm.controls['feeAmount'].setValue(marketMakingFee.feeAmount);
    }

    clear() {
        this.selectedMarketMakingFeeIndex = null;
        if (this.marketMakingFeeForm.valid) {
            this.newData.emit({ property: 'marketMakingFeesReceivingInfo', data: this.ELEMENT_DATA });
        }
        this.marketMakingFeeForm.controls['yearNumber'].setValue(0);
        this.marketMakingFeeForm.controls['feeRate'].setValue(0);
        this.marketMakingFeeForm.controls['feeAmount'].setValue(0);
    }

    edit() {
        let toEditMarketMakingFee = this.ELEMENT_DATA[this.selectedMarketMakingFeeIndex];
        toEditMarketMakingFee.yearNumber = this.marketMakingFeeForm.controls['yearNumber'].value;
        toEditMarketMakingFee.feeRate = this.marketMakingFeeForm.controls['feeRate'].value;
        toEditMarketMakingFee.feeAmount = this.marketMakingFeeForm.controls['feeAmount'].value;

        this.dataSource = new MatTableDataSource<MarketMakingFeesReceivingInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<MarketMakingFeesReceivingInfo>(this.ELEMENT_DATA);
        }
        this.clear();
    }

    add() {
        this.ELEMENT_DATA.push(this.marketMakingFeeForm.value);
        this.dataSource = new MatTableDataSource<MarketMakingFeesReceivingInfo>(this.ELEMENT_DATA);
        this.clear();
    }
}
