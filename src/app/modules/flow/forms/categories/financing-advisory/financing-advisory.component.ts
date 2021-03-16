import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';
import { ContractEndingReason, SecurityType } from '../../models/combo-lists';

@Component({
    selector: 'app-financing-advisory',
    templateUrl: './financing-advisory.component.html',
    styleUrls: ['./financing-advisory.component.scss'],
})
export class FinancingAdvisoryComponent extends BaseFormModel implements OnInit {
    form: FormGroup;

    securityTypes = SecurityType.map;
    contractEndingReasons = ContractEndingReason.map;

    isWorking: any;

    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(private fb: FormBuilder, public formsWrapperService: FormsWrapperService, public formsModelService: FormsModelService) {
        super(formsWrapperService);

        this.form = this.fb.group({
            securityType: 0,
            financingAmount: 0,
            financingFeesRate: 0,
            financingFeesAmount: 0,
            marketingAndSellFeesRate: 0,
            financingFeesReceivingDate: '',
            contractEndingReason: 0,
            contractEndingReasonExplanation: '',
            feeCashDelinquencyConsiderationFreq: 0,
            feeCashDelinquencyConsiderationRate: 0,
            feeCashDelinquencyGracePeriod: 0,
            introducedCustomerInfo: '', //form
            contractPaymentsInfo: '', // form
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
        if (obj) {
            this.form.get(obj.property).setValue(obj.data);
        }
    }

    createFormApi(): void {
        this.createFormDocument(this.api, this.form.value).subscribe(() => {});
    }

    handleError(): boolean {
        return false;
    }
}
