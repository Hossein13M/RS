import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompliancesService } from '../../compliances.service';
import { Compliance, ComplianceFund } from '../../compliance.model';
import { Column } from '#shared/components/table/table.model';
import { CompliancesFundAddComponent } from './compliances-fund-add/compliances-fund-add.component';

@Component({
    selector: 'app-compliances-fund',
    templateUrl: './compliances-fund.component.html',
    styleUrls: ['./compliances-fund.component.scss'],
})
export class CompliancesFundComponent implements OnInit {
    data: Array<ComplianceFund> = [];
    column: Array<Column>;

    constructor(
        public dialogRef: MatDialogRef<CompliancesFundComponent>,
        private matDialog: MatDialog,
        private compliancesService: CompliancesService,
        @Inject(MAT_DIALOG_DATA) public dialogData: { compliance: Compliance }
    ) {}

    ngOnInit(): void {
        this.initColumn();
        this.getComplianceFunds();
    }

    private initColumn(): void {
        this.column = [
            {
                id: 'fundName',
                name: 'نام صندوق‌',
                type: 'string',
            },
            {
                id: 'down',
                name: 'حد پایین',
                type: 'number',
            },
            {
                id: 'up',
                name: 'حد بالا',
                type: 'number',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.update(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
                ],
            },
        ];
    }

    private getComplianceFunds(): void {
        if (!this.dialogData.compliance.id) return;
        this.compliancesService.getCompliancesFunds(this.dialogData.compliance.id).subscribe((response) => {
            this.data = [...response];
        });
    }

    public create(): void {
        this.matDialog
            .open(CompliancesFundAddComponent, {
                panelClass: 'dialog-w60',
                data: { fund: null, complianceId: this.dialogData.compliance.id },
            })
            .afterClosed()
            .subscribe((response: ComplianceFund) => {
                if (response) {
                    this.getComplianceFunds();
                }
            });
    }

    public update(row: any): void {
        this.matDialog
            .open(CompliancesFundAddComponent, {
                panelClass: 'dialog-w60',
                data: { fund: row, complianceId: this.dialogData.compliance.id },
            })
            .afterClosed()
            .subscribe((response: ComplianceFund) => {
                if (response) {
                    this.getComplianceFunds();
                }
            });
    }

    public delete(row: any): void {}
}
