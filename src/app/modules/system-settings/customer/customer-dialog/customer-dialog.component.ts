import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { AlertService } from '#shared/services/alert.service';

@Component({
    selector: 'app-customer-dialog',
    templateUrl: './customer-dialog.component.html',
    styleUrls: ['./customer-dialog.component.scss'],
})
export class CustomerDialogComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        type: ['legal', Validators.required],
        nationalId: [null],
        glCode: [null],
    });
    public headerTitle: 'افزودن مشتری' | 'ویرایش مشتری';
    constructor(
        private readonly fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean; customerInfo: Customer },
        private readonly customerService: CustomerService,
        public dialog: MatDialogRef<CustomerDialogComponent>,
        private readonly alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.data.isEditMode ? (this.headerTitle = 'ویرایش مشتری') : (this.headerTitle = 'افزودن مشتری');
        this.data.isEditMode && this.setDataForEditMode();
    }

    private setDataForEditMode(): void {
        this.form.get('name').setValue(this.data.customerInfo.name);
        this.form.get('type').setValue(this.data.customerInfo.type);
        this.form.get('nationalId').setValue(this.data.customerInfo.nationalId);
        this.form.get('glCode').setValue(this.data.customerInfo.glCode);
    }

    public submitForm(): void {
        this.data.isEditMode
            ? this.customerService.editCustomer({ ...this.form.value, id: this.data.customerInfo.id }).subscribe(
                  () => this.dialog.close(true),
                  () => this.alertService.onError('مشکلی پیش آمده‌است')
              )
            : this.customerService.createCustomer(this.form.value).subscribe(
                  () => this.dialog.close(true),
                  () => this.alertService.onError('مشکلی پیش آمده‌است')
              );
    }
}
