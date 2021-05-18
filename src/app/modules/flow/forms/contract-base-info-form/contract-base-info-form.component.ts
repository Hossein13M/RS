import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BankBranchService } from 'app/services/feature-services/bank-branch.service';
import { BankService } from 'app/services/feature-services/bank.service';

@Component({
    selector: 'app-contract-base-info-form',
    templateUrl: './contract-base-info-form.component.html',
    styleUrls: ['./contract-base-info-form.component.scss'],
})
export class ContractBaseInfoFormComponent implements OnInit, OnChanges {
    form: FormGroup;

    bankBranches = [];
    banks = [];
    @Input() data;
    @Output() newData = new EventEmitter();

    isWorking: any;
    handleError: (err: HttpErrorResponse) => boolean;

    constructor(private fb: FormBuilder, private bankService: BankService, private bankBranchService: BankBranchService) {
        this.form = this.fb.group({
            type: [this.data ? this.data.type : ''],
            contractNumber: [this.data ? this.data.contractNumber : ''],
            conterpartyName: [this.data ? this.data.conterpartyName : ''],
            counterpartyGICode: [this.data ? this.data.counterpartyGICode : ''],
            contractName: [this.data ? this.data.contractName : ''],
            settingDate: [this.data ? this.data.settingDate : ''],
            signatureDate: [this.data ? this.data.signatureDate : ''],
            beginningDate: [this.data ? this.data.beginningDate : ''],
            endingDate: [this.data ? this.data.endingDate : ''],
            periodMonth: [this.data ? this.data.periodMonth : ''],
            valueAddedTaxRate: [this.data ? this.data.valueAddedTaxRate : ''],
            mandatoryTaxRate: [this.data ? this.data.mandatoryTaxRate : ''],
            feesPaymentsBankAccounts: [this.data ? this.data.feesPaymentsBankAccounts : ''],
            bankFeesPaymentAccounts: [this.data ? this.data.bankFeesPaymentAccounts : ''],
            branchPayment: [this.data ? this.data.branchPayment : ''],
            annex: [this.data ? this.data.annex : ''],
            originalContractNumber: [this.data ? this.data.originalContractNumber : ''],
            annexNumber: [this.data ? this.data.annexNumber : ''],
            annexReason: [this.data ? this.data.annexReason : ''],
        });
    }

    ngOnInit(): void {
        this.getAllBanks();
        this.getAllBankBranch();
        this.form.valueChanges.subscribe((res) => {
            if (this.form.valid) {
                this.newData.emit({ property: 'contractBaseInfo', data: res });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.data) {
            return;
        }

        this.form.patchValue(this.data);
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
