import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { xml2json } from 'xml-js';
import { ContractType } from '../../contract-type/contract-type.model';
import { FlowService } from '../flow.service';
import { ContractTypeService } from '../../contract-type/contract-type.service';
import { Flow } from '../flow.model';
import { defaultBpmn } from '../../bpmn/default.bpmn';

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
        private contractService: ContractTypeService,
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
        this.form.get('contractTypes').setValue(this.data.contractTypes);
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
        const bpmnConfiguration = JSON.parse(xml2json(defaultBpmn, { compact: true }));
        const data = this.form.value;
        data.bpmnConfiguration = bpmnConfiguration;
        if (this.isEditMode) {
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
