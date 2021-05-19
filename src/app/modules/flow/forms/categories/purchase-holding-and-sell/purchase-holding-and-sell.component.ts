import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankBranchService } from 'app/services/feature-services/bank-branch.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';

@Component({
    selector: 'app-purchase-holding-and-sell',
    templateUrl: './purchase-holding-and-sell.component.html',
    styleUrls: ['./purchase-holding-and-sell.component.scss'],
})
export class PurchaseHoldingAndSellComponent extends BaseFormModel implements OnInit {
    form: FormGroup;

    bankBranches = [];
    banks = [];

    @Input() formId: string;
    @Input() flowId: string;
    @Input() flowInstanceId: string;

    constructor(
        private fb: FormBuilder,
        private bankBranchService: BankBranchService,
        private bankService: BankService,
        public formsWrapperService: FormsWrapperService,
        public formsModelService: FormsModelService
    ) {
        super(formsWrapperService);

        this.form = this.fb.group({
            sellerName: '',
            buyerName: '',
            securitiesInfo: '', // form
            sellingPaymentsBankAccounts: '',
            bankSellingPaymentAccounts: '',
            sellingBranchPayments: '',
            dealCashDelinquencyConsiderationFreq: '',
            dealCashDelinquencyConsiderationRate: '',
            dealCashDelinquencyGracePeriod: '',
            overCashDelinquencyConsiderationFreq: '',
            overCashDelinquencyConsiderationRate: '',
            overCashDelinquencyGracePeriod: '',
            securityHoldingFeesFreq: '',
            contractBaseInfo: '', // form
            collateralInfo: '', // form
            invoiceInfo: '', // form
        });
    }

    ngOnInit(): void {
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
        if (obj) this.form.get(obj.property).setValue(obj.data);
    }

    createFormApi(): void {
        this.createFormDocument(this.api, this.form.value).subscribe(() => {});
    }

    getAllBankBranch(): void {
        this.bankBranchService.getBankBranch().subscribe((res: any) => {
            this.bankBranches = res.items;
        });
    }

    getAllBanks(): void {
        this.bankService.getBankSettings().subscribe((res: any) => {
            this.banks = res.items;
        });
    }
}
