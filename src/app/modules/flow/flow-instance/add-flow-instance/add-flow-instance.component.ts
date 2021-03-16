import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FindFlowInstanceResponseDto, GetFlowResponseDto } from 'app/services/API/models';
import { FlowsInstanceService } from 'app/services/App/flow/flow-instance.service';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { CustomerManagmentService } from 'app/services/App/user/customer-managment.service';
import { searchSelectStateType } from '../../../../shared/components/search-select/search-select.component';

@Component({
    selector: 'app-add-flow-instance',
    templateUrl: './add-flow-instance.component.html',
    styleUrls: ['./add-flow-instance.component.scss'],
})
export class AddFlowInstanceComponent implements OnInit {
    action: string;
    flowInstance: FindFlowInstanceResponseDto;
    flowInstanceList: FindFlowInstanceResponseDto[];

    flowInstanceForm: FormGroup;
    dialogTitle: string;
    hide = true;
    loading: boolean;
    customerList;

    flowList: GetFlowResponseDto[] = [];

    constructor(
        public matDialogRef: MatDialogRef<AddFlowInstanceComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private flowService: FlowsService,
        private customerService: CustomerManagmentService,
        private _formBuilder: FormBuilder,
        private flowsInstanceService: FlowsInstanceService
    ) {
        this.flowService.getFlows().subscribe((res) => (this.flowList = res));
        this.flowsInstanceService.flowInstances.subscribe((res) => (this.flowInstanceList = res));
        this.customerService.limit = 50;
        this.customerService.total = 10000;
        this.customerService.getCustomers().subscribe(() => {});
        this.customerService.customersList.subscribe((res) => (this.customerList = res));

        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'اصلاح قرارداد';
            this.flowInstance = _data.flowInstance;
        } else {
            this.dialogTitle = 'قرارداد جدید';
            this.flowInstance = {} as FindFlowInstanceResponseDto;
        }

        this.flowInstanceForm = this.createFlowInstanceForm();
    }

    ngOnInit(): void {
        this.flowInstanceForm.controls['documentType'].valueChanges.subscribe((value) => {
            if (value != '1') {
                this.flowInstanceForm.controls['parentId'].setValidators([Validators.required]);
            } else {
                this.flowInstanceForm.controls['parentId'].clearValidators();
            }
            this.flowInstanceForm.controls['parentId'].updateValueAndValidity();
        });
    }

    searchCustomer = (searchKey, data): void => {
        data.state = searchSelectStateType.PRESENT;
        if (!searchKey) {
            data.list = this.customerList;
            return;
        }
        data.list = this.customerList?.filter((el) => el.name?.includes(searchKey));
    };

    createFlowInstanceForm(): FormGroup {
        return this._formBuilder.group({
            title: [this.flowInstance.title],
            customer: [{ name: this.flowInstance.customerName, id: this.flowInstance.customerId }],
            documentType: [this.flowInstance.documentType ? this.flowInstance.documentType : '1'],
            flowId: [this.flowInstance.flowId],
            parentId: [this.flowInstance.parentId],
            code: [this.flowInstance.code],
        });
    }

    editFlowInstance(): void {
        this.loading = true;
        this.flowsInstanceService.editFlowInstance(this.flowInstance._id, this.flowInstanceForm.controls['title'].value).subscribe(() => {
            this.loading = false;
            this.matDialogRef.close();
        });
    }

    addFlowInstance(): void {
        this.loading = true;
        this.flowsInstanceService
            .addFlowInstance(
                this.flowInstanceForm.controls['title'].value,
                this.flowInstanceForm.controls['customer'].value.id,
                this.flowInstanceForm.controls['customer'].value.name,
                this.flowInstanceForm.controls['documentType'].value,
                this.flowInstanceForm.controls['flowId'].value,
                this.flowInstanceForm.controls['parentId'].value,
                this.flowInstanceForm.controls['code'].value
            )
            .subscribe(() => {
                this.loading = false;
                this.matDialogRef.close();
            });
    }
}
