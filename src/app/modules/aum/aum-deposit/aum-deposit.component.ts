import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { Column } from '#shared/components/table/table.model';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'aum-deposit',
    templateUrl: './aum-deposit.component.html',
    styleUrls: ['./aum-deposit.component.scss'],
})
export class AumDepositComponent {
    @Input() aumDeposit: any;
    columns: Array<Column>;

    constructor(public dialog: MatDialog) {
        this.createColumns();
    }

    private createColumns(): void {
        this.columns = [
            { name: 'شماره ی سپرده', id: 'accountNumber', type: 'string' },
            { name: 'نام بانک', id: 'bankName', type: 'string' },
            { name: 'نام شعبه', id: 'branchName', type: 'string' },
            { name: 'دارایی', id: 'remainingAmount', type: 'number' },
            { name: 'نوع سپرده', id: 'bankAccountTypeName', type: 'string' },
            { name: 'نرخ سود', id: 'Interest', type: 'number' },
            { name: 'درصد از سبد سپرده', id: 'percentageOfSeporde', type: 'number' },
            { name: 'درصد از کل دارایی', id: 'percentageOfAssets', type: 'number' },
            {
                id: 'rowDetail',
                type: 'rowDetail',
                doubleClickable: true,
                click: (row) => console.log('row clicked once', row),
                doubleClick: (row) => {
                    const dialogRef = this.dialog.open(TableDialogComponent, {
                        width: '80vw',
                        data: {
                            title: `${row.accountNumber} - ${row.bankName}`,
                            columns: [
                                {
                                    name: 'حجم',
                                    id: 'volume',
                                    type: 'number',
                                    headerAlign: 'center',
                                    dataAlign: 'center',
                                },
                                {
                                    name: 'ارزش',
                                    id: 'value',
                                    type: 'price',
                                    headerAlign: 'center',
                                    dataAlign: 'center',
                                },
                                { name: 'نام', id: 'name', type: 'string', headerAlign: 'center', dataAlign: 'center' },
                            ],
                            data: row.details,
                        },
                    });
                },
            },
        ];
    }
}
