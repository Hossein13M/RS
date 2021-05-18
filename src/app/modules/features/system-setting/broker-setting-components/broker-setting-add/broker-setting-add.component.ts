import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { BrokerSettingService } from 'app/services/feature-services/system-setting-services/broker-setting.service';

@Component({
    selector: 'app-broker-setting-add',
    templateUrl: './broker-setting-add.component.html',
    styleUrls: ['./broker-setting-add.component.scss'],
})
export class BrokerSettingAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';

    constructor(
        public dialogRef: MatDialogRef<BrokerSettingAddComponent>,
        private bankService: BankService,
        private alertService: AlertService,
        private brokerService: BrokerSettingService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.bankService.getBankSettings().subscribe((res: any) => {
            this.banks = res.items;
        });
        this.creatForm();
    }

    creatForm(): void {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
            code: [this.data ? this.data.code : '', Validators.required],
        });
    }

    onCreateBranch(): void {
        this.brokerService.post(this.form.value).subscribe((res) => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(res);
        });
    }

    onEditBranch(): void {
        const obj = {
            id: this.data['id'],
            name: this.form.get('name').value,
            code: this.form.get('code').value,
        };
        this.brokerService.put(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
