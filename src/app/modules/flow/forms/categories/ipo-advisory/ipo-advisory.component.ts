import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';
import { ContractEndingReason, SecurityType } from '../../models/combo-lists';

@Component({
    selector: 'app-ipo-advisory',
    templateUrl: './ipo-advisory.component.html',
    styleUrls: ['./ipo-advisory.component.scss'],
})
export class IpoAdvisoryComponent extends BaseFormModel implements OnInit {
    form: FormGroup;

    isWorking: any;

    securityMap = SecurityType.map;
    contractEndingReasons = ContractEndingReason.map;

    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(private fb: FormBuilder, public formsWrapperService: FormsWrapperService, public formsModelService: FormsModelService) {
        super(formsWrapperService);

        this.form = this.fb.group({
            securityType: 0,
            securityIssuedAmount: 0,
            securityIssuedCounts: 0, //added new
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
            contractBaseInfo: '', //form
            invoiceInfo: '', //form
            contractPaymentsInfo: '', //form
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
