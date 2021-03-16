import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { NavService } from 'app/modules/nav/nav.service';
import { AlertService } from 'app/services/alert.service';
import { LocalStorageService } from 'app/services/Base/local-storage.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssetDebitDetailDialogComponent } from '../asset-debit-detail-dialog/asset-debit-detail-dialog.component';

@Component({
    selector: 'app-nav-main',
    templateUrl: './nav-main.component.html',
    styleUrls: ['./nav-main.component.scss'],
    animations: [fuseAnimations],
})
export class NavMainComponent implements OnInit, OnDestroy {
    today = new Date();

    tickersForm: FormGroup;
    nonBourseInstrumentsForm: FormGroup;
    bankAccountsForm: FormGroup;
    sellAndBuyBankOuraghForm: FormGroup;
    soudTaghsimiForm: FormGroup;
    karshenasiPriceForm: FormGroup;
    navDate = new FormControl(new Date());
    navFundType = new FormControl();
    codeSarfaslType = new FormControl();
    codeSarfaslValue = new FormControl();
    fundList = [];
    codeSarfaslList = [];
    tickerList = [];
    bankAccountList = [];
    tickerSearchResponse;
    noneBouseSearchResponse;
    uraghSearchResponse;
    karshenasiSearchResponse;
    soudTaghsimiSearchResponse;
    bankAccountSearchResponse;
    navTransactionalMainObject: NavTransactionModel[] = [];
    public filteredBankAccount: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    public bankAccountFilter: FormControl = new FormControl();
    private _onDestroy = new Subject<void>();

    isWorking: any;

    constructor(public navService: NavService, private AlertService: AlertService, private dialog: MatDialog, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getAllFunds();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    listenForSearchForm(): void {
        this.bankAccountFilter.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => this.filterBankAccount());
        this.navFundType.valueChanges.subscribe();
    }

    onSearchResult(selected, type): void {
        switch (type) {
            case 'ticker':
                this.tickersForm.get('ticker').setValue(selected.ticker, { emitEvent: false });
                this.tickerSearchResponse = null;
                break;
            case 'nonBourse':
                this.nonBourseInstrumentsForm.get('ticker').setValue(selected.name, { emitEvent: false });
                this.noneBouseSearchResponse = null;
                break;
            case 'soud':
                this.soudTaghsimiForm.get('ticker').setValue(selected.ISIN, { emitEvent: false });
                this.soudTaghsimiSearchResponse = null;
                break;
            case 'kershenasi':
                this.karshenasiPriceForm.get('ticker').setValue(selected.ISIN, { emitEvent: false });
                this.karshenasiSearchResponse = null;
                break;
            case 'bank-account':
                this.bankAccountsForm.get('accountNumber').setValue(selected.accountNumber, { emitEvent: false });
                this.bankAccountSearchResponse = null;
                break;
            case 'ouragh':
                this.sellAndBuyBankOuraghForm.get('ticker').setValue(selected.code, { emitEvent: false });
                this.uraghSearchResponse = null;
                break;
        }
    }

    createSoudTaghsimi(): void {
        this.soudTaghsimiForm = this.fb.group({
            ticker: ['', Validators.required],
            discountRate: ['', Validators.required],
            DPSDate: ['', Validators.required],
            DPS: ['', Validators.required],
            transactionType: [10],
        });
    }

    createBankAccountsForm(): void {
        this.bankAccountsForm = this.fb.group({
            accountNumber: [],
            amount: ['', Validators.required],
            rate: [],
            paymentDay: [],
            description: [],
            transactionType: [5],
        });
    }

    createSellAndBueBankOuragh(): void {
        this.sellAndBuyBankOuraghForm = this.fb.group({
            transactionType: ['', Validators.required],
            ticker: ['', Validators.required],
            volume: ['', Validators.required],
            price: ['', Validators.required],
        });
    }

    createTickersForm(): void {
        this.tickersForm = this.fb.group({
            transactionType: ['', Validators.required],
            ticker: ['', Validators.required],
            volume: ['', Validators.required],
        });
    }

    openAssetAndDebitPopUp(): void {
        this.dialog
            .open(AssetDebitDetailDialogComponent, { panelClass: 'dialog-w60', data: this.navFundType.value })
            .afterClosed()
            .subscribe(() => {});
    }

    getAllFunds(): void {
        this.navService.getAllFunds(this).subscribe((res: any) => (this.fundList = res.items.filter((el) => !!el.maxUnitNum)));
    }

    handleError(err: HttpErrorResponse): boolean {
        if (err.status === 500) {
            this.AlertService.onError('خطا در سرور');
        }
        return true;
    }

    private filterBankAccount(): void {
        if (!this.bankAccountList) {
            return;
        }
        // get the search keyword
        let search = this.bankAccountFilter.value;
        if (!search) {
            this.filteredBankAccount.next(this.bankAccountList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredBankAccount.next(this.bankAccountList.filter((code) => code.bankName.toLowerCase().indexOf(search) > -1));
    }

    createCodeSarfaslObj(): void {
        let obj;
        if (this.codeSarfaslType.value === 1) {
            obj = {
                fundNationalId: this.navFundType.value,
                assets: [this.codeSarfaslValue.value],
                debits: [],
            };
        } else if (this.codeSarfaslType.value === 0) {
            obj = {
                fundNationalId: this.navFundType.value,
                assets: [],
                debits: [this.codeSarfaslValue.value],
            };
        }
        this.navService.createCodeSarfasl(obj, this).subscribe(() => {});
    }

    addUraghSellAndBuy(): void {
        const obj: NavTransactionModel = {};
        obj.transactionType = this.sellAndBuyBankOuraghForm.get('transactionType').value;
        obj.ticker = this.sellAndBuyBankOuraghForm.get('ticker').value;
        obj.volume = this.sellAndBuyBankOuraghForm.get('volume').value;
        obj.price = this.sellAndBuyBankOuraghForm.get('price').value;
        this.AlertService.onSuccess('اطلاعات با موفقیت افزوده شدند.');
        this.pushToMainObj(obj);
        this.sellAndBuyBankOuraghForm.reset();
    }

    createNonBourseObj(): void {
        const obj: NavTransactionModel = {};
        obj.transactionType = this.nonBourseInstrumentsForm.get('transactionType').value;
        obj.rate = this.nonBourseInstrumentsForm.get('rate').value;
        obj.volume = this.nonBourseInstrumentsForm.get('volume').value;
        this.AlertService.onSuccess('اطلاعات با موفقیت افزوده شدند.');
        this.pushToMainObj(obj);
        this.nonBourseInstrumentsForm.reset();
    }

    pushToMainObj(navTransactionModel): void {
        let mainObj: NavTransactionModel[] = LocalStorageService.getNav();
        if (mainObj && mainObj.length > 0) {
            mainObj.push(navTransactionModel);
        } else {
            mainObj = [];
            mainObj.push(navTransactionModel);
        }
        LocalStorageService.setNav(mainObj);
    }
}

export class NavTransactionModel {
    transactionType?: any;
    ticker?: any;
    volume?: any;
    rate?: any;
    accountNumber?: any;
    amount?: any;
    description?: any;
    paymentDay?: any;
    estimatedPrice?: any;
    price?: any;
    DPS?: any;
    DPSDate?: any;
    discountRate?: any;
}
