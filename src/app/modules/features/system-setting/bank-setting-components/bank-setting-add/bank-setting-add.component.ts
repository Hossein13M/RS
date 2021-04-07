import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';

@Component({
    selector: 'app-bank-setting-add',
    templateUrl: './bank-setting-add.component.html',
    styleUrls: ['./bank-setting-add.component.scss'],
})
export class BankSettingAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';

    constructor(
        public dialogRef: MatDialogRef<BankSettingAddComponent>,
        private bankService: BankService,
        private AlertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
    }

    creatForm() {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
        });
    }

    onCreateBranch() {
        this.bankService.create(this.form.value, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch() {
        const obj = {
            id: this.data['id'],
            name: this.form.get('name').value,
        };
        this.bankService.update(obj, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
