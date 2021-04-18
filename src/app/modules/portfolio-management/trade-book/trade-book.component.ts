import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { PMRoutePrefix } from '../portfolio-management.module';
import { TradeBookHistoryComponent } from './trade-book-history/trade-book-history.component';
import { TradeBookService } from './trade-book.service';

export interface TableElement {
    bourseAccount: string;
    volume: number;
    vwap: number;
    asset: string;
    brokerName: string;
    vwapUpdateDate: string;
}

@Component({
    selector: 'app-trade-book',
    templateUrl: './trade-book.component.html',
    styleUrls: ['./trade-book.component.scss'],
    animations: [fuseAnimations],
})
export class TradeBookComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    pageUrl = `/${PMRoutePrefix}/book`;
    displayedColumns: string[] = ['position', 'bourseAccount', 'volume', 'vwap', 'asset', 'brokerName', 'btt', 'vwapUpdateDate', 'operations'];
    dataSource: MatTableDataSource<TableElement>;
    dataToShow: any;
    data: any;
    organizations: Array<any>;
    selectedOrg: any;
    isWorking: any;
    failed = false;
    selectedOrgName: any;

    constructor(private router: Router, private dialog: MatDialog, public tbs: TradeBookService) {}

    ngOnInit(): void {
        this.tbs.searchForm.valueChanges.subscribe((r) => {
            this.tbs.specificationModel.searchKeyword = r;
            this.tbs.specificationModel.skip = undefined;
            this.get();
        });

        // Get Last Query From Session Storage Or Get New
        const lastSearchData = sessionStorage.getItem('lastTradeBookData');
        if (lastSearchData) {
            const lastBookParsed = JSON.parse(lastSearchData);
            this.patchData(this.parseData(lastBookParsed.data));
        } else this.get();
    }

    get(date?: string): void {
        if (!date) date = this.tbs.convertDate(this.tbs.searchForm.value.date);

        this.failed = false;
        this.organizations = null;
        this.selectedOrgName = null;

        this.patchData(null);

        this.tbs.specificationModel.limit = undefined;
        this.tbs.specificationModel.skip = undefined;

        this.tbs.specificationModel.searchKeyword = { date: date };
        this.tbs.getAllTradeBooks(this).subscribe((data) => {
            // Save Last Query to session
            sessionStorage.setItem('lastTradeBookData', JSON.stringify({ data }));

            this.patchData(this.parseData(data));
        });
    }

    parseData(newData: any) {
        if (!newData) return;

        this.organizations = [];

        newData.forEach((el, i) => {
            this.organizations.push({ id: i, name: el.organization });

            // Localize Date
            if (el && el.details) {
                el.details.forEach((detail) => {
                    let date;
                    if (detail.vwapAdjusted !== null) date = detail.vwapAdjustedUpdateDate;

                    if (detail.vwap !== null) date = detail.vwapUpdateDate;

                    if (detail.vwapAdjusted !== null && detail.vwap !== null) date = detail.vwapAdjustedUpdateDate;

                    if (!date) return;

                    detail.dateFa = new Date(date).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'numeric', day: 'numeric' });
                });
            }
        });
        this.data = newData;

        if (this.tbs.selectedOrgName) {
            this.selectedOrg = this.data[this.tbs.selectedOrgName];
            return this.data[this.tbs.selectedOrgName].details;
        }
        return;
    }

    patchData(data: any): void {
        if (!data) return;

        this.dataToShow = data;
        this.dataSource = new MatTableDataSource<TableElement>(this.dataToShow);
        this.dataSource.sort = this.sort;
    }
    handleError(): boolean {
        this.failed = true;
        return false;
    }

    changeForm(event: MatSelectChange): void {
        this.selectedOrg = this.data[event.value];
        this.patchData(this.data[event.value].details);
    }

    showBook(organizationType: any, ticker: any, pamCode: string): void {
        const date = new Date(this.tbs.searchForm.value.date).getTime();
        this.router.navigate([this.pageUrl, date, organizationType, ticker, pamCode]);
    }

    showHistory(): void {
        this.dialog.open(TradeBookHistoryComponent, { panelClass: 'dialog-w50', data: { date: this.tbs.searchForm.value.date } });
    }
}
