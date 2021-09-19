import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { StateType } from 'app/shared/state-type.enum';
import * as _ from 'lodash';
import { debounceTime } from 'rxjs/operators';
import { TradeSearchService } from './trade-search.service';
import { TableElement } from '../trade-book/trade-book.model';

interface Ticker {
    id: number;
    isInBourse: boolean;
    name: string;
    status: string;
    ticker: string;
}

@Component({
    selector: 'app-trade-search',
    templateUrl: './trade-search.component.html',
    styleUrls: ['./trade-search.component.scss'],
    animations: [fuseAnimations],
})
export class TradeSearchComponent implements OnInit {
    form: FormGroup = this.formBuilder.group({
        transactionDateStart: ['', [Validators.required]],
        transactionDateEnd: ['', [Validators.required]],
        valueStart: ['', [Validators.required]],
        valueEnd: ['', [Validators.required]],
        pltStart: ['', [Validators.required]],
        pltEnd: ['', [Validators.required]],
        volumeStart: ['', [Validators.required]],
        volumeEnd: ['', [Validators.required]],
        tradeType: ['', [Validators.required]],
        tradeLocation: ['', [Validators.required]],
        organization: ['', { disabled: true }, [Validators.required]],
    });
    searchCollapse: boolean = true;
    pagination = { skip: 0, limit: 5, total: 100 };
    organizations: Array<{ organizationName: string; organizationType: string }> = [];
    today: Date = new Date();
    tradeLocations = [
        { name: 'بورسی', value: 1 },
        { name: 'غیر بورسی', value: 2 },
        { name: 'همه', value: 3 },
    ];
    tradeTypes = [
        { name: 'خرید', value: 1 },
        { name: 'فروش', value: 2 },
        { name: 'سود خرید', value: 3 },
        { name: 'سود فروش', value: 4 },
        { name: 'تفاوت کارمزد خرید', value: 5 },
        { name: 'تفاوت کارمزد فروش', value: 6 },
    ];
    columns: Array<any>;
    displayedColumns: Array<string>;
    dataSource: MatTableDataSource<TableElement>;
    dataToShow: any;
    data: any;
    failed = false;
    stateType: StateType;
    isWorking: any;
    model: any;
    addTicker: FormControl;
    tickersCtrl: FormControl;
    tickers: any;
    selectedTickersList = [];

    constructor(private formBuilder: FormBuilder, private tradeSearchService: TradeSearchService) {}

    ngOnInit(): void {
        this.createColumns();
        this.getOrganizations();
        this.tickersCtrl = this.formBuilder.control('');
        this.addTicker = this.formBuilder.control('');
        this.getTickers('');
        this.tickersCtrl.valueChanges.pipe(debounceTime(200)).subscribe((searchKey) => this.getTickers(searchKey));
        this.addTicker.valueChanges.pipe(debounceTime(200)).subscribe((newTicker) => newTicker && this.addTicker.reset());
    }

    public paginationControl(pageEvent?: any): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.submitForm();
    }

    public submitForm(): void {
        this.stateType = StateType.LOADING;
        this.searchCollapse = false;

        if (this.form.value.transactionDateStart._d instanceof Date)
            this.form.get('transactionDateStart').setValue(this.form.value.transactionDateStart.toISOString());

        if (this.form.value.transactionDateEnd._d instanceof Date)
            this.form.get('transactionDateEnd').setValue(this.form.value.transactionDateEnd.toISOString());
        // the reason for the above two if codes are that we do not change them if they are iso string

        this.tradeSearchService.searchTrade(this.pagination, this.form.value).subscribe(
            (r) => {
                this.pagination.total = r.total;
                this.parseData(r);
                this.stateType = StateType.PRESENT;
            },
            () => (this.stateType = StateType.FAIL)
        );
    }

    public clearFilters(): void {
        this.form.reset();
        this.selectedTickersList = [];
    }

    public removeTicker(ticker: any): void {
        this.selectedTickersList = this.selectedTickersList.filter((el) => el.id !== ticker.id);
    }

    public selectTicker(ticker: any): void {
        const existTicker = this.selectedTickersList.find((el) => el.id === ticker.id);
        if (!existTicker) this.selectedTickersList.push(ticker);
    }

    public selectAllHandler(checkbox: MatCheckbox, controlName: string, values: Array<any>, key = 'id'): void {
        if (checkbox.checked) {
            this.form.controls[controlName].setValue(_.map(_.map(values, key), (value) => value.toString()));
        } else this.form.controls[controlName].patchValue([]);
    }

    public OptionAllState(controlName: string, values: Array<any>, key = 'id'): 'all' | 'indeterminate' | 'none' {
        const control: AbstractControl = this.form.controls[controlName];
        const mappedValues = _.map(_.map(values, key), (value) => value.toString());
        const difference = _.difference(mappedValues, control.value).length;
        if (difference === 0) {
            return 'all';
        } else if (difference === values.length) {
            return 'none';
        }
        return 'indeterminate';
    }

    private getOrganizations() {
        this.tradeSearchService.getOrganizations().subscribe((response) => {
            this.organizations = response;
            this.form.controls['organization'].enable(); // need to ask why it is disabled as default
        });
    }

    private createColumns() {
        this.columns = [
            { name: 'تاریخ', id: 'dateFa', type: 'string', minWidth: '100px' },
            { name: 'میز/سبد', id: 'organizationType', type: 'string', minWidth: '100px' },
            { name: 'خرید/فروش', id: 'tradeType', type: 'price', minWidth: '120px' },
            {
                name: 'نماد',
                id: 'ticker',
                type: 'string',
                minWidth: '200px',
                convert: (value: any) => {
                    const foundedTicker = this.selectedTickersList.find((el) => el.ticker === value);
                    return foundedTicker ? (foundedTicker.name.length > 6 ? foundedTicker.name.slice(0, 6) + '...' : foundedTicker.name) : value;
                },
            },
            { name: 'حجم', id: 'volume', type: 'number', minWidth: '150px' },
            { name: 'تعداد موجود', id: 'inventory', type: 'number', minWidth: '150px' },
            { name: 'محل معامله', id: 'tradeLocation', type: 'string', minWidth: '100px' },
            { name: 'ارزش', id: 'value', type: 'price', minWidth: '150px' },
            { name: 'بهای تمام شده‌ی واحد', id: 'btu', type: 'price', minWidth: '150px' },
            { name: 'بهای تمام شده‌ی کل', id: 'btt', type: 'price', minWidth: '150px' },
            { name: 'سود و زیان واحد', id: 'plu', type: 'profit', minWidth: '150px' },
            { name: 'سود و زیان کل', id: 'plt', type: 'profit', minWidth: '150px' },
            { name: 'کارمزد', id: 'commission', type: 'price', minWidth: '200px' },
            { name: 'توضیحات', id: 'comments', type: 'price', minWidth: '450px' },
        ];
    }

    private getTickers(searchKeyword: string): void {
        this.tradeSearchService.getBourseInstrumentDetailControllerBondsList(searchKeyword).subscribe((list) => {
            if (!list.items) return;

            list.items.forEach((el: Ticker) => {
                if (!el.name) return;
                const splitText = el.name.split('-');
                if (splitText) el['nameFa'] = splitText[0];
            });
            this.tickers = list.items;
        });
    }

    private parseData(r: any): void {
        if (!r || !r.items) return;

        r.items.forEach((el: any) => {
            el.dateFa = new Date(el.transactionDate).toLocaleDateString('fa-Ir', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        });

        this.patchData(r.items);
    }

    private patchData(data: any): void {
        this.dataToShow = data;
        this.dataSource = new MatTableDataSource<TableElement>(this.dataToShow);
    }
}
