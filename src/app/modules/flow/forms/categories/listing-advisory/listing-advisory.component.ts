import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';
import { ContractEndingReason, SecurityType } from '../../models/combo-lists';

@Component({
    selector: 'app-listing-advisory',
    templateUrl: './listing-advisory.component.html',
    styleUrls: ['./listing-advisory.component.scss'],
})
export class ListingAdvisoryComponent extends BaseFormModel implements OnInit {
    form: FormGroup;

    securityMap = SecurityType.map;
    contractEndingReasons = ContractEndingReason.map;

    isWorking: any;

    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(private fb: FormBuilder, public formWrapperService: FormsWrapperService, public formsModelService: FormsModelService) {
        super(formWrapperService);

        this.form = this.fb.group({
            securityType: 0,
            securityIssuedAmount: 0,
            securityIssuedCounts: 0,
            securityParValue: 0,
            prepaymentReceivingDate: '',
            relatedDocumentsDeliveredDate: '',
            contractFeeRate: 0,
            contractFeeAmount: 0,
            paymentCounts: 0,
            successAmount: 0,
            successAmountReceivingDate: '',
            contractEndingReason: 0,
            contractEndingReasonExplanation: '',
            feeCashDelinquencyConsiderationFreq: 0,
            feeCashDelinquencyConsiderationRate: 0,
            feeCashDelinquencyGracePeriod: 0,
            contractBaseInfo: '',
            invoiceInfo: '',
            contractPaymentsInfo: '',
            marketMakingFeesFreq: '',
            nominalRate: '',
            securityIsssuedCounts: '',
        });
    }

    ngOnInit(): void {
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
            (err) => {
                this.formsWrapperService.firstTime = true;
            }
        );
    }

    onSubFormSubmit(obj): void {
        if (obj) {
            this.form.get(obj.property).setValue(obj.data);
        }
    }

    createFormApi(): void {
        this.createFormDocument(this.api, this.form.value).subscribe(
            (res) => {},
            (error) => {}
        );
    }

    handleError(): boolean {
        return false;
    }
}
