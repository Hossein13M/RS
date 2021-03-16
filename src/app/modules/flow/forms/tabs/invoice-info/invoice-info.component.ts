import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { InvoiceInfo } from '../../models/invoice-info';

@Component({
    selector: 'app-invoice-info',
    templateUrl: './invoice-info.component.html',
    styleUrls: ['./invoice-info.component.scss'],
    animations: fuseAnimations,
})
export class InvoiceInfoComponent implements OnInit {
    public ELEMENT_DATA: InvoiceInfo[] = [];
    public dataSource = new MatTableDataSource<InvoiceInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['sendingDate', 'amount', 'startingDate', 'endingDate', 'description', 'number', 'edit'];

    public selectedInvoiceInfoIndex: number;
    public invoiceInfoForm: FormGroup = new FormGroup({
        sendingDate: new FormControl(''),
        amount: new FormControl(''),
        startingDate: new FormControl(''),
        endingDate: new FormControl(''),
        description: new FormControl(''),
        number: new FormControl(''),
    });

    constructor() {}

    @Output() newData = new EventEmitter();

    @ViewChild('myForm') myForm: NgForm;

    @Input('data') set data(value: Array<InvoiceInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<InvoiceInfo>(this.ELEMENT_DATA);
    }

    editInvoiceInfo(invoiceInfo, index) {
        this.selectedInvoiceInfoIndex = index;
        this.invoiceInfoForm.controls['sendingDate'].setValue(invoiceInfo.sendingDate);
        this.invoiceInfoForm.controls['amount'].setValue(invoiceInfo.amount);
        this.invoiceInfoForm.controls['startingDate'].setValue(invoiceInfo.startingDate);
        this.invoiceInfoForm.controls['endingDate'].setValue(invoiceInfo.endingDate);
        this.invoiceInfoForm.controls['description'].setValue(invoiceInfo.description);
        this.invoiceInfoForm.controls['number'].setValue(invoiceInfo.number);
    }

    clear() {
        this.selectedInvoiceInfoIndex = null;
        if (this.invoiceInfoForm.valid) {
            this.newData.emit({ property: 'invoiceInfo', data: this.ELEMENT_DATA });
        }
        this.myForm.resetForm();
    }

    edit() {
        let toEditInvoiceInfo = this.ELEMENT_DATA[this.selectedInvoiceInfoIndex];
        toEditInvoiceInfo.sendingDate = this.invoiceInfoForm.controls['sendingDate'].value;
        toEditInvoiceInfo.amount = this.invoiceInfoForm.controls['amount'].value;
        toEditInvoiceInfo.stratingDate = this.invoiceInfoForm.controls['startingDate'].value;
        toEditInvoiceInfo.endingDate = this.invoiceInfoForm.controls['endingDate'].value;
        toEditInvoiceInfo.description = this.invoiceInfoForm.controls['description'].value;
        toEditInvoiceInfo.number = this.invoiceInfoForm.controls['number'].value;
        this.dataSource = new MatTableDataSource<InvoiceInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<InvoiceInfo>(this.ELEMENT_DATA);
        }
        this.clear();
    }

    add() {
        this.ELEMENT_DATA.push(this.invoiceInfoForm.value);
        this.dataSource = new MatTableDataSource<InvoiceInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {}
}
