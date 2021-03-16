import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-table-save-xls',
    template: `
        <button mat-menu-item (click)="save()">ذخیره به فرمت XLS</button>
        <table #exportTable class="d-none">
            <tr>
                <ng-container *ngFor="let col of columns">
                    <th *ngIf="col.id != 'operation'">
                        {{ col.name }}
                    </th>
                </ng-container>
            </tr>
            <tr *ngFor="let d of data">
                <td *ngFor="let col of columns">
                    {{ col.convert ? col.convert(d[col.id]) : d[col.id] }}
                </td>
            </tr>
        </table>
    `,
})
export class TableSaveXLSComponent implements OnInit {
    @Input() name = 'table';
    @Input() data: Array<any>;
    @Input() columns: Array<any>;

    exportTable = false;

    @ViewChild('exportTable', { static: true }) table: ElementRef;

    constructor() {}

    ngOnInit(): void {}

    save(): void {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, this.name);
        XLSX.writeFile(wb, `${this.name}.xlsx`);
    }
}
