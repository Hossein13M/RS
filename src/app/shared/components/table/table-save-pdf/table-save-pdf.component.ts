import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-table-save-pdf',
    template: `
        <button mat-menu-item
                [useExistingCss]="true"
                printSectionId='print-section'
                styleSheetFile='/assets/css/print-table.css'
                ngxPrint>
            ذخیره به فرمت PDF
        </button>
        <div #exportTable class='d-none' id='print-section'>
            <div class='table'>
                <div class='table-row'>
                    <ng-container *ngFor='let col of columns'>
                        <div class='table-header' *ngIf="col.id != 'operation'">
                            {{ col.name }}
                        </div>
                    </ng-container>
                </div>
                <div class='table-row'
                     *ngFor='let d of data'>
                    <div class='table-data' *ngFor='let col of columns'>
                        {{ col.convert ? col.convert(d[col.id]) : d[col.id] }}
                    </div>
                </div>
            </div>
        </div>
    `
})
export class TableSavePdfComponent {
    @Input() name = 'table';
    @Input() data: Array<any>;
    @Input() columns: Array<any>;

    exportTable = false;

    @ViewChild('exportTable', { static: true }) table: ElementRef;

    constructor() {
    }

    save(): void {
        // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        // const wb: XLSX.WorkBook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, this.name);
        // XLSX.writeFile(wb, `${this.name}.xlsx`);
    }
}