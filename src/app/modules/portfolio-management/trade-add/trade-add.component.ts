import { PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'app/services/alert.service';
import { debounceTime } from 'rxjs/operators';
import { TradeAddService } from './trade-add.service';
import { Ticker, TradeOrganization } from './trade-add.model';
import { StateType } from '#shared/state-type.enum';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-trade-add',
    templateUrl: './trade-add.component.html',
    styleUrls: ['./trade-add.component.scss'],
})
export class TradeAddComponent implements OnInit {
    searchFormGroup: FormGroup = this.fb.group({ transactionDate: '', tradeType: '', value: '', volume: '', price: '', comments: '' });
    tradeRegistrations: Array<TradeOrganization>;
    pagination = { skip: 0, limit: 5, total: 100 };
    organizations: Array<{ organizationName: string; organizationType: string }> = [];
    today = new Date();
    columns: Array<any>;
    form: FormGroup = this.fb.group({
        organizationType: ['', Validators.required],
        ticker: ['', Validators.required],
        transactionDate: ['', Validators.required],
        tradeType: ['', Validators.required],
        value: ['', Validators.required],
        volume: ['', Validators.required],
        price: ['', Validators.required],
        comments: ['', Validators.required],
        pamCode: [''],
    });
    editTradeId: number | string;
    stateType: StateType = StateType.INIT;
    tickerFormControl: FormControl = this.fb.control('');
    tickers: Array<Ticker>;
    selectedTicker: Ticker;
    tradeTypes: Array<{ name: string; value: string }> = [
        { name: 'خرید', value: '1' },
        { name: 'فروش', value: '2' },
    ];

    constructor(private fb: FormBuilder, private alertService: AlertService, public tradeAddService: TradeAddService) {}

    ngOnInit(): void {
        this.initializeTableColumn();
        this.getTickers();
        this.getOrganisations();
        this.tickerFormControl.valueChanges.pipe(debounceTime(200)).subscribe((searchKey) => this.getTickers(searchKey));
        this.getTradeRegistration();
    }

    private initializeTableColumn(): void {
        this.columns = [
            { name: 'نماد', id: 'symbol', type: 'string' },
            {
                name: 'تاریخ معامله',
                id: 'transactionDate',
                type: 'string',
                search: { type: 'date', mode: TableSearchMode.SERVER },
                convert: (value: any) => new Date(value).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' }),
            },
            { name: 'محل معامله', id: 'organisationType', type: 'string', convert: () => 'تمدن' },
            {
                name: 'نوع معامله',
                id: 'tradeType',
                type: 'string',
                search: {
                    type: 'select',
                    options: [
                        { name: 'خرید', value: 1 },
                        { name: 'فروش', value: 2 },
                    ],
                    mode: TableSearchMode.SERVER,
                },
            },
            { name: 'ارزش معامله', id: 'value', type: 'price', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'حجم معامله', id: 'volume', type: 'number', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'قیمت معامله', id: 'price', type: 'price', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'توضیحات', id: 'comments', type: 'string', minWidth: '300px', search: { type: 'text', mode: TableSearchMode.SERVER } },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'edit', color: 'accent', operation: ({ row }: any) => this.editTradeRegistration(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.deleteTradeRegistration(row) },
                ],
            },
        ];
    }

    private getOrganisations(): void {
        this.tradeAddService.getOrganizations().subscribe((response) => (this.organizations = response));
    }

    private getTickers(searchKeyword: string = ''): void {
        this.tradeAddService.getTickersByKeyword(searchKeyword).subscribe((response) => {
            this.selectedTicker ? (this.tickers = [this.selectedTicker, ...response.items]) : (this.tickers = response.items);
        });
    }

    public getTradeRegistration(): void {
        this.tradeAddService.getTradeRegistration(this.pagination).subscribe(
            (response) => {
                this.pagination.total = response.total;
                this.tradeRegistrations = response.items;
                this.stateType = StateType.PRESENT;
            },
            () => {
                this.alertService.onError('در دریافت داده‌ها مشکلی رخ داده‌است');
                this.stateType = StateType.FAIL;
            }
        );
    }

    public deleteTradeRegistration(row: TradeOrganization): void {
        this.tradeAddService.deleteTradeRegistration(row.id).subscribe(
            () => {
                this.alertService.onSuccess('پاک شد');
                this.tradeRegistrations = this.tradeRegistrations.filter((el) => el.id !== row.id);
                if (this.editTradeId === row.id) {
                    this.editTradeId = null;
                    this.form.reset();
                }
            },
            () => this.alertService.onError('مشکلی پیش آمد')
        );
    }

    public addTradeRegistration(): void {
        this.form.get('transactionDate').setValue(UtilityFunctions.convertDateToPersianDateString(this.form.get('transactionDate').value));
        this.tradeAddService.createTradeRegistration(this.form.value).subscribe(
            () => {
                this.form.reset();
                this.alertService.onSuccess('معامله افزوده شد.');
                this.getTradeRegistration();
            },
            () => this.alertService.onError('مشکلی پیش آمد.')
        );
    }

    public editTradeRegistration(row: TradeOrganization): void {
        row.organizationType === 'تمدن' ? (row.organizationType = 'T') : (row.organizationType = 'M');
        row.tradeType === 'تمدن' ? (row.tradeType = '1') : (row.tradeType = '2');
        this.editTradeId = row.id;
        this.form.patchValue(row);
    }

    public updateTradeRegistration(): void {
        this.form.get('transactionDate').setValue(UtilityFunctions.convertDateToPersianDateString(this.form.get('transactionDate').value));
        this.form.value['id'] = this.editTradeId;

        this.tradeAddService.updateTradeRegistration(this.form.value).subscribe(
            () => {
                this.form.reset();
                this.editTradeId = null;
                this.getTradeRegistration();
                this.alertService.onSuccess('به‌روزرسانی شد');
            },
            () => this.alertService.onError('مشکلی پیش آمد')
        );
    }

    public cancelEdit(): void {
        this.editTradeId = null;
        this.form.reset();
    }

    public search(searchFilter: any): void {
        if (!searchFilter) return;
        if (searchFilter.transactionDate)
            searchFilter.transactionDate = UtilityFunctions.convertDateToPersianDateString(new Date(searchFilter.transactionDate));
        Object.keys(searchFilter).forEach((key) => this.searchFormGroup.controls[key].setValue(searchFilter[key]));
        this.getTradeRegistration();
    }

    public paginationControl(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getTradeRegistration();
    }
}
