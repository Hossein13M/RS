import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/services/alert.service';
import { BankAccountTypeService } from 'app/services/feature-services/bank-account-type.service';
import { BankBranchService } from 'app/services/feature-services/bank-branch.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { FrequenceService } from 'app/services/feature-services/frequence.service';
import { DepositSettingService } from 'app/services/feature-services/system-setting-services/deposit-setting.service';

@Component({
    selector: 'app-deposit-setting-add',
    templateUrl: './deposit-setting-add.component.html',
    styleUrls: ['./deposit-setting-add.component.scss'],
})
export class DepositSettingAddComponent implements OnInit {
    form: FormGroup;
    title = '';
    bankAccountTypes = [];
    banks = [];
    bankBranches = [];
    frequences = [];

    constructor(
        public dialogRef: MatDialogRef<DepositSettingAddComponent>,
        private depositService: DepositSettingService,
        private alertService: AlertService,
        private bankService: BankService,
        private bankBranchService: BankBranchService,
        private bankAccountTypeService: BankAccountTypeService,
        private frequenceService: FrequenceService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    getBankBranch(): void {
        this.bankBranchService.getBankBranch().subscribe((rs: any) => (this.bankBranches = rs.items));
    }

    getBankAccountTypes(): void {
        this.bankAccountTypeService.getBankAccountTypes().subscribe((res: any) => (this.bankAccountTypes = res));
    }

    getBank(): void {
        this.bankService.getBankSettings().subscribe((res: any) => (this.banks = res.items));
    }

    getFrequences(): void {
        this.frequenceService.getAllFrequences().subscribe((res: any) => {
            this.frequences = res;
            this.frequences.unshift({ id: null, name: 'ندارد', paymentPeriod: 0 });
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
        this.getBankAccountTypes();
        this.getBank();
        this.getBankBranch();
        this.getFrequences();
    }

    creatForm(): void {
        this.form = this.fb.group({
            accountTypeId: [this.data ? this.data.accountTypeId : '', Validators.required],
            bankId: [this.data ? this.data.bankId : '', Validators.required],
            branchId: [this.data ? this.data.branchId : '', Validators.required],
            frequenceId: [this.data ? this.data.frequenceId : '', Validators.required],
            depositNumber: [this.data ? this.data.depositNumber : '', Validators.required],
            iban: [this.data ? this.data.iban : '', Validators.required],
            openingDate: [this.data ? this.data.openingDate : '', Validators.required],
            endDate: [this.data ? this.data.endDate : ''],
            interestRate: [this.data ? this.data.interestRate : '', Validators.required],
            preferedRate: [this.data ? this.data.preferedRate : ''],
            penaltyRate: [this.data ? this.data.penaltyRate : ''],
            interestReceivedAccount: [this.data ? this.data.interestReceivedAccount : ''],
            blockedDepositBalance: [this.data ? this.data.blockedDepositBalance : ''],
            depositBalance: [this.data ? this.data.depositBalance : ''],
            glCode: [this.data ? this.data.glCode : '', Validators.required],
            paymentDay: [this.data ? this.data.paymentDay : '', Validators.required],
            status: [this.data ? this.data.status : '', Validators.required],
            description: [this.data ? this.data.description : ''],
        });
    }

    onCreateBranch(): void {
        this.depositService.createDepositSetting(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = this.form.value;
        obj['id'] = this.data.id;
        this.depositService.updateDepositSetting(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
