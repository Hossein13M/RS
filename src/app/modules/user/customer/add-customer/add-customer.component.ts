import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerInfoDto } from 'app/services/API/models';
import { CustomerManagmentService } from 'app/services/App/user/customer-managment.service';

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
    action: string;
    customer: CustomerInfoDto;
    customerForm: FormGroup;

    dialogTitle: string;
    loading: boolean;
    constructor(
        public matDialogRef: MatDialogRef<AddCustomerComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private customerService: CustomerManagmentService,
        private snackBar: MatSnackBar
    ) {
        // Set the defaults
        this.action = _data.action;
        if (this.action === 'edit') {
            this.dialogTitle = 'اصلاح مشتری';
            this.customer = _data.customer;
        } else {
            this.dialogTitle = 'مشتری جدید';
            this.customer = {} as CustomerInfoDto;
        }
        this.customerForm = this.createCustomerForm();
    }

    ngOnInit() {}

    createCustomerForm(): FormGroup {
        return this._formBuilder.group({
            name: [this.customer.name],
            nationalId: [this.customer.nationalId],
            type: [this.customer.type],
        });
    }

    editCustomer() {
        this.customerService
            .editCustomer(
                this.customer.id,
                this.customerForm.controls['name'].value,
                this.customerForm.controls['nationalId'].value,
                this.customerForm.controls['type'].value
            )
            .subscribe(
                () => {
                    this.snackBar.open('مشتری با موفقیت اصلاح شد', '', { panelClass: 'snack-success', direction: 'rtl', duration: 3000 });
                    this.matDialogRef.close();
                },
                () => this.snackBar.open('اطلاعات تکراری وارد شده است', '', { panelClass: 'snack-error', direction: 'rtl', duration: 3000 })
            );
    }

    newCustomer() {
        this.loading = true;
        this.customerService
            .addCustomer(
                this.customerForm.controls['name'].value,
                this.customerForm.controls['nationalId'].value,
                this.customerForm.controls['type'].value
            )
            .subscribe(
                () => {
                    this.snackBar.open('مشتری با موفقیت ثبت شد', '', { panelClass: 'snack-success', direction: 'rtl', duration: 3000 });
                    this.loading = false;
                    this.matDialogRef.close();
                },
                () =>
                    this.snackBar.open('اطلاعات تکراری وارد شده است', '', {
                        panelClass: 'snack-error',
                        direction: 'rtl',
                        duration: 3000,
                    })
            );
    }
}
