import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { GlSettingService } from 'app/modules/features/system-setting/gl-setting-components/gl-setting.service';

@Component({
    selector: 'app-gl-setting-add',
    templateUrl: './gl-setting-add.component.html',
    styleUrls: ['./gl-setting-add.component.scss'],
})
export class GlSettingAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';

    constructor(
        public dialogRef: MatDialogRef<GlSettingAddComponent>,
        private alertService: AlertService,
        private glSettingService: GlSettingService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.data ? (this.title = 'ویرایش ') : (this.title = 'ایجاد ');
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.group({
            ticker: [this.data ? this.data.ticker : '', Validators.required],
            symbol: [this.data ? this.data.symbol : '', Validators.required],
            glCode: [this.data ? this.data.glCode : '', Validators.required],
            status: [this.data ? this.data.status : '', Validators.required],
        });
    }

    onCreateBranch(): void {
        this.glSettingService.createGlSetting(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = {
            id: this.data['id'],
            ticker: this.form.get('ticker').value,
            glCode: this.form.get('glCode').value,
            status: this.form.get('status').value,
            symbol: this.form.get('symbol').value,
        };
        this.glSettingService.updateGlSetting(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }

    handleError(): boolean {
        return false;
    }
}
