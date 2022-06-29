import { searchSelectStateType } from '#shared/components/search-select/search-select.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IpsDialogComponent } from '#shared/components/ips-dialog/ips-dialog.component';
import { AssetMonitoring, Instrument, InstrumentSearchParams } from './assets-monitoring.model';
import { AssetsMonitoringService } from './assets-monitoring.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-assets-monitoring',
    templateUrl: './assets-monitoring.component.html',
    styleUrls: ['./assets-monitoring.component.scss'],
})
export class AssetsMonitoringComponent implements OnInit {
    form: FormGroup = this.fb.group({ basket: [[], [Validators.required]], date: [] });
    instrumentFormControl: FormControl = new FormControl([], Validators.required);
    haveInstrumentsAchieved: boolean = false;
    instruments: Array<Instrument> = [];
    assetsMonitoringData: AssetMonitoring = {
        tableOfAssets: [],
        totalVolume: 0,
        totalValue: 0,
        trendChart: [],
        pieChart: [],
    };
    loading: boolean = false;
    isSectionShowing: boolean = false;
    dataLoading: boolean = false;
    tableColumn: Array<any> = [
        { id: 'type', name: '', type: 'string' },
        { id: 'symbol', name: 'نماد', type: 'string' },
        { id: 'price', name: 'قیمت پایانی', type: 'price' },
        { id: 'value', name: 'ارزش کل', type: 'price' },
        { id: 'volume', name: 'حجم کل', type: 'number' },
        { id: 'percentOfTotalAssets', name: 'درصد از کل دارایی', type: 'number' },
        { id: 'tradeLocation', name: 'محل معامله', type: 'string' },
        {
            id: 'maturityDate',
            name: 'تاریخ سررسید',
            type: 'date',
            convert: (value: any) =>
                new Date(value).toLocaleDateString('fa-Ir', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
        },
        // {
        //     id: 'lastUpdateDate',
        //     name: 'آخرین تاریخ به‌روز‌رسانی',
        //     type: 'date',
        //     convert: (value: any) => new Date(value).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' }),
        // },
    ];

    constructor(private fb: FormBuilder, private assetsMonitoringService: AssetsMonitoringService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.form.valueChanges.subscribe(() => {
            if (this.checkForValidationButton()) this.prepareDataForAPI();
        });
    }

    public submitForm(): void {
        this.getAssetsMonitoringDate();
    }

    public getAssetsMonitoringDate(): void {
        this.dataLoading = false;
        this.loading = true;
        this.assetsMonitoringData.trendChart = [];
        const searchParams = {
            date: UtilityFunctions.convertDateToGregorianFormatForServer(this.form.get('date').value),
            basket: this.form.value.basket,
            ticker: this.instrumentFormControl.value,
        };
        const fixedSearchParams = this.checkDateForToday(searchParams);

        this.assetsMonitoringService.getAssetMonitoringData(fixedSearchParams).subscribe((response) => {
            this.isSectionShowing = true;
            this.dataLoading = true;
            this.loading = false;
            this.assetsMonitoringData = response;
        });
    }

    public checkForValidationButton(): boolean {
        return this.form.valid && !this.form.get('date').hasError('required');
    }

    public searchInstrument = (searchKey, data): void => {
        data.state = searchSelectStateType.PRESENT;
        if (!searchKey) {
            data.list = this.instruments;
            return;
        }
        data.list = this.instruments?.filter((el) => el.symbol?.includes(searchKey));
    };

    public openIpsHistoryDialog(): void {
        this.dialog.open(IpsDialogComponent, {
            width: '1000px',
            data: { basket: ['T', 'F', 'M'], withDetails: false },
        });
    }

    private prepareDataForAPI(): void {
        const searchParams: InstrumentSearchParams = {
            basket: this.form.value.basket,
            date: UtilityFunctions.convertDateToGregorianFormatForServer(this.form.get('date').value),
        };
        const fixedSearchParams = this.checkDateForToday(searchParams);
        this.getInstruments(fixedSearchParams);
    }

    private checkDateForToday(searchParams: InstrumentSearchParams): InstrumentSearchParams {
        //    for some reason (Danial asked) if the user chooses today, we need to return yesterday's date to Backend
        if (this.isToday(this.form.value.date._d)) {
            const yesterday = new Date(this.form.get('date').value._d.getTime());
            yesterday.setDate(this.form.get('date').value._d.getDate() - 1);
            searchParams.date = UtilityFunctions.convertDateToGregorianFormatForServer(yesterday);
        }
        return searchParams;
    }

    private isToday(date): boolean {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }

    private getInstruments(searchParams: InstrumentSearchParams): void {
        this.loading = true;
        this.haveInstrumentsAchieved = true;
        this.assetsMonitoringService.getAssetInstruments(searchParams).subscribe((response) => {
            this.loading = false;
            this.instruments = response;
        });
    }
}
