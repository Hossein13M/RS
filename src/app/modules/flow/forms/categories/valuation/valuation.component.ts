import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';

@Component({
    selector: 'app-valuation',
    templateUrl: './valuation.component.html',
    styleUrls: ['./valuation.component.scss'],
})
export class ValuationComponent extends BaseFormModel implements OnInit {
    form: FormGroup;
    isWorking: any;
    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(private fb: FormBuilder, public formsWrapperService: FormsWrapperService, public formsModelService: FormsModelService) {
        super(formsWrapperService);
        this.form = this.fb.group({
            projectOrCorporateUnderValuation: '',
            prepaymentReceivingDate: '',
            relatedDocumentsDeliveredDate: '',
            contractAmount: 0,
            paymentCounts: 0,
            feeCashDelinquencyConsiderationFreq: 0,
            feeCashDelinquencyConsiderationRate: 0,
            feeCashDelinquencyGracePeriod: 0,
            contractPaymentsInfo: [],
            contractBaseInfo: '',
            invoiceInfo: '',
        });
    }

    ngOnInit(): void {
        this.formsWrapperService.formId = this.formId;
        this.formsWrapperService.flowId = this.flowId;
        this.formsWrapperService.flowInstanceId = this.flowInstanceId;

        this.getFormDocument(this.api).subscribe((res) => (this.baseObj = res));

        this.getFormDocument(this.api).subscribe(
            (res) => {
                if (res && res.submittedData) {
                    this.form.patchValue(res.submittedData);
                    this.baseObj = res.submittedData;
                    this.formsWrapperService.firstTime = false;
                } else this.formsWrapperService.firstTime = true;
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
        return true;
    }
}
