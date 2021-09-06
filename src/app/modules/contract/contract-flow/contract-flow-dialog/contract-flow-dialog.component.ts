import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { xml2json } from 'xml-js';
import { ContractType } from '../../contract-type/contract-type.model';
import { ContractFlowService } from '../contract-flow.service';
import { ContractTypeService } from '../../contract-type/contract-type.service';
import { Flow } from '../contract-flow.model';
import { contractDefaultBpmn, contractManualFlowDefaultBPMN } from '../../contract-bpmn/contract-default-bpmn';
import { AlertService } from '#services/alert.service';

@Component({
    selector: 'app-contract-flow-dialog',
    templateUrl: './contract-flow-dialog.component.html',
    styleUrls: ['./contract-flow-dialog.component.scss'],
})
export class ContractFlowDialogComponent implements OnInit {
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
        @Inject(MAT_DIALOG_DATA) public data: { flowData: Flow; isManualDialog: boolean },
        private fb: FormBuilder,
        private flowService: ContractFlowService,
        private contractService: ContractTypeService,
        public dialogRef: MatDialogRef<any>,
        public dialog: MatDialogRef<ContractFlowDialogComponent>,
        private readonly alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.checkForEditMode();
        this.getContractTypes();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data.flowData;
        if (this.data.isManualDialog) {
            this.title = 'جریان دستی نهاد';
            this.setDataForManualFlow();
        } else this.isEditMode ? (this.title = 'ویرایش جریان قرارداد') : (this.title = 'افزودن جریان قرارداد');
    }

    private setDataForEditMode(): void {
        this.form.get('name').setValue(this.data.flowData.name);
        this.form.get('isManual').setValue(this.data.flowData.isManual);
        this.form.get('contractTypes').setValue(this.data.flowData.contractTypes);
        this.form.addControl('id', new FormControl(this.data.flowData._id, Validators.required));
    }

    private setDataForManualFlow(): void {
        const organizationName = UtilityFunctions.getActiveOrganizationName();
        this.form.get('name').setValue(`جریان دستی نهاد ${organizationName}`);
        this.form.get('isManual').setValue(true);
        this.flowService.getFlows({ ...this.pagination, organization: UtilityFunctions.getActiveOrganizationInfo('code'), isManual: true }).subscribe(
            (response) => {
                this.form.get('contractTypes').setValue(response.items[0].contractTypes);
                this.data.flowData = response.items[0];
                this.form.addControl('id', new FormControl(response.items[0]._id, Validators.required));
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private getContractTypes(): void {
        this.contractService.getContractTypes({ ...this.pagination, organization: UtilityFunctions.getActiveOrganizationInfo('code') }).subscribe(
            (response) => {
                this.contractTypes = response.items;
                this.pagination.total = response.total;
                if (this.isEditMode) this.setDataForEditMode();
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public submitForm(): void {
        const data = this.form.value;
        if (!this.isEditMode) {
            data.bpmnConfiguration = this.data.isManualDialog
                ? JSON.parse(xml2json(contractManualFlowDefaultBPMN, { compact: true }))
                : JSON.parse(xml2json(contractDefaultBpmn, { compact: true }));
        } else {
            data.bpmnConfiguration = this.data.flowData.bpmnConfiguration;
        }

        if (this.isEditMode || this.data.isManualDialog) {
            this.flowService.editFlow(data).subscribe(
                () => this.dialog.close(true),
                () => this.dialog.close(false)
            );
            return;
        }
        this.flowService.addNewFlow(data).subscribe(
            () => this.dialog.close(true),
            () => this.dialog.close(false)
        );
    }
}
