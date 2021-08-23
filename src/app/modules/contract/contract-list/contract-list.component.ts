import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { AlertService } from '#services/alert.service';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { ContractDialogComponent } from './contract-dialog/contract-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
    public contracts: Array<Contract>;
    public pagination = { skip: 0, limit: 5, total: 100 };
    public form: FormGroup = this.fb.group({
        name: [''],
        isActive: ['all'],
        organization: [UtilityFunctions.getActiveOrganizationInfo('code')],
    });

    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '200px' },
        { id: 'name', name: 'قرارداد', type: 'string', minWidth: '200px' },
        { id: 'createdAt', name: 'تاریخ ساخت', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '200px' },
        { id: 'isActive', name: 'وضعیت قرارداد', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '200px' },
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
        this.contractService.getContractsList(searchParams).subscribe((response) => {
            this.contracts = response.items;
            this.pagination.total = response.total;
        });
    }

    private changeContractStatus(contractId: string): void {
        this.contractService.changeContractStatus(contractId).subscribe(
            () => this.checkIsActiveFormControl(),
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
        dialogRef.afterClosed().subscribe((result) => result && this.checkIsActiveFormControl());
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.checkIsActiveFormControl();
    }
}
