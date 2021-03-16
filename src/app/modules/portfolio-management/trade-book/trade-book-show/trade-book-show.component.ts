import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { TableElement } from '../trade-book.component';
import { TradeBookService } from '../trade-book.service';

@Component({
    selector: 'app-trade-book-show',
    templateUrl: './trade-book-show.component.html',
    styleUrls: ['./trade-book-show.component.scss'],
    animations: [fuseAnimations],
})
export class TradeBookShowComponent implements OnInit {
    org: string;
    ticker: string;
    pamCode: string;
    dateFromParam: string;
    dateFa: string;

    columns: Array<any>;
    displayedColumns: Array<string>;

    dataSource: MatTableDataSource<TableElement>;

    dataToShow: any;
    data: any;

    organizations: Array<any>;
    selectedOrg: any;

    isWorking: any;
    failed = false;

    constructor(private route: ActivatedRoute, public tbs: TradeBookService) {
        this.columns = [
            { name: 'تاریخ', id: 'dateFa', type: 'string', width: '200px' },
            { name: 'خرید/فروش', id: 'tradeType', type: 'price', width: '200px' },
            { name: 'حجم', id: 'volume', type: 'number', width: '10px' },
            { name: 'تعداد موجود', id: 'inventory', type: 'number', width: '200px' },
            { name: 'محل معامله', id: 'tradeLocation', type: 'string', width: '200px' },
            { name: 'ارزش', id: 'value', type: 'price', width: '200px' },
            { name: 'بهای تمام شده‌ی واحد', id: 'btu', type: 'price', width: '200px' },
            { name: 'بهای تمام شده‌ی کل', id: 'btt', type: 'price', width: '200px' },
            { name: 'سود و زیان واحد', id: 'plu', type: 'price', width: '200px' },
            { name: 'سود و زیان کل', id: 'plt', type: 'price', width: '200px' },
            { name: 'توضیحات', id: 'comments', type: 'price', width: '200px' },
        ];
        this.displayedColumns = ['position'];
        this.displayedColumns = this.displayedColumns.concat(this.columns.map((r) => r.id));
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((map: ParamMap) => {
            this.org = map.get('org');
            this.ticker = map.get('ticker');
            this.pamCode = map.get('pamCode');

            this.dateFromParam = map.get('date');
            this.dateFa = new Date(parseInt(this.dateFromParam, 10)).toLocaleDateString('fa-Ir', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });

            if (!this.tbs.searchForm.value.date) {
                this.tbs.searchForm.controls['date'].setValue(new Date(parseInt(this.dateFromParam, 10)));
            }

            this.tbs.specificationModel.limit = 10;
            this.tbs.specificationModel.skip = 0;

            this.get();
        });
    }

    get(): void {
        this.failed = false;

        let date;

        if (this.dateFromParam) {
            date = this.tbs.convertDate(new Date(parseInt(this.dateFromParam, 10)));
        }

        this.tbs.specificationModel.searchKeyword = {
            organization: this.org,
            ticker: this.ticker,
            pamCode: this.pamCode,
            date,
        };

        this.tbs.getTradeData(this).subscribe((r) => {
            this.tbs.setPageDetailData(r);
            this.patchData(this.parseData(r));
        });
    }

    parseData(r: any): any {
        if (!r || !r.items) {
            return;
        }

        r.items.forEach(
            (el) => (el.dateFa = new Date(el.transactionDate).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'numeric', day: 'numeric' }))
        );

        return r.items;
    }

    patchData(data: any): void {
        this.dataToShow = data;
        this.dataSource = new MatTableDataSource<TableElement>(this.dataToShow);
        // this.dataSource.sort = this.sort;
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }

    pageHandler(e: PagingEvent): void {
        this.tbs.specificationModel.limit = e.pageSize;
        this.tbs.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }
}
