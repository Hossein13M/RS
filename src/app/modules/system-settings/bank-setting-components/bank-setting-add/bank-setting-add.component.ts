import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';

@Component({
    selector: 'app-bank-setting-add',
    templateUrl: './bank-setting-add.component.html',
    styleUrls: ['./bank-setting-add.component.scss'],
})
export class BankSettingAddComponent implements OnInit {
    form: FormGroup;
    title = '';

    constructor(
        public dialogRef: MatDialogRef<BankSettingAddComponent>,
        private bankService: BankService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
    }

    public onCreateBranch(): void {
        this.bankService.createBankSetting(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    public onEditBranch(): void {
        const obj = {
            id: this.data['id'],
            name: this.form.get('name').value,
        };
        this.bankService.updateBankSetting(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    public close(): void {
        this.dialogRef.close(false);
    }

    private creatForm(): void {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
        });
    }
}
