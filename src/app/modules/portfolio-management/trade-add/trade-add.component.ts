import { TableSearchMode } from '#shared/components/table/table.model';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'app/services/alert.service';
import { BourseInstrumentDetailService, PortfolioManagementServiceService } from 'app/services/API/services';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { debounceTime } from 'rxjs/operators';
import { TradeAddService } from './trade-add.service';

export const tradeTypes = [
    { name: 'خرید', value: '1' },
    { name: 'فروش', value: '2' },
];

export let organizationTypes = [];

@Component({
    selector: 'app-trade-add',
    templateUrl: './trade-add.component.html',
    styleUrls: ['./trade-add.component.scss'],
})
export class TradeAddComponent implements OnInit {
    data: Array<any>;
    columns: Array<any>;
    searchFormGroup: FormGroup;

    addForm: FormGroup;

    isWorking: any = false;
    failed = false;

    organizationTypes: any;
    getOrganizationsFail = false;

    today = new Date();

    // Ticker Select Control
    tickersCtrl: FormControl;
    tickers: any;
    selectedTicker: any;

    editTradeId: any;

    tradeTypes = tradeTypes;

    constructor(
        private fb: FormBuilder,
        private pms: PortfolioManagementServiceService,
        private bids: BourseInstrumentDetailService,
        private snackBar: AlertService,
        public tas: TradeAddService
    ) {}

    ngOnInit(): void {
        // Search Group Init
        this.searchFormGroup = this.fb.group({
            transactionDate: '',
            tradeType: '',
            value: '',
            volume: '',
            price: '',
            comments: '',
        });

        this.addForm = this.fb.group({
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

        // ticker search
        this.tickersCtrl = this.fb.control('');
        this.getTickers('');
        this.tickersCtrl.valueChanges.pipe(debounceTime(200)).subscribe((searchKey) => this.getTickers(searchKey));

        //  Columns
        this.columns = [
            { name: 'نماد', id: 'symbol', type: 'string' },
            {
                name: 'تاریخ معامله',
                id: 'transactionDate',
                type: 'string',
                search: { type: 'date', mode: TableSearchMode.SERVER },
                convert: (value: any) => {
                    return new Date(value).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' });
                },
            },
            {
                name: 'محل معامله',
                id: 'organisationType',
                type: 'string',
                convert: () => {
                    return 'تمدن';
                },
            },
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
                    { name: 'ویرایش', icon: 'edit', color: 'accent', operation: ({ row }: any) => this.edit(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
                ],
            },
        ];

        this.getOrganisationTypes();
        this.get();
    }

    private getOrganisationTypes(): void {
        this.pms.portfolioManagementControllerGetOrganizations().subscribe(
            (ot) => {
                this.organizationTypes = ot;
                organizationTypes = ot;
            },
            () => (this.getOrganizationsFail = true)
        );
    }

    private getTickers(searchKeyword: string): void {
        this.bids.bourseInstrumentDetailControllerGetBondsList({ searchKeyword }).subscribe((list) => {
            if (this.selectedTicker) {
                this.tickers = [this.selectedTicker, ...list.items];
            } else {
                this.tickers = list.items;
            }
        });
    }

    // ------------------------------------- CRUD START

    add(): void {
        const addFormValue = this.addForm.value;
        addFormValue.transactionDate = formatDate(addFormValue.transactionDate, 'yyyy-MM-dd', 'en_US');
        this.tas.add(addFormValue).subscribe(
            (r) => {
                this.addForm.reset();
                this.snackBar.onSuccess('معامله با موفقیت اضافه شد.');
                this.get();
            },
            () => this.snackBar.onError('معامله اضافه نشد.')
        );
    }

    get(): void {
        this.tas.show(this).subscribe(
            (data) => {
                this.data = data.items;
                this.tas.setPageDetailData(data);
            },
            () => (this.failed = true)
        );
    }

    update(): void {
        const addFormValue = this.addForm.value;
        addFormValue.transactionDate = formatDate(addFormValue.transactionDate, 'yyyy-MM-dd', 'en_US');

        // Update Manually
        const foundedOrg = this.organizationTypes.find((el) => el.organizationName === addFormValue.organizationType);
        if (foundedOrg) {
            addFormValue.organizationType = foundedOrg.organizationType;
        }

        const foundedTradeType = this.tradeTypes.find((el) => el.name === addFormValue.tradeType);
        if (foundedTradeType) {
            addFormValue.tradeType = foundedTradeType.value;
        }

        addFormValue['id'] = this.editTradeId;
        this.tas.edit(addFormValue).subscribe(
            () => {
                this.addForm.reset();
                this.editTradeId = null;
                this.snackBar.onSuccess('معامله با موفقیت بروزرسانی شد.');
                this.get();
            },
            () => this.snackBar.onError('معامله بروزرسانی نشد.')
        );
    }

    edit(row: any): void {
        this.editTradeId = row.id;
        this.addForm.patchValue(row);
    }

    cancelEdit(): void {
        this.editTradeId = null;
        this.addForm.reset();
    }

    delete(row: any): void {
        this.tas.delete(row.id).subscribe(
            () => {
                this.data = this.data.filter((el) => el.id !== row.id);

                if (this.editTradeId === row.id) {
                    this.editTradeId = null;
                    this.addForm.reset();
                }

                this.snackBar.onSuccess('معامله با موفقیت حذف شد.');
            },
            () => this.snackBar.onError('خطا در هنگام حذف معامله.')
        );
    }

    // ------------------------------------- CRUD END

    organizationTypeCompareFn(org1: any, org2: any): boolean {
        org2 = organizationTypes.find((el) => el.organizationName === org2);
        return org1 && org2 && org1 === org2.organizationType;
    }

    tradeTypeCompareFn(type1: any, type2: any): boolean {
        type2 = tradeTypes.find((el) => el.name === type2);
        return type1 && type2 && type1 === type2.value;
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }

        if (searchFilter.transactionDate) {
            searchFilter.transactionDate = formatDate(new Date(searchFilter.transactionDate), 'yyyy-MM-dd', 'en_US');
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });

        this.tas.specificationModel.searchKeyword = searchFilter;
        this.tas.specificationModel.skip = 0;
        this.get();
    }

    pageHandler(e: PagingEvent): void {
        this.tas.specificationModel.limit = e.pageSize;
        this.tas.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    handleError(): boolean {
        this.failed = true;
        return false;
    }
}
