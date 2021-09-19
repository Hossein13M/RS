import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { ContractTypeService } from './contract-type.service';
import { ContractTypeDialogComponent } from './contract-type-dialog/contract-type-dialog.component';
import { ContractType } from './contract-type.model';
import { AlertService } from '#shared/alert.service';

@Component({
    selector: 'app-contract-type',
    templateUrl: './contract-type.component.html',
    styleUrls: ['./contract-type.component.scss'],
})
export class ContractTypeComponent implements OnInit {
    public contractTypes: Array<ContractType>;
    private activeOrganizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public pagination = { skip: 0, limit: 5, total: 100 };

    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '200px' },
        { id: 'name', name: 'نوع قرارداد', type: 'string', minWidth: '200px' },
        { id: 'createdAt', name: 'تاریخ ساخت', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '200px' },
        { id: 'isActive', name: 'وضعیت نوع قرارداد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '200px' },
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
                    operation: (row: { operationItem: any; row: ContractType }) => this.openContractTypeDialog('edit', row.row),
                },
                {
                    name: 'تغییر وضعیت',
                    icon: 'sync',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: ContractType }) => this.changeContractTypeStatus(row.row._id),
                },
            ],
        },
    ];

    constructor(private contractService: ContractTypeService, private dialog: MatDialog, private readonly alertService: AlertService) {}

    ngOnInit(): void {
        this.getContractTypes();
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getContractTypes();
    }

    public getContractTypes(): void {
        this.contractService.getContractTypes({ ...this.pagination, organization: this.activeOrganizationCode }).subscribe(
            (response) => {
                this.contractTypes = response.items;
                this.pagination.total = response.total;
            },
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private changeContractTypeStatus(contractTypeId: string): void {
        this.contractService.changeContractTypeStatus(contractTypeId).subscribe(() => this.getContractTypes());
    }

    public openContractTypeDialog(dialogType: 'edit' | 'create', contractType?: ContractType): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(ContractTypeDialogComponent, {
            data: dialogType === 'edit' ? contractType : null,
            width: '1100px',
            height: '900px',
            panelClass: 'dialog-p-0',
        });
        dialogRef.afterClosed().subscribe((result) => result && this.getContractTypes());
    }
}
