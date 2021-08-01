import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContractType } from '../../contract-type/contract.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlowService } from '../flow.service';
import { ContractService } from '../../contract.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { Flow } from '../flow.model';

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
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        organization: [UtilityFunctions.getActiveOrganizationInfo('code'), Validators.required],
        contractTypes: [[], Validators.required],
        isManual: [false, Validators.required],
        bpmnConfiguration: [{}],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Flow,
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
    }

    private setDataForEditMode(): void {
        this.form.get('name').setValue(this.data.name);
        this.form.get('isManual').setValue(this.data.isManual);
        const contractTypes = [];
        this.data.contractTypes.map((contractType) => {
            this.contractTypes.map((item) => {
                if (contractType === item._id) contractTypes.push(contractType);
            });
        });

        this.form.get('contractTypes').patchValue(contractTypes);
        this.form.addControl('id', new FormControl(this.data._id, Validators.required));
    }

    private getContractTypes(): void {
        this.contractService
            .getContractTypes({ ...this.pagination, organization: UtilityFunctions.getActiveOrganizationInfo('code') })
            .subscribe((response) => {
                this.contractTypes = response.items;
                this.pagination.total = response.total;
                if (this.isEditMode) this.setDataForEditMode();
            });
    }

    public submitForm(): void {
        if (this.isEditMode) {
            this.flowService.editFlow(this.form.value).subscribe(
                () => this.dialog.close(true),
                () => this.dialog.close(false)
            );
            return;
        }
        this.flowService.addNewFlow(this.form.value).subscribe(
            () => this.dialog.close(true),
            () => this.dialog.close(false)
        );
    }
}
