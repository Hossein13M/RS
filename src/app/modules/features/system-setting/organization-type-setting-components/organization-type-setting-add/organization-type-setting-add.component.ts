import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { OrganizationTypeService } from 'app/services/feature-services/system-setting-services/organization-type.service';

@Component({
    selector: 'app-organization-type-setting-add',
    templateUrl: './organization-type-setting-add.component.html',
    styleUrls: ['./organization-type-setting-add.component.scss'],
})
export class OrganizationTypeSettingAddComponent implements OnInit {
    form: FormGroup;
    title = '';

    constructor(
        public dialogRef: MatDialogRef<OrganizationTypeSettingAddComponent>,
        private AlertService: AlertService,
        private organizationTypeService: OrganizationTypeService,
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
        });
    }

    onCreateBranch() {
        this.organizationTypeService.createOrganizationType(this.form.value, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch() {
        const obj = this.form.value;
        obj['id'] = this.data.id;
        this.organizationTypeService.updateOrganizationType(obj, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
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
