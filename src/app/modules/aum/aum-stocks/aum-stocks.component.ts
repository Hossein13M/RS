import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { Column } from '#shared/components/table/table.model';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'aum-stocks',
    templateUrl: './aum-stocks.component.html',
    styleUrls: ['./aum-stocks.component.scss'],
})
export class AumStocksComponent {
    @Input() aumStocks: any;
    columns: Array<Column>;

    constructor(public dialog: MatDialog) {
        this.createColumns();
    }

    createColumns() {
        this.columns = [
            { name: 'نام', id: 'name', type: 'string' },
            { name: 'ارزش روز', id: 'dayValue', type: 'price' },
            { name: 'قیمت روز', id: 'dayPrice', type: 'price' },
            { name: 'حجم کل', id: 'volume', type: 'number' },
            { name: 'درصد کل دارایی', id: 'percentageOfAssets', type: 'number' },
            { name: 'درصد کل سبد سهام', id: 'percentageOfStocks', type: 'number' },
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
                                { name: 'حجم', id: 'volume', type: 'number', headerAlign: 'center', dataAlign: 'center' },
                                { name: 'ارزش', id: 'value', type: 'price', headerAlign: 'center', dataAlign: 'center' },
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
