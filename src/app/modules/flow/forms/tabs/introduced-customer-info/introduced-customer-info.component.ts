import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { IntroducedCustomerInfo } from '../../models/introduced-customer-info';

@Component({
    selector: 'app-introduced-customer-info',
    templateUrl: './introduced-customer-info.component.html',
    styleUrls: ['./introduced-customer-info.component.scss'],
    animations: fuseAnimations,
})
export class IntroducedCustomerInfoComponent {
    public ELEMENT_DATA: IntroducedCustomerInfo[] = [];
    public dataSource = new MatTableDataSource<IntroducedCustomerInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['name', 'purchaseDate', 'purchaseAmount', 'receivingDate', 'edit'];

    @ViewChild('myForm') myForm: NgForm;

    public selectedCustomerIndex: number;
    public customerForm: FormGroup = new FormGroup({
        name: new FormControl(),
        purchaseDate: new FormControl(''),
        purchaseAmount: new FormControl(0),
        receivingDate: new FormControl(''),
    });

    constructor() {}

    @Output() newData = new EventEmitter();

    @Input('data') set data(value: Array<IntroducedCustomerInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<IntroducedCustomerInfo>(this.ELEMENT_DATA);
    }

    editCustomer(customer, index) {
        this.selectedCustomerIndex = index;
        this.customerForm.controls['name'].setValue(customer.name);
        this.customerForm.controls['purchaseDate'].setValue(customer.purchaseDate);
        this.customerForm.controls['purchaseAmount'].setValue(customer.purchaseAmount);
        this.customerForm.controls['receivingDate'].setValue(customer.receivingDate);
    }

    clear() {
        this.selectedCustomerIndex = null;
        if (this.customerForm.valid) {
            this.newData.emit({ property: 'introducedCustomerInfo', data: this.ELEMENT_DATA });
        }
        this.myForm.resetForm();
    }

    edit() {
        let toEditCustomer = this.ELEMENT_DATA[this.selectedCustomerIndex];
        toEditCustomer.name = this.customerForm.controls['name'].value;
        toEditCustomer.purchaseDate = this.customerForm.controls['purchaseDate'].value;
        toEditCustomer.purchaseAmount = this.customerForm.controls['purchaseAmount'].value;
        toEditCustomer.receivingDate = this.customerForm.controls['receivingDate'].value;

        this.dataSource = new MatTableDataSource<IntroducedCustomerInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<IntroducedCustomerInfo>(this.ELEMENT_DATA);
        }
        this.newData.emit({ property: 'introducedCustomerInfo', data: this.ELEMENT_DATA });
    }

    add() {
        this.ELEMENT_DATA.push(this.customerForm.value);
        this.dataSource = new MatTableDataSource<IntroducedCustomerInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        //after pull from sina
        //call setter method
    }
}
