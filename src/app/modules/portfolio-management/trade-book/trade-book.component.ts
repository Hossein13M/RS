import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { PMRoutePrefix } from '../portfolio-management.module';
import { TradeBookHistoryComponent } from './trade-book-history/trade-book-history.component';
import { TradeBookService } from './trade-book.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { StateType } from '#shared/state-type.enum';

export interface TableElement {
    bourseAccount: string;
    volume: number;
    vwap: number;
    asset: string;
    brokerName: string;
    vwapUpdateDate: string;
}

interface TradeBook {
    details: Array<any>;
    organization: string;
    totalAssets: string;
}

@Component({
    selector: 'app-trade-book',
    templateUrl: './trade-book.component.html',
    styleUrls: ['./trade-book.component.scss'],
    animations: [fuseAnimations],
})
export class TradeBookComponent implements OnInit {
    pageUrl = `/${PMRoutePrefix}/book`;
    stateType: StateType = StateType.INIT;
    form: FormGroup = this.fb.group({ date: [new Date()], tradingBook: [[]] });
    tradeBooksList: Array<{ id: number; name: string }> = [];
    tradeBookData: Array<TradeBook> = [];
    selectedTradingBook: TradeBook;
    displayedColumns: Array<string> = ['position', 'bourseAccount', 'volume', 'vwap', 'asset', 'brokerName', 'btt', 'vwapUpdateDate', 'operations'];
    dataSource: MatTableDataSource<TableElement>;

    constructor(private router: Router, private dialog: MatDialog, public tradingBookService: TradeBookService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getAllTradingBooks();
    }

    public showBook(organizationType: any, ticker: any, pamCode: string): void {
        const date = new Date(this.tradingBookService.searchForm.value.date).getTime();
        this.router.navigate([this.pageUrl, date, organizationType, ticker, pamCode]);
    }

    private getAllTradingBooks(): void {
        this.stateType = StateType.LOADING;
        let date = formatDate(this.form.value.date, 'yyyy-MM-dd', 'en_US');
        this.tradeBooksList = [];
        this.form.get('tradingBook').reset();
        if (this.dataSource) this.dataSource.data = [];

        this.tradingBookService.getTradingBooks(date).subscribe(
            (result: Array<{ details: Array<any>; organization: string; totalAssets: string }>) => {
                this.stateType = StateType.PRESENT;
                this.tradeBookData = result;
                this.handleTradingBooksDate();
                result.map((element, index: number) => this.tradeBooksList.push({ id: index, name: element.organization }));
            },
            () => (this.stateType = StateType.FAIL)
        );
    }

    public OnDateChange(): void {
        this.selectedTradingBook = null;
        this.getAllTradingBooks();
    }

    private handleTradingBooksDate(): void {
        this.tradeBookData.map((element) => {
            if (element && element.details) {
                element.details.forEach((detail) => {
                    let date;
                    if (detail.vwapAdjusted !== null) date = detail.vwapAdjustedUpdateDate;
                    if (detail.vwap !== null) date = detail.vwapUpdateDate;
                    if (detail.vwapAdjusted !== null && detail.vwap !== null) date = detail.vwapAdjustedUpdateDate;
                    if (!date) return;
                    detail.dateFa = new Date(date).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'numeric', day: 'numeric' });
                });
            }
        });
    }

    public onTradeBookChange(event: number): void {
        this.selectedTradingBook = this.tradeBookData[event];
        this.createTableData(this.tradeBookData[event].details);
    }

    private createTableData(data): void {
        if (!data) return;
        this.dataSource = new MatTableDataSource<TableElement>(data);
    }

    public showHistory(): void {
        this.dialog.open(TradeBookHistoryComponent, { panelClass: 'dialog-w50', data: { date: this.form.value.date } });
    }
}
