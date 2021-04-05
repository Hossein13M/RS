import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankBranchService } from 'app/services/feature-services/bank-branch.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { FormsWrapperService } from 'app/services/feature-services/forms-wrapper.service';
import { BaseFormModel } from '../../modal/BaseFormModel';

@Component({
    selector: 'app-exlcusively-asset-management',
    templateUrl: './exlcusively-asset-management.component.html',
    styleUrls: ['./exlcusively-asset-management.component.scss'],
})
export class ExlcusivelyAssetManagementComponent extends BaseFormModel implements OnInit {
    form: FormGroup;

    bankBranches = [];
    banks = [];

    isWorking: any;

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
            contractBaseInfo: '',
            investorAssetsVolumeDeliveringToAssetManager: 0,
            investorAssetsDeliveringDateToAssetManager: '',
            investorRealAssetsVolumeDeliveringToAssetManager: 0,
            investorCashDeliveringToAssetManager: 0,
            investorCashDeliveringDateToAssetManager: 0,
            investorRealCashDeliveringToAssetManager: 0,
            completelyAssetDeliveringPeriod: 0,
            completelyAssetDeliveringDate: '',
            investorAssetAmountInDeliveringDateToAssetManager: 0,
            investorCashInDeliveringDateToAssetManager: 0,
            stockFixedFeesRateFreq: 0,
            stockFixedFeesRateCal: 0,
            securityFixedFeesRateFreq: 0,
            securityFixedFeesRateCal: 0,
            settlementFeesFreq: 0,
            portfolioAssetsPayingBankAccount: 0,
            portfolioAssetsPayingBankName: '',
            portfolioAssetsPayingBranchName: '',
            variableFeesInfo: '',
            feeAndPetty: '', //form
            invoiceInfo: '', //form
            collateralInfo: '', //form
        });
    }

    ngOnInit() {
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
            (err) => {
                this.formsWrapperService.firstTime = true;
            }
        );

        // Get Bank Branches
        this.form.get('portfolioAssetsPayingBankName').valueChanges.subscribe((bc) => {
            this.getAllBankBranch(bc);
        });
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

    getAllBankBranch(bankCode = null) {
        this.bankBranchService.getBankBranch(this, bankCode).subscribe((res: any) => {
            this.bankBranches = res.items;
        });
    }

    getAllBanks() {
        this.bankService.getAllBank(this).subscribe((res: any) => {
            this.banks = res.items;
        });
    }

    handleError(): boolean {
        return false;
    }
}
