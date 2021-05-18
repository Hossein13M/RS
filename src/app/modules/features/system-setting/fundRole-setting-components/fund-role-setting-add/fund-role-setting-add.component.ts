import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { FundRoleService } from 'app/services/feature-services/system-setting-services/fund-role.service';
import { OrganizationSupervisorService } from 'app/services/feature-services/system-setting-services/organization-supervisor.service';
import { OrganizationTypeService } from 'app/services/feature-services/system-setting-services/organization-type.service';
import { OrganizationSupervisorAddComponent } from '../../organization-supervisor-setting-components/organization-supervisor-add/organization-supervisor-add.component';
import { OrganizationTypeSettingAddComponent } from '../../organization-type-setting-components/organization-type-setting-add/organization-type-setting-add.component';

@Component({
    selector: 'app-fund-role-setting-add',
    templateUrl: './fund-role-setting-add.component.html',
    styleUrls: ['./fund-role-setting-add.component.scss'],
})
export class FundRoleSettingAddComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<FundRoleSettingAddComponent>,
        private dialog: MatDialog,
        private fundRoleService: FundRoleService,
        private organizationTypeService: OrganizationTypeService,
        private organizationSupervisorService: OrganizationSupervisorService,
        private AlertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    form: FormGroup;
    title = '';
    orgTypes = [];
    orgSupervisors = [];

    isWorking: any;

    ngOnInit(): void {
        this.data ? (this.title = 'ویرایش ') : (this.title = 'ایجاد ');
        this.creatForm();
        this.getOrgType();
        this.getOrgSup();
    }

    getOrgType(): void {
        this.organizationTypeService.getOrganizationType(this).subscribe((res: any) => (this.orgTypes = res));
    }

    getOrgSup(): void {
        this.organizationSupervisorService.get().subscribe((res: any) => (this.orgSupervisors = res));
    }

    addSupervisor(): void {
        this.dialog
            .open(OrganizationSupervisorAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe(() => this.getOrgSup());
    }

    addOrgType(): void {
        this.dialog
            .open(OrganizationTypeSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe(() => this.getOrgType());
    }

    creatForm(): void {
        this.form = this.fb.group({
            name: [this.data ? this.data.name : '', Validators.required],
            phone: [this.data ? this.data.phone : ''],
            address: [this.data ? this.data.address : ''],
            agentName: [this.data ? this.data.agentName : ''],
            agentPhone: [this.data ? this.data.agentPhone : ''],
            nationalId: [this.data ? this.data.nationalId : '', Validators.required],
            regNumber: [this.data ? this.data.regNumber : '', Validators.required],
            regDate: [this.data ? this.data.regDate : ''],
            hasSupervisor: [this.data ? this.data.hasSupervisor : ''],
            organizationSupervisorIds: [this.data ? this.data.organizationSupervisorIds : ''],
            organizationTypeId: [this.data ? this.data.organizationTypeId : ''],
        });
    }

    onCreateBranch(): void {
        this.fundRoleService.create(this.form.value, this).subscribe(() => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = { id: this.data['id'], name: this.form.get('name').value };
        this.fundRoleService.update(obj, this).subscribe(() => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }

    handleError(): boolean {
        return false;
    }
}
