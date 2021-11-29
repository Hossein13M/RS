import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/services/alert.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { Column } from '#shared/components/table/table.model';
import { ContractFormService } from '../contract-form.service';
import { ContractFormList } from '../contract-form.model';

@Component({
    selector: 'app-contract-form-dialog',
    templateUrl: './contract-form-dialog.component.html',
    styleUrls: ['./contract-form-dialog.component.scss'],
})
export class ContractFormDialogComponent implements OnInit {
    public contractForm: Array<ContractFormList> = [];
    public pagination = { skip: 0, limit: 5, total: 100 };
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '50px' },
        { id: 'name', name: 'نام فرم', type: 'string', minWidth: '50px' },
        {
            id: 'createdAt',
            name: 'تاریخ ساخت',
            convert: (value) => UtilityFunctions.convertDateToPersianDateString(value),
            type: 'string',
            minWidth: '50px',
        },
        {
            id: 'isActive',
            name: 'وضعیت فرم',
            convert: (value) => (value ? 'فعال' : 'غیر فعال'),
            type: 'string',
            minWidth: '50px',
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '50px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'تغییر وضعیت',
                    icon: 'sync',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: any }) => this.changeContractFormStatus(row.row._id),
                },
            ],
        },
    ];

    constructor(
        private readonly contractFormService: ContractFormService,
        private readonly alertService: AlertService,
        public readonly dialog: MatDialogRef<ContractFormDialogComponent>
    ) {}

    ngOnInit(): void {
        this.getContractForms();
    }

    private getContractForms(): void {
        this.contractFormService.getContractForm().subscribe(
            (response) => (this.contractForm = response),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private changeContractFormStatus(contractFormId: number): void {
        this.contractFormService.changeContractFormStatus(contractFormId).subscribe(
            () => {
                this.alertService.onSuccess('وضعیت فرم تغییر کرد');
                this.getContractForms();
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }
}
