import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';
import { ContractService } from '../../contract.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-contract-type-dialog',
    templateUrl: './contract-type-dialog.component.html',
    styleUrls: ['./contract-type-dialog.component.scss'],
})
export class ContractTypeDialogComponent implements OnInit {
    private activeOrganizationId: number = UtilityFunctions.getActiveOrganizationId();
    public title: string;
    public isEditMode: boolean = false;
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        form: [null, Validators.required],
        organization: [this.activeOrganizationId, Validators.required],
        users: [null, Validators.required],
        roles: [null, Validators.required],
        units: [null, Validators.required],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private contractService: ContractService,
        public dialogRef: MatDialogRef<any>,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.checkForEditMode();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data;
        this.isEditMode ? (this.title = 'ویرایش نوع قرارداد') : (this.title = 'افزودن نوع قرارداد');
        // if (this.isEditMode) this.form.get('name').setValue(this.data.name);
    }

    public submitForm(): void {
        console.log(this.form.value);
    }
}
