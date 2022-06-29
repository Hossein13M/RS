import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { Column } from '#shared/components/table/table.model';

@Component({
    selector: 'app-table-save-pdf',
    styleUrls: ['table-save-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
        <button mat-menu-item [useExistingCss]="true" printSectionId="print-section" styleSheetFile="/assets/css/print-table.css" ngxPrint>
            ذخیره به فرمت PDF
        </button>
        <div #exportTable class="d-none" id="print-section">
            <div class="print-table--container">
                <div class="print-table">
                    <div class="print-table--row">
                        <ng-container *ngFor="let col of columns">
                            <div class="print-table--header" *ngIf="col.id != 'operation'">
                                {{ col.name }}
                            </div>
                        </ng-container>
                    </div>
                    <div class="print-table--row" *ngFor="let d of data">
                        <div class="print-table--data" *ngFor="let col of columns">
                            {{ col.convert ? col.convert(d[col.id]) : d[col.id] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class TableSavePdfComponent implements OnInit, AfterViewInit {
    @Input() name = 'table';
    @Input() data: Array<any>;
    @Input() columns: Array<Column>;
    _columns: Array<Column> = [];

    exportTable = false;

    @ViewChild('exportTable', { static: true }) table: ElementRef;

    ngOnInit(): void {
        this._columns = [...this.columns];
    }

    ngAfterViewInit(): void {
        if (this._columns) {
            if (_.last(this._columns).type === 'operation') {
                this._columns.pop();
            }
        }
    }

    save(): void {
        // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        // const wb: XLSX.WorkBook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, this.name);
        // XLSX.writeFile(wb, `${this.name}.xlsx`);
    }
}
