import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';

@Component({
    selector: 'app-market-making-assinment',
    templateUrl: './market-making-assinment.component.html',
    styleUrls: ['./market-making-assinment.component.scss'],
})
export class MarketMakingAssinmentComponent extends BaseFormModel implements OnInit {
    form: FormGroup;

    isWorking: any;

    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(public formsModelService: FormsModelService, public formWrapperService: FormsWrapperService, private fb: FormBuilder) {
        super(formWrapperService);

        this.form = this.fb.group({
            originalMarketmakingOriginalContractNumber: '',
            percentageSecondaryMarketMakingTransfer: '',
            numberSecondaryMarketMakingTransfer: '',
            minimumDailySecondaryMarketMakingPer: '',
            minimumDailySecondaryMarketMakingNum: '',
            totalAmountPaidSecondaryMarketMaking: '',
            marketMakingFeesReceivingInfo: '', //form
            firstDateMarketMakingFees: '',
            marketMakingFeesFreq: '',
            marketMakingFeesCounts: '',
            secondaryMarketMakingFeesPaymentsInfo: '', //form
            feeCashDelinquencyConsiderationFreq: '',
            feeCashDelinquencyConsiderationRate: '',
            feeCashDelinquencyGracePeriod: '',
            pettyCashAmount: '',
            pettyCashPercent: '',
            receiptFirstMarketMakingDate: '',
            pettyCashFreq: '',
            pettyCashCounts: '',
            pettyCashDelinquencyConsiderationFreq: '',
            pettyCashDelinquencyConsiderationRate: '',
            pettyCashDelinquencyGracePeriod: '',
            pettyCashReceivingInfo: '',
            pettyCashPayingBackFreq: '',
            pettyCashPayingBackDate: '',
            pettyCashPayingBackCounts: '',
            pettyCashPayingBackDelinquencyConsiderationFreq: '',
            pettyCashPayingBackDelinquencyConsiderationRate: '',
            pettyCashPayingBackDelinquencyGracePeriod: '',
            payingBackPettyCashInfo: '',
            collateralInfo: '', //form
            invoiceInfo: '', //form
            contractBaseInfo: '', //form
        });
    }

    ngOnInit() {
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
        if (obj) this.form.get(obj.property).setValue(obj.data);
    }

    createFormApi(): void {
        this.createFormDocument(this.api, this.form.value).subscribe(() => {});
    }

    handleError(): boolean {
        return false;
    }
}
