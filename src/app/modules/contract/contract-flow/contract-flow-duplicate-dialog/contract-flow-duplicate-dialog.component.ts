import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '#shared/services/alert.service';
import { ContractFlowService } from '../contract-flow.service';

@Component({
    selector: 'app-contract-flow-duplicate-dialog',
    templateUrl: './contract-flow-duplicate-dialog.component.html',
    styleUrls: ['./contract-flow-duplicate-dialog.component.scss'],
})
export class ContractFlowDuplicateDialogComponent {
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        id: [this.data.flowId, Validators.required],
    });

    constructor(
        private readonly contractFlowService: ContractFlowService,
        public readonly dialog: MatDialogRef<ContractFlowDuplicateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder,
        private readonly alertService: AlertService
    ) {}

    submitForm(): void {
        this.contractFlowService.duplicateFlow({ ...this.form.value }).subscribe(
            () => {
                this.alertService.onSuccess('رونوشت جریان به درستی ذخیره شد');
                this.dialog.close(true);
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }
}
