import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractType } from '../../contract-type/contract.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlowService } from '../flow.service';
import { ContractService } from '../../contract.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-flow-dialog',
    templateUrl: './flow-dialog.component.html',
    styleUrls: ['./flow-dialog.component.scss'],
})
export class FlowDialogComponent implements OnInit {
    public title: string;
    public isEditMode: boolean = false;
    public contractTypes: Array<ContractType> = [];
    public pagination = { skip: 0, limit: 100, total: 100 };
    private activeOrganizationId: number = UtilityFunctions.getActiveOrganizationInfo('id');
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        contractType: [null, Validators.required],
        isManual: [false, Validators.required],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ContractType,
        private fb: FormBuilder,
        private flowService: FlowService,
        private contractService: ContractService,
        public dialogRef: MatDialogRef<any>,
        public dialog: MatDialogRef<FlowDialogComponent>
    ) {}

    ngOnInit(): void {
        this.checkForEditMode();
        this.getContractTypes();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data;
        this.isEditMode ? (this.title = 'ویرایش جریان قرارداد') : (this.title = 'افزودن جریان قرارداد');
        if (this.isEditMode) this.setDataForEditMode();
    }

    private setDataForEditMode(): void {
        this.form.setValue(this.data);
    }

    private getContractTypes(): void {
        this.contractService.getContractTypes({ ...this.pagination, organization: this.activeOrganizationId }).subscribe((response) => {
            this.contractTypes = response.items;
            this.pagination.total = response.total;
        });
    }

    public submitForm(): void {
        console.log(this.form.value);
    }
}
