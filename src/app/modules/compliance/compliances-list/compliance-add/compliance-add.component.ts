import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompliancesService } from '../../compliances.service';
import { AlertService } from '../../../../services/alert.service';

@Component({
    templateUrl: './compliance-add.component.html',
    styleUrls: ['./compliance-add.component.scss'],
})
export class ComplianceAddComponent implements OnInit {
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ComplianceAddComponent>,
        private compliancesService: CompliancesService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public dialogData,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            code: [this.dialogData ? this.dialogData.code : '', Validators.required],
            title: [this.dialogData ? this.dialogData.title : '', Validators.required],
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
            id: this.dialogData['id'],
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
