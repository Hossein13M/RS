import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankBranchService } from 'app/services/feature-services/bank-branch.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { BrokerService } from 'app/services/feature-services/broker.service';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';

@Component({
    selector: 'app-under-writing',
    templateUrl: './under-writing.component.html',
    styleUrls: ['./under-writing.component.scss'],
})
export class UnderWritingComponent extends BaseFormModel implements OnInit {
    form: FormGroup;
    brokers = [];
    bankBranches = [];
    banks = [];
    isWorking: any;

    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(
        private fb: FormBuilder,
        private brokerService: BrokerService,
        private bankBranchService: BankBranchService,
        private bankService: BankService,
        public formWrapperService: FormsWrapperService,
        public formsModelService: FormsModelService
    ) {
        super(formWrapperService);

        this.form = this.fb.group({
            securityType: '',
            securityName: '',
            symbol: '',
            issuePermission: '',
            tradingMarket: '',
            executiveBank: '',
            brockerDealer: '',
            securityVolume: '',
            securityCounts: '',
            securityParValue: '',
            ipoDateStart: '',
            ipoDateEnd: '',
            maturityDate: '',
            securityLifecycleFreq: '',
            nominalRate: '',
            profitPaymentFreq: '',
            dailyMinimumCommittedPercent: '',
            dailyMinimumCommittedCount: '',
            dailyExchangeMinimumCommittedPercent: '',
            dailyExchangeMinimumCommittedCount: '',
            syndicateMembersCount: '',
            dailySyndicateCommittedSumAmount: '',
            firstDateMarketMakingFees: '',
            marketMakingFeesFreq: '',
            percentageSalesDeductions: '',
            defaultsPossibleDamagesPercent: '',
            defaultsPossibleDamagesAmount: '',

            tamadonSyndicateCommittedPercent: '',

            salafPutOptionRate: '',
            salafCallOptionRate: '',
            salafMarketMakingRate: '',

            unpurchasedSecuritiesInIpoPercent: '',
            percentagePurchasedUnpurchasedBondsIpo: '',
            NumberPurchasedUnpurchasedBondsIpo: '',
            unitPricePurchasedUnpurchasedBondsIpo: '',
            underWritingConsiderationFreq: '',
            underWritingConsiderationRate: '',
            underWritingFee: '',
            marketMakingFeesReceivingInfo: '',
            maximumPurchasedBondsIssuedDuringIpo: '',
            minimumPurchasePrice: '',
            maximumPurchasePrice: '',
            pettyCashDelinquencyConsiderationFreq: '',
            pettyCashDelinquencyConsiderationRate: '',
            contractBaseInfo: '', //form
            syndicateMembersNames: '', //form
            collateralInfo: '', //form
            invoiceInfo: '', //form
            guarantorInfo: '', // form
        });
    }

    ngOnInit() {
        this.getAllBroker();
        this.getAllBankBranch();
        this.getAllBanks();

        this.formsWrapperService.formId = this.formId;
        this.formsWrapperService.flowId = this.flowId;
        this.formsWrapperService.flowInstanceId = this.flowInstanceId;

        this.getFormDocument(this.api).subscribe(
            (res) => {
                if (res && res.submittedData) {
                    this.form.patchValue(res.submittedData);
                    this.baseObj = res.submittedData;
                    this.formsWrapperService.firstTime = false;
                } else {
                    this.formsWrapperService.firstTime = true;
                }
            },
            () => (this.formsWrapperService.firstTime = true)
        );
    }

    onSubFormSubmit(obj): void {
        if (obj) {
            this.form.get(obj.property).setValue(obj.data);
        }
    }

    createFormApi(): void {
        this.createFormDocument(this.api, this.form.value).subscribe(() => {});
    }

    getAllBroker() {
        this.brokerService.getAllBrokers(this).subscribe((res: any[]) => (this.brokers = res));
    }

    getAllBankBranch() {
        this.bankBranchService.getBankBranch(this).subscribe((res: any) => (this.bankBranches = res.items));
    }

    getAllBanks() {
        this.bankService.get(this).subscribe((res: any) => (this.banks = res.items));
    }

    handleError(): boolean {
        return false;
    }
}
