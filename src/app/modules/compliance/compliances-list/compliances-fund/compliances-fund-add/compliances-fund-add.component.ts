import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompliancesService } from '../../../compliances.service';
import { ComplianceFund } from '../../../compliance.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../../services/alert.service';

@Component({
    selector: 'app-compliances-fund-add',
    templateUrl: './compliances-fund-add.component.html',
    styleUrls: ['./compliances-fund-add.component.scss'],
})
export class CompliancesFundAddComponent implements OnInit {
    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CompliancesFundAddComponent>,
        private compliancesService: CompliancesService,
        @Inject(MAT_DIALOG_DATA) public dialogData: { fund: ComplianceFund, complianceId: number },
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        console.log(this.dialogData);
        this.initForm();
    }

    private initForm(): void {
        // TODO: fundName should not be string it should be a select box from fund entity this whole CRUD does not work
        this.form = this.formBuilder.group({
            fundName: [this.dialogData.fund ? this.dialogData.fund.fundName : ''],
            down: [this.dialogData.fund ? this.dialogData.fund.down : '', Validators.required],
            up: [this.dialogData.fund ? this.dialogData.fund.up : '', Validators.required],
        });
    }

    updateFund(): void {
        const data = {
            fundId: this.dialogData.fund.id,
            ...this.form.value,
        };
        this.compliancesService.updateComplianceFund(data).subscribe((response) => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(response);
        });
    }

    createFund(): void {
        const data = {
            complianceId: this.dialogData.complianceId,
            ...this.form.value,
        };
        this.compliancesService.createComplianceFund(data).subscribe((response) => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(response);
        });
    }

    public close(): void {
        this.dialogRef.close(null);
    }
}
