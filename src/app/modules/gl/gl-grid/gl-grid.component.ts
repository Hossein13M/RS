import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GlService } from 'app/modules/gl/gl.service';

@Component({
    selector: 'app-gl-grid',
    templateUrl: './gl-grid.component.html',
    styleUrls: ['./gl-grid.component.scss'],
    animations: [fuseAnimations],
})
export class GlGridComponent implements OnInit {
    data = [];
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = [
        'categoryLedgerName',
        'groupLedgerName',
        'generalLedgerName',
        'subsidiaryLedgerName',
        'detailLedgerName',
        'aggregatedCreditAmount',
        'aggregatedDebitAmount',
        'aggregatedRemainedAmount',
    ];
    today = new Date();
    dateForm = new FormControl(this.today);
    columns = [
        { id: 'categoryLedgerName', name: 'دسته بندی', type: 'string' },
        { id: 'groupLedgerName', name: 'گروه', type: 'string' },
        { id: 'generalLedgerName', name: 'سطح کل', type: 'string' },
        { id: 'subsidiaryLedgerName', name: 'سطح معین', type: 'string' },
        { id: 'detailLedgerName', name: 'سطح تفضیل', type: 'string' },
        { id: 'aggregatedCreditAmount', name: 'گردش بدهکار', type: 'price' },
        { id: 'aggregatedDebitAmount', name: 'گردش بستانکار', type: 'price' },
        { id: 'aggregatedRemainedAmount', name: 'مانده', type: 'string' },
    ];
    isWorking: any;

    constructor(private glService: GlService) {}

    ngOnInit(): void {
        this.getGridData();
        this.dateForm.valueChanges.subscribe(() => this.getGridData());
    }

    getGridData(): void {
        const search = { date: this.dateForm.value, limit: 1000, skip: 0 };
        this.glService.getGlGridData(search).subscribe((res: any) => (this.data = res.items));
    }

    handleError(): boolean {
        return false;
    }
}
