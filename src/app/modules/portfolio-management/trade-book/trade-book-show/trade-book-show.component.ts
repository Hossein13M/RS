import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TradeBookService } from '../trade-book.service';
import { Column } from '#shared/components/table/table.model';
import { TradeBookData, TradeDateServerResponse } from '../trade-book.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-trade-book-show',
    templateUrl: './trade-book-show.component.html',
    styleUrls: ['./trade-book-show.component.scss'],
    animations: [fuseAnimations],
})
export class TradeBookShowComponent implements OnInit {
    data: Array<TradeDateServerResponse> = [];
    columns: Array<Column> = [];
    pagination = { skip: 0, limit: 5, total: 100 };
    tradeBookData: TradeBookData = { organization: '', ticker: '', pamCode: '', date: '' };
    persianDate: string;
    displayedColumns: Array<string>;
    hasDataFetched: boolean = false;

    constructor(private route: ActivatedRoute, public tradeBookService: TradeBookService) {}

    ngOnInit(): void {
        this.getDataFromRoute();
        this.initializeTableColumns();
        this.getTradeBookData();
    }

    private getDataFromRoute(): void {
        this.route.paramMap.subscribe((map: ParamMap) => {
            this.tradeBookData.organization = map.get('org');
            this.tradeBookData.ticker = map.get('ticker');
            this.tradeBookData.pamCode = map.get('pamCode');
            this.tradeBookData.date = map.get('date');
            this.persianDate = new Date(parseInt(this.tradeBookData.date, 10)).toLocaleDateString('fa-Ir', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        });
    }

    private initializeTableColumns(): void {
        this.columns = [
            { name: 'تاریخ', id: 'persianDate', type: 'string', minWidth: '200px' },
            { name: 'خرید/فروش', id: 'tradeType', type: 'string', minWidth: '200px' },
            { name: 'حجم', id: 'volume', type: 'number', minWidth: '10px' },
            { name: 'تعداد موجود', id: 'inventory', type: 'number', minWidth: '200px' },
            { name: 'محل معامله', id: 'tradeLocation', type: 'string', minWidth: '200px' },
            { name: 'ارزش', id: 'value', type: 'price', minWidth: '200px' },
            { name: 'بهای تمام شده‌ی واحد', id: 'btu', type: 'price', minWidth: '200px' },
            { name: 'بهای تمام شده‌ی کل', id: 'btt', type: 'price', minWidth: '200px' },
            { name: 'سود و زیان واحد', id: 'plu', type: 'price', minWidth: '200px' },
            { name: 'سود و زیان کل', id: 'plt', type: 'price', minWidth: '200px' },
            { name: 'توضیحات', id: 'comments', type: 'string', minWidth: '400px' },
        ];
    }

    public paginationControl(): void {
        this.getTradeBookData();
    }

    public getTradeBookData(): void {
        this.hasDataFetched = false;
        this.tradeBookData.date = UtilityFunctions.convertDateToPersianDateString(new Date(this.tradeBookData.date));
        this.tradeBookService.getTradeDataByDate({ ...this.tradeBookData, ...this.pagination }).subscribe((response) => {
            this.pagination.total = response.total;
            this.data = this.parseData(response);
        });
    }

    private parseData(serverResponse: any): Array<TradeDateServerResponse> {
        if (!serverResponse || !serverResponse.items) return;
        serverResponse.items.forEach(
            (el) => (el.persianDate = new Date(el.transactionDate).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'numeric', day: 'numeric' }))
        );
        return serverResponse.items;
    }
}
