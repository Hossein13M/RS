import { Column, TableSearchMode } from '#shared/components/table/table.model';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'aum-bonds',
    templateUrl: './aum-bonds.component.html',
    styleUrls: ['./aum-bonds.component.scss'],
})
export class AumBondsComponent {
    columns: Array<Column> = [];
    @Input() aumBonds: any;

    constructor(public dialog: MatDialog) {
        this.createColumn();
    }

    createColumn(): void {
        this.columns = [
            { name: 'نام', id: 'name', type: 'string', search: { type: 'text', mode: TableSearchMode.LOCAL } },
            { name: 'ارزش روز', id: 'dayValue', type: 'price' },
            { name: 'قیمت روز', id: 'dayPrice', type: 'price' },
            { name: 'حجم کل', id: 'volume', type: 'number' },
            { name: 'درصد کل دارایی', id: 'percentageOfAssets', type: 'number' },
            { name: 'درصد کل سبداوراق', id: 'percentageOfBonds', type: 'number' },
            { name: 'نرخ سود اسمی', id: 'couponRate', type: 'number' },
            { name: 'عملیات', id: 'operation', type: 'operation', minWidth: '20px' },
            {
                id: 'rowDetail',
                type: 'rowDetail',
                click: (row) => console.log('row clicked once', row),
                doubleClickable: true,
                doubleClick: (row) => {
                    const dialogRef = this.dialog.open(TableDialogComponent, {
                        width: '80vw',
                        data: {
                            title: row.name,
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
