import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#shared/services/alert.service';
import { ContractService } from './contract.service';
import { Contract, ContractTableList } from './contract.model';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractNoteDialogComponent } from './contract-note-dialog/contract-note-dialog.component';
import { ContractHistoryDialogComponent } from './contract-history-dialog/contract-history-dialog.component';
import { ContractFinalFormDialogComponent } from './contract-final-form-dialog/contract-final-form-dialog.component';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
    public contracts: Array<ContractTableList>;
    public pagination = { skip: 0, limit: 5, total: 100 };
    public form: FormGroup = this.fb.group({
        name: [''],
        isActive: ['all'],
        organization: [UtilityFunctions.getActiveOrganizationInfo('code')],
    });

    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '50px' },
        { id: 'name', name: 'نام قرارداد', type: 'string', minWidth: '150px' },
        { id: 'contractType', name: 'نوع قرارداد', type: 'string', minWidth: '150px' },
        { id: 'code', name: 'کد قرارداد', type: 'string', minWidth: '150px' },
        { id: 'customer', name: 'طرف قرارداد', type: 'string', minWidth: '150px' },
        { id: 'initializerUser', name: 'ثبت‌کننده‌ی قرارداد', type: 'string', minWidth: '150px' },
        { id: 'curentStep', name: 'گام کنونی', type: 'string', minWidth: '100px' },
        {
            id: 'createdAt',
            name: 'تاریخ ثبت قرارداد',
            convert: (value) => UtilityFunctions.convertDateToPersianDateString(value),
            type: 'string',
            minWidth: '100px',
        },
        {
            id: 'updatedAt',
            name: 'تاریخ به‌روزرسانی',
            convert: (value) => UtilityFunctions.convertDateToPersianDateString(value),
            type: 'string',
            minWidth: '100px',
        },
        {
            id: 'isActive',
            name: 'وضعیت قرارداد',
            convert: (value) => (value ? 'فعال' : 'غیر فعال'),
            type: 'string',
            minWidth: '100px',
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '200px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'ویرایش',
                    icon: 'mode_edit',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Contract }) => this.openContractDialog('edit', row.row),
                },
                {
                    name: 'پیشینه‌ی قرارداد',
                    icon: 'history',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Contract }) => this.openContractHistoryDialog(row.row._id),
                },
                {
                    name: 'یادداشت‌های قرارداد',
                    icon: 'sticky_note_2',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: Contract }) => this.openContractNoteDialog(row.row._id),
                },
                {
                    name: 'نمایش فرم پایانی قرارداد',
                    icon: 'list_alt',
                    color: 'accent',
                    operation: (row: { operationItem: any; row: Contract }) => this.openContractFormDialog(row.row._id),
                },
                {
                    name: 'تغییر وضعیت',
                    icon: 'sync',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: Contract }) => this.changeContractStatus(row.row._id),
                },
            ],
        },
    ];

    constructor(private contractService: ContractService, private alertService: AlertService, private dialog: MatDialog, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.checkIsActiveFormControl();
    }

    public checkIsActiveFormControl(event: any = { value: 'all' }): void {
        const searchParam = { ...this.pagination, ...this.form.value };
        event.value === 'all' && delete searchParam.isActive;
        this.getContractsList(searchParam);
    }

    public getContractsList(searchParams?: { organization: number; name?: string; isActive?: boolean }): void {
        this.contracts = [];
        this.contractService.getContractsList(searchParams).subscribe(
            (response) => {
                this.contracts = ContractListComponent.manipulateDateForTable(response.items);
                console.log(this.contracts);
                this.pagination.total = response.total;
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public openContractDialog(dialogType: 'edit' | 'create', contractInfo?: Contract): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(ContractDialogComponent, {
            data: dialogType === 'edit' ? contractInfo : null,
            width: '900px',
            height: '480px',
            panelClass: 'dialog-p-0',
        });
        dialogRef.afterClosed().subscribe((result) => result && this.checkIsActiveFormControl());
    }

    public openContractHistoryDialog(contractId: string): void {
        this.dialog.open(ContractHistoryDialogComponent, {
            data: contractId,
            width: '600px',
            height: '350px',
            panelClass: 'dialog-p-0',
        });
    }

    public openContractNoteDialog(contractId: string): void {
        this.dialog.open(ContractNoteDialogComponent, {
            data: contractId,
            width: '600px',
            height: '250px',
            panelClass: 'dialog-p-0',
        });
    }

    public openContractFormDialog(contractId: string): void {
        this.dialog.open(ContractFinalFormDialogComponent, {
            data: contractId,
            width: '800px',
            height: '350px',
            panelClass: 'dialog-p-0',
        });
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.checkIsActiveFormControl();
    }

    private changeContractStatus(contractId: string): void {
        this.contractService.changeContractStatus(contractId).subscribe(
            () => this.checkIsActiveFormControl(),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private static manipulateDateForTable(contracts: Array<Contract>): Array<ContractTableList> {
        let manipulatedContractList: Array<ContractTableList> = [];
        contracts.map((contract) => {
            manipulatedContractList.push({
                code: contract.code,
                contractType: contract.contractType.name,
                createdAt: contract.createdAt,
                customer: contract.customer.name,
                initializerUser: contract.initializerUser.name,
                curentStep: contract.curentStep,
                isActive: contract.isActive,
                name: contract.name,
                updatedAt: contract.updatedAt,
                _id: contract._id,
            });
        });

        return manipulatedContractList;
    }
}
