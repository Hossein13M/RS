import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { TableElement } from '../trade-book.component';
import { TradeBookService } from '../trade-book.service';
import { ColumnModel, PaginationChangeType } from '#shared/components/table/table.model';

@Component({
    selector: 'app-trade-book-show',
    templateUrl: './trade-book-show.component.html',
    styleUrls: ['./trade-book-show.component.scss'],
    animations: [fuseAnimations],
})
export class TradeBookShowComponent implements OnInit {
    data: any;
    columns: Array<ColumnModel> = [];
    pagination = { skip: 0, limit: 5, total: 100 };

    org: string;
    ticker: string;
    pamCode: string;
    dateFromParam: string;
    dateFa: string;

    displayedColumns: Array<string>;

    dataSource: MatTableDataSource<TableElement>;

    dataToShow: any;

    organizations: Array<any>;
    selectedOrg: any;

    failed = false;

    constructor(private route: ActivatedRoute, public tradeBookService: TradeBookService) {
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

            if (!this.tradeBookService.searchForm.value.date) {
                this.tradeBookService.searchForm.controls['date'].setValue(new Date(parseInt(this.dateFromParam, 10)));
            }

            this.tradeBookService.specificationModel.limit = 10;
            this.tradeBookService.specificationModel.skip = 0;
            this.initializeColumns();
            this.get();
        });
    }

    initializeColumns(): void {
        this.columns = [
            { name: 'تاریخ', id: 'dateFa', type: 'string', minWidth: '200px' },
            { name: 'خرید/فروش', id: 'tradeType', type: 'price', minWidth: '200px' },
            { name: 'حجم', id: 'volume', type: 'number', minWidth: '10px' },
            { name: 'تعداد موجود', id: 'inventory', type: 'number', minWidth: '200px' },
            { name: 'محل معامله', id: 'tradeLocation', type: 'string', minWidth: '200px' },
            { name: 'ارزش', id: 'value', type: 'price', minWidth: '200px' },
            { name: 'بهای تمام شده‌ی واحد', id: 'btu', type: 'price', minWidth: '200px' },
            { name: 'بهای تمام شده‌ی کل', id: 'btt', type: 'price', minWidth: '200px' },
            { name: 'سود و زیان واحد', id: 'plu', type: 'price', minWidth: '200px' },
            { name: 'سود و زیان کل', id: 'plt', type: 'price', minWidth: '200px' },
            { name: 'توضیحات', id: 'comments', type: 'price', minWidth: '400px' },
        ];
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.tradeBookService.specificationModel.limit = pageEvent.limit;
        this.tradeBookService.specificationModel.skip = pageEvent.skip * pageEvent.limit;
        this.get();
    }

    get(): void {
        this.failed = false;

        let date;

        if (this.dateFromParam) {
            date = this.tradeBookService.convertDate(new Date(parseInt(this.dateFromParam, 10)));
        }

        this.tradeBookService.specificationModel.searchKeyword = {
            organization: this.org,
            ticker: this.ticker,
            pamCode: this.pamCode,
            date,
        };

        this.tradeBookService.getTradeData(this).subscribe((res) => {
            this.tradeBookService.setPageDetailData(res);
            this.pagination.total = res.total;
            this.pagination.limit = res.limit;
            this.patchData(this.parseData(res));
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
        this.tradeBookService.specificationModel.limit = e.pageSize;
        this.tradeBookService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }
}
