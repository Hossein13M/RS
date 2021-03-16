import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { GuarantorInfo } from '../../models/guarantor-info';

@Component({
    selector: 'app-securities-holding-fees-info',
    templateUrl: './securities-holding-fees-info.component.html',
    styleUrls: ['./securities-holding-fees-info.component.scss'],
})
export class SecuritiesHoldingFeesInfoComponent implements OnInit {
    public ELEMENT_DATA: any[] = [];
    public dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    public displayedColumns = ['periodTimeLowerBound', 'periodTimeUpperBound', 'feesPlusRate', 'feesPlusAmount', 'feesDescription', 'edit'];

    public selectedSecurityInfoIndex: number;
    public securityInfoForm: FormGroup = new FormGroup({
        periodTimeLowerBound: new FormControl(''),
        periodTimeUpperBound: new FormControl(),
        feesPlusRate: new FormControl(),
        feesPlusAmount: new FormControl(),
        feesDescription: new FormControl(),
    });

    @ViewChild('myForm') myForm: NgForm;

    constructor() {}

    @Input('data') set data(value: Array<any>) {
        this.ELEMENT_DATA = value;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    }

    editSecurityInfo(guarantorInfo, index) {
        this.selectedSecurityInfoIndex = index;
        this.securityInfoForm.controls['periodTimeLowerBound'].setValue(guarantorInfo.periodTimeLowerBound);
        this.securityInfoForm.controls['periodTimeUpperBound'].setValue(guarantorInfo.periodTimeUpperBound);
        this.securityInfoForm.controls['feesPlusRate'].setValue(guarantorInfo.feesPlusRate);
        this.securityInfoForm.controls['feesPlusAmount'].setValue(guarantorInfo.feesPlusAmount);
        this.securityInfoForm.controls['feesDescription'].setValue(guarantorInfo.feesDescription);
    }

    clear() {
        this.selectedSecurityInfoIndex = null;
        this.securityInfoForm.updateValueAndValidity();
        this.securityInfoForm.markAsUntouched();
        this.myForm.resetForm();
    }

    edit() {
        let toEditSecurityInfo = this.ELEMENT_DATA[this.selectedSecurityInfoIndex];
        toEditSecurityInfo.periodTimeLowerBound = this.securityInfoForm.controls['periodTimeLowerBound'].value;
        toEditSecurityInfo.periodTimeUpperBound = this.securityInfoForm.controls['periodTimeUpperBound'].value;
        toEditSecurityInfo.feesPlusRate = this.securityInfoForm.controls['feesPlusRate'].value;
        toEditSecurityInfo.feesPlusAmount = this.securityInfoForm.controls['feesPlusAmount'].value;
        toEditSecurityInfo.feesDescription = this.securityInfoForm.controls['feesDescription'].value;
        this.dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        } else {
        }
    }

    add() {
        this.ELEMENT_DATA.push(this.securityInfoForm.value);
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {}
}
