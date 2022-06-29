import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractFormService } from '../../contract-form.service';
import { AlertService } from '#shared/services/alert.service';

@Component({
    selector: 'app-contract-form-duplicate-dialog',
    templateUrl: './contract-form-duplicate-dialog.component.html',
    styleUrls: ['./contract-form-duplicate-dialog.component.scss'],
})
export class ContractFormDuplicateDialogComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
    });

    constructor(
        private readonly contractFormService: ContractFormService,
        public readonly dialog: MatDialogRef<ContractFormDuplicateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private readonly alertService: AlertService
    ) {}

    ngOnInit(): void {}

    submitForm(): void {
        const data = { name: this.form.get('name').value, id: this.data.contractFormId };
        this.contractFormService.duplicateContractForm(data).subscribe(
            () => {
                this.alertService.onSuccess('رونوشت فرم به درستی ذخیره شد');
                this.dialog.close(true);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }
}
