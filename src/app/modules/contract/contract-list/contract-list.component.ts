import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#services/alert.service';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
    public contracts: Array<Contract>;
    public pagination = { skip: 0, limit: 5, total: 100 };
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '200px' },
        { id: 'name', name: 'قرارداد', type: 'string', minWidth: '200px' },
        { id: 'isActive', name: 'وضعیت قرارداد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '200px' },
        { id: 'createdAt', name: 'تاریخ ساخت', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '200px' },
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
                    name: 'تغییر وضعیت',
                    icon: 'sync_alt',
                    color: 'warn',
                    operation: (row: { operationItem: any; row: Contract }) => this.changeContractStatus(row.row._id),
                },
            ],
        },
    ];

    constructor(private contractService: ContractService, private alertService: AlertService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.getContractsList();
    }

    private getContractsList(): void {
        this.contracts = [];
        this.contractService.getContractsList().subscribe((response) => {
            this.contracts = response.items;
            this.pagination.total = response.total;
        });
    }

    private changeContractStatus(contractId: string): void {
        this.contractService.changeContractStatus(contractId).subscribe(
            () => this.getContractsList(),
            () => this.alertService.onError('مشکلی پیش آمده‌‌است')
        );
    }

    public openContractDialog(dialogType: 'edit' | 'create', contractInfo?: Contract): void {
        const dialogRef: MatDialogRef<any> = this.dialog.open(ContractDialogComponent, {
            data: dialogType === 'edit' ? contractInfo : null,
            width: '900px',
            height: '400px',
            panelClass: 'dialog-p-0',
        });
        dialogRef.afterClosed().subscribe((result) => result && this.getContractsList());
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getContractsList();
    }
}
