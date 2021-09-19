import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/services/alert.service';
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
        private alertService: AlertService,
        private organizationTypeService: OrganizationTypeService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
    }

    creatForm(): void {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
        });
    }

    onCreateBranch(): void {
        this.organizationTypeService.createOrganizationType(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = this.form.value;
        obj['id'] = this.data.id;
        this.organizationTypeService.updateOrganizationType(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
