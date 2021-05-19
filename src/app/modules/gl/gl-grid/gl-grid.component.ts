import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { formatDate } from '@angular/common';
import { GlListItem, GlListServerResponse } from '../gl.model';
import { GlService } from '../gl.service';

@Component({
    selector: 'app-gl-grid',
    templateUrl: './gl-grid.component.html',
    styleUrls: ['./gl-grid.component.scss'],
    animations: [fuseAnimations],
})
export class GlGridComponent implements OnInit {
    data: Array<GlListItem> = [];
    today: Date = new Date();
    form: FormControl = new FormControl(this.today);
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

    constructor(private glService: GlService) {}

    ngOnInit(): void {
        this.getGridData();
        this.form.valueChanges.subscribe(() => this.getGridData());
    }

    getGridData(): void {
        const search = { date: formatDate(this.form.value, 'yyyy-MM-dd', 'en_US'), limit: 1000, skip: 0 };
        this.glService.getGlGridData(search).subscribe((res: GlListServerResponse) => (this.data = res.items));
    }
}
