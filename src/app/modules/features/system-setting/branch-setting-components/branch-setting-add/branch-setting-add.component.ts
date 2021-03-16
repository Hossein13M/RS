import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AlertService } from 'app/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { BranchSettingService } from 'app/services/feature-services/system-setting-services/branch-setting.service';

@Component({
    selector: 'app-branch-setting-add',
    templateUrl: './branch-setting-add.component.html',
    styleUrls: ['./branch-setting-add.component.scss'],
    animations: [fuseAnimations],
})
export class BranchSettingAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';

    constructor(
        public dialogRef: MatDialogRef<BranchSettingAddComponent>,
        private bankService: BankService,
        private AlertService: AlertService,
        private branchSettingService: BranchSettingService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.bankService.getAllBank(this).subscribe((res: any) => {
            this.banks = res.items;
        });
        this.creatForm();
    }

    creatForm() {
        this.form = this.fb.group({
            bankId: [this.data ? this.data.bankId : '', Validators.required],
            name: [this.data ? this.data.name : '', Validators.required],
            code: [this.data ? this.data.code : '', Validators.required],
        });
    }

    onCreateBranch() {
        this.branchSettingService.createBankBranch(this.form.value, this).subscribe(() => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch() {
        const obj = {
            id: this.data['id'],
            name: this.form.get('name').value,
            code: this.form.get('code').value,
            bankId: this.form.get('bankId').value,
        };
        this.branchSettingService.updateBankBranch(obj, this).subscribe(() => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
