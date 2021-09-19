import { TableSearchMode } from '#shared/components/table/table.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AlertService } from '#shared/services/alert.service';
import { LocalStorageService } from 'app/services/Base/local-storage.service';
import { NavAddChangeDialogComponent } from '../nav-add-change-dialog/nav-add-change-dialog.component';
import { NavTransactionModel } from '../nav-main/nav-main.component';
import { NavService } from '../nav.service';

export enum stateType {
    'LOADING',
    'SELECT',
    'RESULT',
}

@Component({
    selector: 'app-nav-item-detail',
    templateUrl: './nav-item-detail.component.html',
    styleUrls: ['./nav-item-detail.component.scss'],
    animations: [fuseAnimations],
})
export class NavItemDetailComponent implements OnInit {
    @Input() fundId;
    @Input() date: Date;
    navObj: NavTransactionModel[] = [];
    navPlannedRate;
    columns: any;
    data: Array<any>;
    transitionTypeColumnsTypes = [
        { name: 'خرید ابزارهای بورسی', id: '1', columns: ['ticker', 'volume'] },
        { name: 'فروش ابزارهای بورسی', id: '2', columns: ['ticker', 'volume'] },
        { name: 'صدور صندوق', id: '3', columns: ['ticker', 'volume', 'rate'] },
        { name: 'ابطال صندوق', id: '4', columns: ['ticker', 'volume', 'rate'] },
        { name: 'برداشت از سپرده', id: '5', columns: ['accountNumber', 'amount'] },
        { name: 'بازکردن سپرده', id: '6', columns: ['rate', 'description', 'paymentDay', 'amount'] },
        { name: 'تعیین قیمت کارشناسی', id: '7', columns: ['ticker', 'estimatedPrice'] },
        { name: 'خرید اوراق بانکی', id: '8', columns: ['ticker', 'volume', 'amount'] },
        { name: 'فروش اوراق بانکی', id: '9', columns: ['ticker', 'volume', 'amount'] },
        { name: 'تعیین سود تقسیمی سهام', id: '10', columns: ['ticker', 'DPS', 'DPSDate', 'discountRate'] },
        { name: 'صدور واحدها', id: '12', columns: ['volume', 'rate'] },
        { name: 'ابطال واحدها', id: '13', columns: ['volume', 'rate'] },
    ];
    showingTransitionTypeColumnsTypes = [];

    columnsTypes = {
        transactionType: {
            name: 'نوع',
            id: 'transactionType',
            type: 'string',
            minWidth: '200px',
            search: { type: 'select', mode: TableSearchMode.LOCAL },
            convert: (code) => {
                return this.getTransactionType(parseInt(code, 10));
            },
        },

        ticker: {
            name: 'نام نماد',
            id: 'ticker',
            type: 'string',
            minWidth: '200px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
            convert: (ticker) => {
                return ticker.symbol ? ticker.symbol : ticker.name ? ticker.name : '-';
            },
        },
        volume: { name: 'حجم', id: 'volume', type: 'string', minWidth: '200px', search: { type: 'text', mode: TableSearchMode.LOCAL } },
        rate: { name: 'نرخ', id: 'rate', type: 'string', minWidth: '200px', search: { type: 'text', mode: TableSearchMode.LOCAL } },
        accountNumber: {
            name: 'شماره حساب',
            id: 'accountNumber',
            type: 'string',
            minWidth: '200px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        amount: { name: 'قیمت', id: 'amount', type: 'string', minWidth: '200px', search: { type: 'text', mode: TableSearchMode.LOCAL } },
        description: { name: 'توضیحات', id: 'description', type: 'string', minWidth: '200px', search: { type: 'text', mode: TableSearchMode.LOCAL } },
        paymentDay: {
            name: 'روز پرداخت',
            id: 'paymentDay',
            type: 'string',
            minWidth: '200px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        estimatedPrice: {
            name: 'قیمت کارشناسی',
            id: 'estimatedPrice',
            type: 'string',
            minWidth: '200px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        DPS: { name: 'سود هر سهم', id: 'DPS', type: 'string', minWidth: '200px', search: { type: 'text', mode: TableSearchMode.LOCAL } },
        DPSDate: {
            name: 'تاریخ پرداخت سود',
            id: 'DPSDate',
            type: 'string',
            minWidth: '200px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },
        discountRate: {
            name: 'نرخ تنظیم',
            id: 'discountRate',
            type: 'string',
            minWidth: '200px',
            search: { type: 'text', mode: TableSearchMode.LOCAL },
        },

        operations: {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '130px',
            sticky: true,
            operations: [
                { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => (this.data = this.data.filter((el) => el !== row)) },
            ],
        },
    };

    filterCtl = new FormControl(['']);
    lastParsedSelection: any;
    state = stateType.SELECT;
    stateType = stateType;
    result: any = {
        currentFundUnits: 49999714,
        fundRealTimeNav: 62604217545727680,
        fundRealTimeNavPerunit: 1252091512.8780072,
        fundRealTimeTotalUnits: 49999714,
        fundVarianceNavPerunit: 25.021646149266527,
        netTodayFundTransactions: 0,
        plannedNav: 1016361.6054794522,
        variance: 1251075151.2725277,
    };

    constructor(private dialog: MatDialog, private navService: NavService, private alertService: AlertService) {
        Object.keys(this.result).forEach((name) => (this.result[name] = Math.round(this.result[name])));

        this.data = [];
        this.columns = [];

        this.filterCtl.valueChanges.subscribe((newSelection: any) => {
            this.showingTransitionTypeColumnsTypes = [];
            for (const newSelectionElement of newSelection) {
                const foundedColumnsTypes = this.transitionTypeColumnsTypes.find((el) => el.id === newSelectionElement);
                if (foundedColumnsTypes) {
                    this.showingTransitionTypeColumnsTypes.push(foundedColumnsTypes);
                }
            }

            if (JSON.stringify(this.lastParsedSelection) !== JSON.stringify(this.showingTransitionTypeColumnsTypes)) {
                const newColumns = [this.columnsTypes['transactionType']];

                this.showingTransitionTypeColumnsTypes.forEach((type) => {
                    if (!type || !type.columns) return;

                    type.columns.forEach((column) => {
                        const foundedIndex = newColumns.findIndex((el: any) => el.id === column);
                        if (foundedIndex === -1) newColumns.push(this.columnsTypes[column]);
                    });
                });

                // newColumns.sort((a, b) => {
                //     // Sort By Index In Array
                //     const aOrder = Object.keys(this.columnsTypes).findIndex((el) => el === a.id);
                //     const bOrder = Object.keys(this.columnsTypes).findIndex((el) => el === b.id);
                //     return bOrder - aOrder;
                // });

                this.columns = [...newColumns, this.columnsTypes['operations']];
            }

            this.data = [...this.data];
            this.lastParsedSelection = this.showingTransitionTypeColumnsTypes;
        });
    }

    ngOnInit(): void {
        this.navObj = LocalStorageService.getNav();
    }

    getTransactionType(code): string {
        switch (code) {
            case 1:
                return 'خرید سهام';
            case 2:
                return 'فروش سهام';
            case 3:
                return 'صدور صندوق';
            case 4:
                return 'ابطال صندوق';
            case 5:
                return 'برداشت از سپرده / گواهی سپرده';
            case 6:
                return 'باز کردن سپرده / گواهی سپرده';
            case 7:
                return 'قیمت کارشناسی';
            case 8:
                return 'خرید اوراق بانکی';
            case 9:
                return 'فروش اوراق بانکی';
            case 10:
                return 'سود تقسیمی';
        }
    }

    removeItem(obj, index): void {
        const selected = this.navObj.filter((x, i) => {
            if (index === i) return x;
        })[0];
        if (selected) {
            const i = this.navObj.indexOf(selected);
            if (i > -1) this.navObj.splice(i, 1);
        }
        LocalStorageService.setNav(this.navObj);
    }

    processNAV(): void {
        const obj = {
            fundNationalCode: this.fundId,
            transactions: this.data.map((el) => {
                const tmpEl = { ...el };
                tmpEl.transactionType = parseInt(tmpEl.transactionType, 10);
                if (tmpEl.ticker) {
                    tmpEl.ticker = tmpEl.ticker.ticker ? tmpEl.ticker.ticker : tmpEl.ticker.code ? tmpEl.ticker.code : '';
                }
                return tmpEl;
            }),
        };

        this.state = stateType.LOADING;
        this.navService.processNav(obj).subscribe(
            (_) => {
                this.navService
                    .processNAVRuntime(this.fundId, this.navPlannedRate ? this.navPlannedRate : 20, this.date ? this.date : new Date())
                    .subscribe(
                        (processedNAV) => {
                            this.result = processedNAV;
                            Object.keys(processedNAV).forEach((name) => {
                                processedNAV[name] = Math.round(processedNAV[name]);
                            });
                            this.state = stateType.RESULT;
                        },
                        () => {
                            this.state = stateType.SELECT;
                            this.alertService.onError('محاسبه‌ی NAV موفق نبود');
                        }
                    );
            },
            () => {
                this.state = stateType.SELECT;
                this.alertService.onError('ثبت تفییرات موفق نبود');
            }
        );

        //
        // this.dialog.open(NavProcessDetailDialogComponent, {
        //     data: {fundId: this.fundId, plannedRate: this.navPlannedRate ? this.navPlannedRate : 20},
        //     panelClass: 'dialog-w40'
        // }).afterClosed().subscribe(
        //     _ => {
        //     }
        // );
    }

    openAddChangeDialog(): void {
        this.dialog
            .open(NavAddChangeDialogComponent, {
                panelClass: 'dialog-w50',
                data: { navFundType: this.fundId },
            })
            .afterClosed()
            .subscribe((newData: any) => {
                if (newData) {
                    this.data.push(newData);
                    this.data = [...this.data];
                    const foundedColumn = this.filterCtl.value.find((el) => el === newData.transactionType);
                    if (this.filterCtl.value && !this.filterCtl.value.find((el) => el === newData.transactionType)) {
                        this.filterCtl.setValue([...this.filterCtl.value.filter((el) => !!el), newData.transactionType]);
                    }
                }
            });
    }
}
