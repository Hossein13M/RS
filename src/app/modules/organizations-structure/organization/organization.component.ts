import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationStructureService } from '../organization-structure.service';
import { AlertService } from '#shared/services/alert.service';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
    form: FormGroup = this.fb.group({ name: ['', Validators.required] });
    isEditMode: boolean = false;
    title: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private organizationStructureService: OrganizationStructureService,
        public dialogRef: MatDialogRef<any>,
        private alertService: AlertService
    ) {}

    public submitForm(): void {
        this.isEditMode ? this.editOrganization() : this.addOrganization();
    }

    private addOrganization(): void {
        this.organizationStructureService.addOrganization(this.form.value).subscribe(
            () => this.dialogRef.close(true),
            () => this.alertService.onError('خطایی رخ داده‌است')
        );
    }

    private editOrganization(): void {
        const organizationInfo = { name: this.form.get('name').value, id: this.data.id };
        this.organizationStructureService.editOrganization(organizationInfo).subscribe(
            () => this.dialogRef.close(true),
            () => this.alertService.onError('خطایی رخ داده‌است')
        );
    }

    ngOnInit(): void {
        this.checkForEditMode();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data;
        this.isEditMode ? (this.title = 'ویرایش نهاد') : (this.title = 'افزودن نهاد');
        if (this.isEditMode) this.form.get('name').setValue(this.data.name);
    }
}
