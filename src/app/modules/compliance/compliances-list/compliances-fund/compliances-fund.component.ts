import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompliancesService } from '../../compliances.service';
import { ComplianceFundModel, ComplianceModel } from '../../compliance.model';
import { ColumnModel } from '#shared/components/table/table.model';

@Component({
    selector: 'app-compliances-fund',
    templateUrl: './compliances-fund.component.html',
    styleUrls: ['./compliances-fund.component.scss'],
})
export class CompliancesFundComponent implements OnInit {
    data: Array<ComplianceFundModel> = [];
    column: Array<ColumnModel>;

    constructor(
        public dialogRef: MatDialogRef<CompliancesFundComponent>,
        private compliancesService: CompliancesService,
        @Inject(MAT_DIALOG_DATA) public dialogData: { compliance: ComplianceModel }
    ) {}

    ngOnInit(): void {
        console.log(this.dialogData);
        this.initColumn();
        this.getComplianceFunds();
    }

    initColumn(): void {
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

    getComplianceFunds(): void {
        this.compliancesService.getCompliancesFunds('1').subscribe((response) => {
            this.data = [...response];
        });
    }

    private update(row: any): void {}

    private delete(row: any): void {}
}
