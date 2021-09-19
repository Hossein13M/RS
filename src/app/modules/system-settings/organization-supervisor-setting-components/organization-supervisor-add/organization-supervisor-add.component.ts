import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { OrganizationSupervisorService } from 'app/services/feature-services/system-setting-services/organization-supervisor.service';

@Component({
    selector: 'app-organization-supervisor-add',
    templateUrl: './organization-supervisor-add.component.html',
    styleUrls: ['./organization-supervisor-add.component.scss'],
})
export class OrganizationSupervisorAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';

    constructor(
        public dialogRef: MatDialogRef<OrganizationSupervisorAddComponent>,
        private organizationSupervisorService: OrganizationSupervisorService,
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
        });
    }

    onCreateBranch() {
        this.organizationSupervisorService.create(this.form.value).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch() {
        const obj = {
            id: this.data['id'],
            name: this.form.get('name').value,
        };
        this.organizationSupervisorService.update(obj).subscribe((res) => {
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
}
