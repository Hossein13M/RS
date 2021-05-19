import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompliancesService } from '../compliances.service';
import { AlertService } from '../../../services/alert.service';

@Component({
    templateUrl: './compliance-add.component.html',
    styleUrls: ['./compliance-add.component.scss'],
})
export class ComplianceAddComponent implements OnInit {
    public form: FormGroup;
    title = '';

    constructor(
        public dialogRef: MatDialogRef<ComplianceAddComponent>,
        private compliancesService: CompliancesService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public data,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.initTitle();
    }

    private initTitle(): void {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            code: [this.data ? this.data.code : '', Validators.required],
            title: [this.data ? this.data.title : '', Validators.required],
        });
    }

    public onCreateCompliance(): void {
        this.compliancesService.createCompliance(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    public onEditCompliance(): void {
        const obj = {
            ...this.form.value,
            id: this.data['id'],
        };
        this.compliancesService.updateCompliance(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    public close(): void {
        this.dialogRef.close(false);
    }
}
