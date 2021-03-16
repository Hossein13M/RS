import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ContractPaymentInfo } from '../../models/contract-payment-info';

@Component({
    selector: 'app-contract-payments-info',
    templateUrl: './contract-payments-info.component.html',
    styleUrls: ['./contract-payments-info.component.scss'],
    animations: fuseAnimations,
})
export class ContractPaymentsInfoComponent {
    public ELEMENT_DATA: ContractPaymentInfo[] = [];
    public dataSource = new MatTableDataSource<ContractPaymentInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['percent', 'amount', 'description', 'date', 'delayingDate', 'edit'];

    @ViewChild('myForm') myForm: NgForm;

    public selectedContractPaymentIndex: number;
    public contractPaymentForm: FormGroup = new FormGroup({
        percent: new FormControl(0),
        amount: new FormControl(0),
        description: new FormControl(''),
        date: new FormControl(''),
        delayingDate: new FormControl(0),
    });

    constructor() {}

    @Output() newData = new EventEmitter();

    @Input('data') set data(value: Array<ContractPaymentInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<ContractPaymentInfo>(this.ELEMENT_DATA);
    }

    editContractPayment(contractPayment, index) {
        this.selectedContractPaymentIndex = index;
        this.contractPaymentForm.controls['percent'].setValue(contractPayment.percent);
        this.contractPaymentForm.controls['amount'].setValue(contractPayment.amount);
        this.contractPaymentForm.controls['description'].setValue(contractPayment.description);
        this.contractPaymentForm.controls['date'].setValue(contractPayment.date);
        this.contractPaymentForm.controls['delayingDate'].setValue(contractPayment.delayingDate);
    }

    clear() {
        this.selectedContractPaymentIndex = null;
        if (this.contractPaymentForm.valid) this.newData.emit({ property: 'contractPaymentsInfo', data: this.ELEMENT_DATA });
        this.myForm.resetForm();
    }

    edit() {
        let toEditContractPayment = this.ELEMENT_DATA[this.selectedContractPaymentIndex];
        toEditContractPayment.percent = this.contractPaymentForm.controls['percent'].value;
        toEditContractPayment.amount = this.contractPaymentForm.controls['amount'].value;
        toEditContractPayment.description = this.contractPaymentForm.controls['description'].value;
        toEditContractPayment.date = this.contractPaymentForm.controls['date'].value;
        toEditContractPayment.delayingDate = this.contractPaymentForm.controls['delayingDate'].value;
        this.dataSource = new MatTableDataSource<ContractPaymentInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<ContractPaymentInfo>(this.ELEMENT_DATA);
        }
        this.newData.emit({ property: 'contractPaymentsInfo', data: this.ELEMENT_DATA });
    }

    add() {
        this.ELEMENT_DATA.push(this.contractPaymentForm.value);
        this.dataSource = new MatTableDataSource<ContractPaymentInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}
}
