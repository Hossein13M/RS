import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { BourseMarketService } from 'app/services/feature-services/system-setting-services/bourse-market.service';

@Component({
    selector: 'app-bourse-market-setting-add',
    templateUrl: './bourse-market-setting-add.component.html',
    styleUrls: ['./bourse-market-setting-add.component.scss'],
})
export class BourseMarketSettingAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';

    constructor(
        public dialogRef: MatDialogRef<BourseMarketSettingAddComponent>,
        private bourseMarketService: BourseMarketService,
        private AlertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
    }

    creatForm() {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
            code: [this.data ? this.data.code : '', Validators.required],
        });
    }

    onCreateBranch() {
        this.bourseMarketService.createBourseMarket(this.form.value, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch() {
        const obj = {
            id: this.data['id'],
            name: this.form.get('name').value,
            code: this.form.get('code').value,
        };
        this.bourseMarketService.updateBourseMarket(obj, this).subscribe((res) => {
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
