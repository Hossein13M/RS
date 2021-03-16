import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TableDialogComponent } from 'app/shared/components/table-dialog/table-dialog.component';
import { TableSearchMode } from '../../../shared/components/table/table-consts';

@Component({
    selector: 'aum-etf',
    templateUrl: './aum-etf.component.html',
    styleUrls: ['./aum-etf.component.scss'],
    animations: [fuseAnimations],
})
export class AumEtfComponent implements OnInit {
    @Input() aumEtf: any;
    tableColumn: Array<any> = [
        { id: 'symbol', name: 'نماد', type: 'string', search: { type: 'text', mode: TableSearchMode.LOCAL } },
        { id: 'dayPrice', name: 'قیمت پایانی', type: 'price' },
        { id: 'totalValue', name: 'ارزش کل', type: 'price' },
        { id: 'totalVolume', name: 'حجم کل', type: 'number' },
        { id: 'percentOfTotal', name: 'درصد از کل دارایی', type: 'number' },
        { id: 'placeOfTransaction', name: 'محل معامله', type: 'string', search: { type: 'select', mode: TableSearchMode.LOCAL } },
    ];
    isTableShowing: boolean = false;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {
        this.prepareTableColumns();
    }

    prepareTableColumns(): void {
        this.isTableShowing = false;
        const convert = (item: any): any => {
            return item?.value ? item?.value : 0;
        };

        this.aumEtf.columnSet.forEach((column: string, i: number) => this.tableColumn.push({ id: column, name: column, type: 'price', convert }));
        this.tableColumn.push({ name: 'عملیات', id: 'operation', type: 'operation' });

        this.tableColumn.push({
            id: 'rowDetail',
            type: 'rowDetail',
            click: (row) => console.log('row clicked once', row),
            doubleClickable: true,
            doubleClick: (row) => {
                const data = [];
                Object.keys(row).forEach((colName) => this.aumEtf.columnSet.includes(colName) && data.push({ ...row[colName], name: colName }));

                const dialogRef = this.dialog.open(TableDialogComponent, {
                    width: '80vw',
                    data: {
                        title: row.symbol,
                        columns: [
                            { name: 'حجم', id: 'volume', type: 'number', headerAlign: 'center', dataAlign: 'center' },
                            { name: 'ارزش', id: 'value', type: 'price', headerAlign: 'center', dataAlign: 'center' },
                            { name: 'نام', id: 'name', type: 'string', headerAlign: 'center', dataAlign: 'center' },
                        ],
                        data,
                    },
                });
            },
        });

        this.isTableShowing = true;
    }
}
