import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { GuarantorInfo } from '../../models/guarantor-info';

@Component({
    selector: 'app-securities-info',
    templateUrl: './securities-info.component.html',
    styleUrls: ['./securities-info.component.scss'],
})
export class SecuritiesInfoComponent implements OnInit {
    public ELEMENT_DATA: any[] = [];
    public dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    public displayedColumns = ['sellDate', 'type', 'symbol', 'sellPricePerUnit', 'maturityDate', 'tradingMarketName', 'edit'];

    public selectedGuarantorInfoIndex: number;
    public SecuritiesInfoForm: FormGroup = new FormGroup({
        sellDate: new FormControl(''),
        realSellDate: new FormControl(),
        type: new FormControl(),
        symbol: new FormControl(),
        name: new FormControl(),
        counts: new FormControl(),
        sellPricePerUnit: new FormControl(),
        repurchaseDate: new FormControl(),
        realRepurchaseDate: new FormControl(),
        repurchasePricePerUnit: new FormControl(),
        maturityDate: new FormControl(),
        issuer: new FormControl(),
        holdingPeriod: new FormControl(),
        interestRate: new FormControl(),
        interestPayingFreq: new FormControl(),
        holdingFeesInfo: new FormControl(), //form
        tradingMarketName: new FormControl(),
        issuePermission: new FormControl(),
    });

    @Output() newData = new EventEmitter();
    @ViewChild('myForm') myForm: NgForm;

    constructor(public formsModelService: FormsModelService) {}

    @Input('data') set data(value: Array<GuarantorInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
    }

    editSecurityInfo(guarantorInfo, index) {
        this.selectedGuarantorInfoIndex = index;
        this.SecuritiesInfoForm.controls['sellDate'].setValue(guarantorInfo.sellDate);
        this.SecuritiesInfoForm.controls['realSellDate'].setValue(guarantorInfo.realSellDate);
        this.SecuritiesInfoForm.controls['type'].setValue(guarantorInfo.type);
        this.SecuritiesInfoForm.controls['symbol'].setValue(guarantorInfo.symbol);
        this.SecuritiesInfoForm.controls['name'].setValue(guarantorInfo.name);
        this.SecuritiesInfoForm.controls['counts'].setValue(guarantorInfo.counts);
        this.SecuritiesInfoForm.controls['sellPricePerUnit'].setValue(guarantorInfo.sellPricePerUnit);
        this.SecuritiesInfoForm.controls['repurchaseDate'].setValue(guarantorInfo.repurchaseDate);
        this.SecuritiesInfoForm.controls['realRepurchaseDate'].setValue(guarantorInfo.realRepurchaseDate);
        this.SecuritiesInfoForm.controls['maturityDate'].setValue(guarantorInfo.maturityDate);
        this.SecuritiesInfoForm.controls['issuer'].setValue(guarantorInfo.issuer);
        this.SecuritiesInfoForm.controls['holdingPeriod'].setValue(guarantorInfo.holdingPeriod);
        this.SecuritiesInfoForm.controls['interestRate'].setValue(guarantorInfo.interestRate);
        this.SecuritiesInfoForm.controls['interestPayingFreq'].setValue(guarantorInfo.interestPayingFreq);
        this.SecuritiesInfoForm.controls['holdingFeesInfo'].setValue(guarantorInfo.holdingFeesInfo);
        this.SecuritiesInfoForm.controls['tradingMarketName'].setValue(guarantorInfo.tradingMarketName);
        this.SecuritiesInfoForm.controls['issuePermission'].setValue(guarantorInfo.issuePermission);
    }

    clear() {
        this.selectedGuarantorInfoIndex = null;
        if (this.SecuritiesInfoForm.valid) {
            this.newData.emit({ property: 'securitiesInfo', data: this.ELEMENT_DATA });
        }
        this.SecuritiesInfoForm.updateValueAndValidity();
        this.SecuritiesInfoForm.markAsUntouched();
        this.myForm.resetForm();
    }

    edit() {
        let toEditSecurityInfo = this.ELEMENT_DATA[this.selectedGuarantorInfoIndex];
        toEditSecurityInfo.sellDate = this.SecuritiesInfoForm.controls['sellDate'].value;
        toEditSecurityInfo.realSellDate = this.SecuritiesInfoForm.controls['realSellDate'].value;
        toEditSecurityInfo.type = this.SecuritiesInfoForm.controls['type'].value;
        toEditSecurityInfo.symbol = this.SecuritiesInfoForm.controls['symbol'].value;
        toEditSecurityInfo.name = this.SecuritiesInfoForm.controls['name'].value;
        toEditSecurityInfo.counts = this.SecuritiesInfoForm.controls['counts'].value;
        toEditSecurityInfo.sellPricePerUnit = this.SecuritiesInfoForm.controls['sellPricePerUnit'].value;
        toEditSecurityInfo.repurchaseDate = this.SecuritiesInfoForm.controls['repurchaseDate'].value;
        toEditSecurityInfo.realRepurchaseDate = this.SecuritiesInfoForm.controls['maturityDate'].value;
        toEditSecurityInfo.maturityDate = this.SecuritiesInfoForm.controls['issuer'].value;
        toEditSecurityInfo.issuer = this.SecuritiesInfoForm.controls['holdingPeriod'].value;
        toEditSecurityInfo.holdingPeriod = this.SecuritiesInfoForm.controls['interestRate'].value;
        toEditSecurityInfo.interestRate = this.SecuritiesInfoForm.controls['interestPayingFreq'].value;
        toEditSecurityInfo.interestPayingFreq = this.SecuritiesInfoForm.controls['holdingFeesInfo'].value;
        toEditSecurityInfo.holdingFeesInfo = this.SecuritiesInfoForm.controls['tradingMarketName'].value;
        toEditSecurityInfo.tradingMarketName = this.SecuritiesInfoForm.controls['issuePermission'].value;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        }
        this.newData.emit({ property: 'securitiesInfo', data: this.ELEMENT_DATA });
    }

    add() {
        this.ELEMENT_DATA.push(this.SecuritiesInfoForm.value);
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {}
}
