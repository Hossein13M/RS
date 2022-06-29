import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessRole, BackendData, Roles, Units, User, UserRoles } from '../../user.model';
import { UserService } from '../../user.service';
import { Subject } from 'rxjs';
import { phoneNumberValidator } from '#shared/validators/phoneNumber/phoneNumberValidator';
import { AlertService } from '#shared/services/alert.service';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-user-batch',
    templateUrl: './user-batch.component.html',
    styleUrls: ['./user-batch.component.scss'],
})
export class UserBatchComponent implements OnInit, OnDestroy {
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public userAccessRoles: Array<AccessRole> = [];
    public rolesOnUnit: Array<Array<{ childId: number; id: number; name: string }>> = [];
    public form: FormGroup;
    public organizationUnits: Units;
    public rolesForm: FormArray = this.fb.array([], [Validators.required]);
    private dataForBackend: BackendData;

    public userData: User;
    public userOrganizationControlsData: Array<{
        units: Units;
        roles: Array<Roles>;
    }> = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public dialogRef: MatDialogRef<UserBatchComponent>,
        private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public passedId: number | null
    ) {}

    public get userOrganizations(): FormArray {
        return this.form.get('userRoles') as FormArray;
    }

    public get formRoles(): FormArray {
        return this.rolesForm as FormArray;
    }

    get formArray(): AbstractControl | null {
        return this.form.get('formArray');
    }

    ngOnInit(): void {
        this.initializeForm();
        this.getUserAccessRole();
        this.getOrganizationUnits();
        this.addFormGroupToRoleFormArray();
    }

    private initializeForm(): void {
        this.form = this.fb.group({
            personnelCode: [this.userData?.organizationStructures[0].personnelCode ?? '', Validators.required],
            firstname: [this.userData?.firstname ?? '', Validators.required],
            lastname: [this.userData?.lastname ?? '', Validators.required],
            nationalCode: [this.userData?.nationalCode ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            phoneNumber: [this.userData?.phoneNumber ?? '', [Validators.required, phoneNumberValidator()]],
            email: [this.userData?.email ?? '', [Validators.required, Validators.email]],
            birthDate: [this.userData?.birthDate ?? '', Validators.required],
            userRole: [this.userData?.organizationStructures[0].userRole ?? null, Validators.required],
            rolesForm: this.fb.array([]),
        });
    }

    public rolesBasedOnUnits(): FormArray {
        return this.form.get('rolesForm') as FormArray;
    }

    private getUserAccessRole(): void {
        this.userService.getUserAccessRolesOnSpecificOrganization(this.organizationCode).subscribe((response) => (this.userAccessRoles = response));
    }

    private getOrganizationUnits(): void {
        this.userService.getOrganizationUnits().subscribe((response) => (this.organizationUnits = response));
    }

    public addFormGroupToRoleFormArray(formData?: { units: Array<number>; roles: Array<number> }): void {
        this.rolesForm = this.form.get('rolesForm') as FormArray;
        !!formData
            ? this.rolesForm.push(this.addNewRolesBasedOnUnits({ units: formData.units, roles: formData.roles }))
            : this.rolesForm.push(this.addNewRolesBasedOnUnits());

        !!formData && this.form.get('rolesForm').setValue(this.rolesForm);
    }

    public addNewRolesBasedOnUnits(data?: { units: Array<number>; roles: Array<number> }): FormGroup {
        return data
            ? this.fb.group({ units: [data.units], roles: [data.roles] })
            : this.fb.group({
                  units: null,
                  roles: null,
              });
    }

    public removeFormGroupFromFormArray(index: number): void {
        this.rolesForm.removeAt(index);
    }

    public detectChanges(event: any, index) {
        event.value._checked ? this.getRolesOnSpecificUnits(event.value.value, index) : (this.rolesOnUnit[index] = []);
    }

    private getRolesOnSpecificUnits(unitId: number, index: number): void {
        this.organizationUnits.children.map((item) => {
            if (item.id === unitId) {
                this.rolesOnUnit[index] = item.mappings;
            }
        });
    }

    public onSubmit(): void {
        this.prepareDataForAPI();

        if (this.form.invalid) {
            this.alertService.onError('ورودی‌ها را بررسی کنید.');
            return;
        }
    }

    public isUpdate(): boolean {
        return !!this.passedId;
    }

    private createUser(): void {
        this.userService.createUser(this.dataForBackend).subscribe(
            () => {
                this.alertService.onSuccess('کاربر با موفقیت ساخته شد.');
                this.dialogRef.close(true);
            },
            () => this.alertService.onError('لطفا ورودی های خود را چک کنید.')
        );
    }

    private updateUser(): void {
        this.userService.updateUser({ id: this.passedId, ...this.form.value }).subscribe(
            () => {
                this.alertService.onSuccess('کاربر با موفقیت ساخته شد.');
                this.dialogRef.close(true);
            },
            () => this.alertService.onError('لطفا ورودی های خود را چک کنید.')
        );
    }

    public prepareDataForAPI(): void {
        const organizationStructures: Array<UserRoles> = [
            {
                organizationId: UtilityFunctions.getActiveOrganizationInfo('id'),
                organizationCode: UtilityFunctions.getActiveOrganizationInfo('id'),
                personnelCode: this.form.get('personnelCode').value,
                userRole: this.form.get('userRole').value,
                units: [],
                roles: [],
            },
        ];
        const nationalCode: string = this.form.get('nationalCode').value;

        this.form.value.rolesForm.map((item) => {
            item.roles.map((innerItem) => organizationStructures[0].roles.push(innerItem));
            item.units.map((innerItem) => organizationStructures[0].units.push(innerItem));
        });

        this.dataForBackend = {
            firstname: this.form.get('firstname').value,
            lastname: this.form.get('firstname').value,
            nationalCode: this.form.get('nationalCode').value,
            birthDate: <string>UtilityFunctions.convertDateToGregorianFormatForServer(this.form.get('birthDate').value),
            email: this.form.get('email').value,
            phoneNumber: this.form.get('phoneNumber').value,
            organizationStructures: organizationStructures,
        };

        this.userService.checkForExistingUser(nationalCode).subscribe((response) => {
            if (response.items.length === 0) {
                this.isUpdate() ? this.updateUser() : this.createUser();
            } else {
                this.alertService.onError('کاربری با این کد ملی موجود است');
                return;
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
