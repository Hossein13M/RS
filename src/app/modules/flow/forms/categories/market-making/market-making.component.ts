import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankBranchService } from 'app/services/feature-services/bank-branch.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { BrokerService } from 'app/services/feature-services/broker.service';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';

@Component({
    selector: 'app-market-making',
    templateUrl: './market-making.component.html',
    styleUrls: ['./market-making.component.scss'],
})
export class MarketMakingComponent extends BaseFormModel implements OnInit {
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
        public formsWrapperService: FormsWrapperService,
        public formsModelService: FormsModelService
    ) {
        super(formsWrapperService);
        this.form = this.fb.group({
            contractBaseInfo: '', // form
            securityType: '',
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
            marketMakingFeesReceivingInfo: '', // form
            marketMakingFeesFreq: '',
            percentageSalesDeductions: '',
            defaultsPossibleDamagesPercent: '',
            defaultsPossibleDamagesAmount: '',

            syndicateMembersNames: '', // form

            marketMakingFeesCounts: '',
            marketMakingFeesConsiderationFreq: '',
            marketMakingFeesConsiderationRate: '',
            marketMakingDelinquencyGracePeriod: '',
            tamadonPettyCashAmount: '',
            tamadonPettyCashPercent: '',
            receiptFirstMarketMakingDate: '',
            pettyCashFreq: '',
            pettyCashCounts: '',
            pettyCashRecievingBankAccount: '',
            pettyCashRecievingBankName: '',
            pettyCashRecievingBranchName: '',

            pettyCashDelinquencyConsiderationFreq: '',
            pettyCashDelinquencyConsiderationRate: '',
            pettyCashDelinquencyGracePeriod: '',
            pettyCashReceivingInfo: '', // form

            pettyCashPayingBackDate: '',
            pettyCashPayingBackFreq: '',
            pettyCashPayingBachCounts: '',

            pettyCashPayingBackDelinquencyConsiderationFreq: '',
            pettyCashPayingBackDelinquencyConsiderationRate: '',
            pettyCashPayingBackDelinquencyGracePeriod: '',
            pettyCashPayingBackInfo: '', // form
            salafPutOptionRate: '',
            salafCallOptionRate: '',
            salafMarketMakingRate: '',
            marketmakingType: '',
            guarantorInfo: '', // form
            securityName: '',
            invoiceInfo: '', // form
            collateralInfo: '', // form
            feeAndPetty: '',
        });
    }

    ngOnInit(): void {
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

    getAllBroker(): void {
        this.brokerService.getAllBrokers(this).subscribe((res: any[]) => {
            this.brokers = res;
        });
    }

    getAllBankBranch(): void {
        this.bankBranchService.getBankBranch(this).subscribe((res: any) => {
            this.bankBranches = res.items;
        });
    }

    getAllBanks(): void {
        this.bankService.getAllBank(this).subscribe((res: any) => {
            this.banks = res.items;
        });
    }

    handleError(): boolean {
        return false;
    }
}
