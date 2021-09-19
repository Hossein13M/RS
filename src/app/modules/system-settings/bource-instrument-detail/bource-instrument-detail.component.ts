import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '#shared/services/alert.service';
import { BondsListDto, BourseInstrumentDetailsDto } from 'app/services/API/models';
import { BanksService } from 'app/services/App/bank/bank.service';
import { BoursesInstrumentDetailService } from 'app/services/App/BourseInstrumentDetail/bourse-instrument-detail.service';
import { FundTypesService } from 'app/services/App/FundType/fund-type.service';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { IssuerGoalsService } from 'app/services/App/IssuerGoal/issuer-goal.service';
import { IssuerLicenceService } from 'app/services/App/IssuerLicence/issuer-licence.service';
import { SearchSelectDataType, searchSelectStateType } from '#shared/components/search-select/search-select.component';
import * as moment from 'jalali-moment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fuseAnimations } from '../../../../@fuse/animations';
import { CollaterallsComponent } from './collateralls/collateralls.component';
import { DateComponent } from './date/date.component';
import { GuarantorsComponent } from './guarantors/guarantors.component';
import { MarketMakerComponent } from './market-maker/market-maker.component';
import { UnderWriterComponent } from './under-writer/under-writer.component';

export enum stateType {
    'LOADING',
    'PRESENT',
    'FAILED',
    'UPLOAD_WAIT',
    'UPDATING',
    'UPDATE_FAIL',
}

@Component({
    selector: 'bource-instrument-detail',
    templateUrl: './bource-instrument-detail.component.html',
    styleUrls: ['./bource-instrument-detail.component.scss'],
    providers: [IssuersService],
    animations: [fuseAnimations],
})
export class BourceInstrumentDetailComponent implements OnInit {
    public bondSearchkeyword: FormControl = new FormControl('');
    public bonds: Array<BondsListDto> = [];
    public selectedBond: FormControl = new FormControl();
    public bigForm: FormGroup;
    public bondDetail: BourseInstrumentDetailsDto;

    public startDate: any;
    public endDate: any;

    public bankSearchkeyword: FormControl = new FormControl('');
    public ETFTypeSearchKeyword: FormControl = new FormControl('');
    public issueLicenseSearchkeyword: FormControl = new FormControl('');
    public issueGoalSearchKeyword: FormControl = new FormControl('');
    public issuerSearchkeyword: FormControl = new FormControl('');

    public banks = [];
    public etfTypes = [];
    public issueLicenses = [];
    public issueGoals = [];
    public issuers = [];

    formLoaded = false;

    state = stateType.LOADING;
    stateType = stateType;

    constructor(
        private BID: BoursesInstrumentDetailService,
        private bankService: BanksService,
        private fundTypeService: FundTypesService,
        private issueLicenseService: IssuerLicenceService,
        private issuerGoalServise: IssuerGoalsService,
        private issuerService: IssuersService,
        public dialog: MatDialog,
        private alertService: AlertService
    ) {
        this.BID.getBonds('').subscribe(() => {});
        this.BID.bonds.subscribe((res) => (this.bonds = res));
    }

    ngOnInit(): void {
        this.issuerService.getIssuersList(this.issuerSearchkeyword.value).subscribe((res) => (this.issuers = res));
        this.bankSearchkeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.bankService.getBank(searchText).subscribe((res) => {
                if (res.length < 1) this.bankSearchkeyword.setValue('');
                this.banks = res;
            });
        });
        this.ETFTypeSearchKeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.fundTypeService.getFundTypes(searchText).subscribe((res) => {
                if (res.length < 1) this.ETFTypeSearchKeyword.setValue('');
                this.etfTypes = res;
            });
        });
        this.issueLicenseSearchkeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.issueLicenseService.getIssuerLicenses(searchText).subscribe((res) => {
                if (res.length < 1) this.issueLicenseSearchkeyword.setValue('');
                this.issueLicenses = res;
            });
        });
        this.issueGoalSearchKeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.issuerGoalServise.getIssuerGoal(searchText).subscribe((res) => {
                if (res.length < 1) this.issueGoalSearchKeyword.setValue('');
                this.issueGoals = res;
            });
        });
        this.issuerSearchkeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.issuerService.getIssuersList(searchText).subscribe((res) => {
                if (res.length < 1) this.issuerSearchkeyword.setValue('');
                this.issuers = res;
            });
        });

        this.bondSearchkeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((res) => {
            this.BID.getBonds(res).subscribe(() => {});
        });

        this.selectedBond.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((bond) => {
            if (bond.id) {
                this.bondDetail = {} as BourseInstrumentDetailsDto;
                this.bigForm = new FormGroup({});
                this.BID.getBond(bond.id, bond.ticker).subscribe((res) => {
                    if (!res.type) {
                        this.alertService.onError('ورقه تایپ ندارد با پشتیبانی هماهنگ کنید');
                        this.clear();
                        return;
                    }
                    this.formLoaded = false;
                    this.bondDetail = res;
                    this.createForm(res);
                    this.startDate = res.issueStartDate;
                    this.endDate = res.issueEndDate;
                });
            }
        });
    }

    searchIssueGoal = (searchText: string, data: SearchSelectDataType): void => {
        data.state = searchSelectStateType.LOADING;
        this.issuerGoalServise.getIssuerGoal(searchText).subscribe((res) => {
            data.list = res;
            data.state = searchSelectStateType.PRESENT;
        });
    };

    public createForm(b): void {
        this.formLoaded = false;

        this.bigForm = new FormGroup({
            ...(this.hasAccess('account', b.type) && { account: new FormControl(b.account) }),
            ...(this.hasAccess('bankId', b.type) && { bankId: new FormControl(b.bankId) }),
            ...(this.hasAccess('basePrice', b.type) && { basePrice: new FormControl(b.basePrice) }),
            ...(this.hasAccess('callRate', b.type) && { callRate: new FormControl(b.callRate) }),
            ...(this.hasAccess('callable', b.type) && { callable: new FormControl(b.callable) }),
            ...(this.hasAccess('contractSize', b.type) && { contractSize: new FormControl(b.contractSize) }),
            ...(this.hasAccess('convertible', b.type) && { convertible: new FormControl(b.convertible) }),
            ...(this.hasAccess('currency', b.type) && { currency: new FormControl(b.currency) }),
            ...(this.hasAccess('embeded', b.type) && { embeded: new FormControl(b.embeded) }),
            ...(this.hasAccess('etfTypeId', b.type) && { etfTypeId: new FormControl(b.etfTypeId) }),
            ...(this.hasAccess('exerciseRate', b.type) && { exerciseRate: new FormControl(b.exerciseRate) }),
            ...(this.hasAccess('issueDate', b.type) && { issueDate: new FormControl(new Date(b.issueDate)) }),
            ...(this.hasAccess('issuelicenseId', b.type) && { issuelicenseId: new FormControl(b.issuelicenseId) }),
            ...(this.hasAccess('issuerGoalId', b.type) && { issuerGoalId: new FormControl(b.issuerGoalId) }),
            ...(this.hasAccess('margin', b.type) && { margin: new FormControl(b.margin) }),
            ...(this.hasAccess('marketMakers', b.type) && { marketMakers: new FormControl(b.marketMakers) }),
            ...(this.hasAccess('marketMakingRate', b.type) && {
                marketMakingRate: new FormControl(b.marketMakingRate),
            }),
            ...(this.hasAccess('maturityDate', b.type) && { maturityDate: new FormControl(new Date(b.maturityDate)) }),
            ...(this.hasAccess('nationalId', b.type) && { nationalId: new FormControl(b.nationalId) }),
            ...(this.hasAccess('par', b.type) && { par: new FormControl(b.par) }),
            ...(this.hasAccess('paymentDay', b.type) && { paymentDay: new FormControl(b.paymentDay) }),
            ...(this.hasAccess('paymentPeriod', b.type) && { paymentPeriod: new FormControl(b.paymentPeriod) }),
            ...(this.hasAccess('putRate', b.type) && { putRate: new FormControl(b.putRate) }),
            ...(this.hasAccess('rate', b.type) && { rate: new FormControl(b.rate) }),
            ...(this.hasAccess('registerNumber', b.type) && { registerNumber: new FormControl(b.registerNumber) }),
            ...(this.hasAccess('sponsor', b.type) && { sponsor: new FormControl(b.sponsor) }),
            ...(this.hasAccess('underlyingAsset', b.type) && { underlyingAsset: new FormControl(b.underlyingAsset) }),
            ...(this.hasAccess('underwriters', b.type) && { underwriters: new FormControl(b.underwriters) }),
            ...(this.hasAccess('value', b.type) && { value: new FormControl(b.value) }),
            ...(this.hasAccess('volume', b.type) && { volume: new FormControl(b.volume) }),
            ...(this.hasAccess('guarantors', b.type) && { guarantors: new FormControl(b.guarantors) }),
            ...(this.hasAccess('collaterals', b.type) && { collaterals: new FormControl(b.collaterals) }),
            id: new FormControl(b.id),
            ticker: new FormControl(b.ticker),
            status: new FormControl(b.status),
            name: new FormControl(b.name),
            issuerId: new FormControl(b.issuerId),
        });
        this.issuerSearchkeyword.setValue(this.bondDetail.issuerName);
        this.bankSearchkeyword.setValue(this.bondDetail.bankName);
        this.ETFTypeSearchKeyword.setValue(this.bondDetail.etfTypeName);
        this.issueLicenseSearchkeyword.setValue(this.bondDetail.issuelicenseName);
        if (this.bondDetail.issuerGoalId) {
            this.bigForm.get('issuerGoalId').setValue({ id: this.bondDetail.issuerGoalId, name: this.bondDetail.issuerGoalName });
        }
        // this.underWriterSearchkeyword.setValue(this.bondDetail.underwriterName)
        // this.marketMakerSearchkeyword.setValue(this.bondDetail.markerMakerName)
        this.formLoaded = true;
        if (this.hasAccess('issueStartDate', b.type)) {
            if (this.bondDetail.issueStartDate) {
                this.startDate = this.bondDetail.issueStartDate;
                this.endDate = this.bondDetail.issueEndDate;
            }
        }
    }

    // todo hasAccess method should have api get initial for search switches

    public hasAccess(property: string, code: number): boolean {
        switch (property) {
            case 'account':
                return [2200, 111000, 120000].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'bankId':
                return [2200, 111000, 120000].reduce((r, i) => {
                    if (code === i) {
                        this.bankService.getBank(this.bankSearchkeyword.value).subscribe((res) => (this.banks = res));
                        return true;
                    }
                    return r;
                }, false);

            case 'basePrice':
                return [2310, 2311, 2312].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'callRate':
                return [1400, 2310, 2311, 2312].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'callable':
                return [2100, 2110, 2130, 2150, 2160, 2320, 2330, 2340, 2350, 2600, 112000, 112100, 112200, 112300, 112400].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'contractSize':
                return [2310, 2311, 2312, 5100, 5110, 5120, 5130, 5140, 5150, 1300, 1400, 1500, 1600, 5200, 5210, 3140].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'convertible':
                return [2100, 2110, 2130, 2150, 2160, 2320, 2330, 2340, 2350, 2600, 112000, 112100, 112200, 112300, 112400].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'currency':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2310,
                    2311,
                    2312,
                    2600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'embeded':
                return [2310, 2311, 2312].reduce((r, i) => {
                    if (code === i) return true;

                    return r;
                }, false);

            case 'etfTypeId':
                return [4100, 4110, 4120, 4130, 4140, 4150, 4160, 4170, 131000, 132000, 133000, 134000, 135000, 136000, 137000].reduce((r, i) => {
                    if (code === i) {
                        this.fundTypeService.getFundTypes(this.ETFTypeSearchKeyword.value).subscribe((res) => (this.etfTypes = res));
                        return true;
                    }
                    return r;
                }, false);

            case 'exerciseRate':
                return [5100, 5110, 5120, 5130, 5140, 5150, 1300, 1600, 3140].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);
                break;

            case 'issueDate':
                return [1200, 1100].reduce((r, i) => {
                    if (code !== i) return true;
                    return r;
                }, false);

            case 'issueStartDate':
                return [1200, 2100, 2320, 2330, 2340, 2350, 2200, 2310, 2400, 2600, 2500].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'issuelicenseId':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) {
                        this.issueLicenseService
                            .getIssuerLicenses(this.issueLicenseSearchkeyword.value)
                            .subscribe((res) => (this.issueLicenses = res));
                        return true;
                    }
                    return r;
                }, false);

            case 'issuerGoalId':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    1300,
                    1400,
                    1500,
                    1600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                    3140,
                ].reduce((r, i) => {
                    if (code === i) {
                        this.issuerGoalServise.getIssuerGoal(this.issueLicenseSearchkeyword.value).subscribe((res) => (this.issueGoals = res));
                        return true;
                    }
                    return r;
                }, false);

            case 'margin':
                return [5100, 5110, 5120, 5130, 5140, 5150, 1300, 1400, 1500, 1600, 3140].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'marketMakers':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2310,
                    2311,
                    2312,
                    2600,
                    4100,
                    4110,
                    4120,
                    4130,
                    4140,
                    4150,
                    4160,
                    4170,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    131000,
                    132000,
                    133000,
                    134000,
                    135000,
                    136000,
                    137000,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'cancellationDate':
                return [111000, 112000, 112100, 112200, 112300, 112400, 131000, 132000, 133000, 134000, 135000, 136000, 137000, 120000].reduce(
                    (r, i) => {
                        if (code !== i) return true;
                        return r;
                    },
                    false
                );

            case 'marketMakingRate':
                return [2310, 2311, 2312].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'maturityDate':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2310,
                    2311,
                    2312,
                    2400,
                    2600,
                    2500,
                    5100,
                    5110,
                    5120,
                    5130,
                    5140,
                    5150,
                    1300,
                    1400,
                    1500,
                    1600,
                    5200,
                    5210,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                    3140,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'nationalId':
                return [4100, 4110, 4120, 4130, 4140, 4150, 4160, 4170, 131000, 132000, 133000, 134000, 135000, 136000, 137000].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'par':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    2500,
                    4100,
                    4110,
                    4120,
                    4130,
                    4140,
                    4150,
                    4160,
                    4170,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    131000,
                    132000,
                    133000,
                    134000,
                    135000,
                    136000,
                    137000,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'paymentDay':
                return [
                    4100,
                    4110,
                    4120,
                    4130,
                    4140,
                    4150,
                    4160,
                    4170,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    131000,
                    132000,
                    133000,
                    134000,
                    135000,
                    136000,
                    137000,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'paymentPeriod':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    4100,
                    4110,
                    4120,
                    4130,
                    4140,
                    4150,
                    4160,
                    4170,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'putRate':
                return [2310, 2311, 2312, 1500].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'rate':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'registerNumber':
                return [4100, 4110, 4120, 4130, 4140, 4150, 4160, 4170, 131000, 132000, 133000, 134000, 135000, 136000, 137000].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'sponsor':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'underlyingAsset':
                return [5100, 5110, 5120, 5130, 5140, 5150, 1300, 1400, 1500, 1600, 5200, 5210, 3140].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'underwriters':
                return [2100, 2110, 2130, 2150, 2160, 2320, 2330, 2340, 2350, 2200, 2310, 2311, 2312, 112000, 112100, 112200, 112300, 112400].reduce(
                    (r, i) => {
                        if (code === i) return true;
                        return r;
                    },
                    false
                );

            case 'value':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2310,
                    2311,
                    2312,
                    2600,
                    2500,
                    1300,
                    1400,
                    1500,
                    1600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                    3140,
                ].reduce((r, i) => {
                    if (code !== i) return true;
                    return r;
                }, false);

            case 'guarantors':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    4100,
                    4110,
                    4120,
                    4130,
                    4140,
                    4150,
                    4160,
                    4170,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    131000,
                    132000,
                    133000,
                    134000,
                    135000,
                    136000,
                    137000,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'collaterals':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                ].reduce((r, i) => {
                    if (code === i) return true;
                    return r;
                }, false);

            case 'volume':
                return [
                    2100,
                    2110,
                    2130,
                    2150,
                    2160,
                    2320,
                    2330,
                    2340,
                    2350,
                    2200,
                    2310,
                    2311,
                    2312,
                    2600,
                    2500,
                    1300,
                    1400,
                    1500,
                    1600,
                    111000,
                    112000,
                    112100,
                    112200,
                    112300,
                    112400,
                    120000,
                    3140,
                ].reduce((r, i) => {
                    if (code !== i) return true;
                    return r;
                }, false);
            default:
                return true;
        }
    }

    openCollaterals(): void {
        const dialogRef = this.dialog.open(CollaterallsComponent, {
            panelClass: 'dialog-w40',
            data: { Collateralls: this.bondDetail.collaterals },
        });
        dialogRef.afterClosed().subscribe((r) => {
            this.bigForm.controls['collaterals'].setValue(r);
            this.state = stateType.UPLOAD_WAIT;
        });
    }

    openGuarantors(): void {
        const dialogRef = this.dialog.open(GuarantorsComponent, {
            panelClass: 'dialog-w40',
            data: { Guarantors: this.bondDetail.guarantors },
        });
        dialogRef.afterClosed().subscribe((r) => {
            this.bigForm.controls['guarantors'].setValue(r);
            this.state = stateType.UPLOAD_WAIT;
        });
    }

    openDates(): void {
        const dialogRef = this.dialog.open(DateComponent, { panelClass: 'dialog-w40', data: { id: this.bondDetail.id } });
        dialogRef.afterClosed().subscribe((r) => {
            if (r) {
                this.startDate = r.startDate;
                this.endDate = r.endDate;
                this.state = stateType.UPLOAD_WAIT;
            }
        });
    }

    openUnderWriter(): void {
        const dialogRef = this.dialog.open(UnderWriterComponent, { panelClass: 'dialog-w40', data: { underwriters: this.bondDetail.underwriters } });
        dialogRef.afterClosed().subscribe((r) => {
            this.bigForm.controls['underwriters'].setValue(r);
            this.state = stateType.UPLOAD_WAIT;
        });
    }

    openMarketMaker(): void {
        const dialogRef = this.dialog.open(MarketMakerComponent, { panelClass: 'dialog-w40', data: { marketMakers: this.bondDetail.marketMakers } });
        dialogRef.afterClosed().subscribe((r) => {
            this.bigForm.controls['marketMakers'].setValue(r);
            this.state = stateType.UPLOAD_WAIT;
        });
    }

    save(): void {
        const result = this.bigForm.value;
        if (result.hasOwnProperty('embeded')) {
            result.embeded ? (result.embeded = 1) : (result.embeded = 0);
        }
        if (result.hasOwnProperty('callable')) {
            result.callable ? (result.callable = 1) : (result.callable = 0);
        }
        if (result.hasOwnProperty('convertible')) {
            result.convertible ? (result.convertible = 1) : (result.convertible = 0);
        }

        if (result.hasOwnProperty('issueDate')) {
            result.issueDate = moment(result.issueDate).locale('en').format('YYYY-MM-DD');
        }
        if (result.hasOwnProperty('maturityDate')) {
            result.maturityDate = moment(result.maturityDate).locale('en').format('YYYY-MM-DD');
        }
        if (result.hasOwnProperty('cancellationDate')) {
            result.maturityDate = moment(result.cancellationDate).locale('en').format('YYYY-MM-DD');
        }

        this.state = stateType.UPDATING;
        this.BID.editBond(result).subscribe(
            () => (this.state = stateType.PRESENT),
            () => (this.state = stateType.UPDATE_FAIL)
        );
    }

    clear(): void {
        this.formLoaded = false;
        this.bigForm = new FormGroup({});
        this.startDate = 'تاریخ شروع پذیره نویسی';
        this.endDate = 'تاریخ پایان پذیره نویسی';
        this.bondDetail = {} as BourseInstrumentDetailsDto;
        this.selectedBond.setValue({});
        this.bondSearchkeyword.setValue('');
    }
}
