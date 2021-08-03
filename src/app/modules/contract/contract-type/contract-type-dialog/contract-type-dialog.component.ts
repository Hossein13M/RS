import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { searchSelectStateType } from '#shared/components/search-select/search-select.component';
import { ContractTypeService } from '../contract-type.service';
import { UserService } from '../../../organizations-structure/user/user.service';
import { Roles, Units, User } from '../../../organizations-structure/user/user.model';
import { ContractForm, ContractType, Form } from '../contract-type.model';
import { AlertService } from '#services/alert.service';

@Component({
    selector: 'app-contract-type-dialog',
    templateUrl: './contract-type-dialog.component.html',
    styleUrls: ['./contract-type-dialog.component.scss'],
})
export class ContractTypeDialogComponent implements OnInit {
    private activeOrganizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public rolesOnUnit: Array<Array<{ childId: number; id: number; name: string }>> = [];
    public title: string;
    public isEditMode: boolean = false;
    public users: Array<User>;
    public allRolesList: Array<Roles>;
    public rolesOnSpecificUnit: Array<Roles>;
    public units: Units;
    public contractTypeForms: Array<ContractForm> = [];
    public selectedRolesInUnits: Array<{ unit: number; roles: Array<number> }> = [{ unit: null, roles: [null] }];
    private unitFormArrayItems: FormArray;
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        keyword: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
        form: [null],
        organization: [this.activeOrganizationCode, Validators.required],
        users: [null, Validators.required],
        roles: [null, Validators.required],
        units: this.fb.array([this.addNewRolesBasedOnUnits()]),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ContractType,
        private fb: FormBuilder,
        private contractService: ContractTypeService,
        private userService: UserService,
        private alertService: AlertService,
        public dialog: MatDialogRef<ContractTypeDialogComponent>
    ) {}

    ngOnInit(): void {
        this.checkForEditMode();
        this.getComponentDataFromServer();
    }

    private getComponentDataFromServer(): void {
        this.getOrganizationUsers();
        this.getOrganizationUsers();
        this.getOrganizationUnits();
        this.getOrganizationRoles();
        this.getContractTypeForms();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data;
        this.isEditMode ? (this.title = 'ویرایش نوع قرارداد') : (this.title = 'افزودن نوع قرارداد');
        if (this.isEditMode) this.setDataForEditMode();
    }

    private setDataForEditMode(): void {
        this.form.get('name').setValue(this.data.name);
        this.form.get('form').setValue(this.data.form);
        // this.form.get('users').setValue(this.data.authorizedUsers);
        this.form.get('roles').setValue(this.data.roles);

        this.data.units.map((item) => this.addUnitRolesToFormArray(item));
        // this.form.setValue(this.data);
    }

    private setUserDataInEditMode(): void {
        const userData = [];
        this.users.map((user) => {
            this.data.authorizedUsers.map((authorizedUser) => {
                if (user.id === authorizedUser) userData.push(user);
            });
        });
        this.form.get('users').setValue(userData);
    }

    private getOrganizationUsers(): any {
        this.userService.getUsers([`${this.activeOrganizationCode}`]).subscribe((response) => {
            this.users = response.items;
            if (this.isEditMode) this.setUserDataInEditMode();
        });
    }

    private getOrganizationRoles(): void {
        this.userService.getOrganizationRoles(this.activeOrganizationCode, []).subscribe((response) => (this.allRolesList = response));
    }

    private getOrganizationUnits(): void {
        this.userService.getOrganizationUnits([this.activeOrganizationCode]).subscribe((response) => (this.units = response));
    }

    private getContractTypeForms(): void {
        this.contractService.getContractTypeForms(UtilityFunctions.getActiveOrganizationInfo('code')).subscribe((response) => {
            this.contractTypeForms = response;
        });
    }

    public submitForm(): void {
        const data: Form = ContractTypeDialogComponent.removeEmptyStatesFromForm(this.form.value);

        this.contractService.createContractType(data).subscribe(
            () => this.dialog.close(true),
            () => this.alertService.onError('مشکلی پیش آمده است.')
        );
    }

    static removeEmptyStatesFromForm(form: Form): Form {
        if (!UtilityFunctions.checkValueForNotBeingAnEmptyArray(form.users)) delete form.users;
        if (!UtilityFunctions.checkValueForNotBeingAnEmptyArray(form.roles)) delete form.roles;
        if (form.units.length === 1 && form.units[0].roles === null) delete form.units;
        return form;
    }

    public rolesBasedOnUnits(): FormArray {
        return this.form.get('units') as FormArray;
    }

    public addNewRolesBasedOnUnits(data?: { unit: number; roles: Array<number> }): FormGroup {
        return data ? this.fb.group({ units: data.unit, roles: data.roles }) : this.fb.group({ units: null, roles: null });
    }

    public addUnitRolesToFormArray(data?: { unit: number; roles: Array<number> }): void {
        if (data) {
            // this.unitFormArrayItems = this.form.get('units') as FormArray;
            // this.unitFormArrayItems.push(this.addNewRolesBasedOnUnits(data));
        } else {
            this.unitFormArrayItems = this.form.get('units') as FormArray;
            this.unitFormArrayItems.push(this.addNewRolesBasedOnUnits());
        }
    }

    private getRolesOnSpecificUnits(unitId: number, index: number): void {
        this.units.children.map((item) => {
            if (item.id === unitId) {
                this.rolesOnUnit[index] = item.mappings;
            }
        });
    }

    public removeItemFromUnitFormArray(index: number) {
        this.rolesBasedOnUnits().removeAt(index);
    }

    public detectChanges(event: any, index) {
        event.value._checked ? this.getRolesOnSpecificUnits(event.value.value, index) : (this.rolesOnUnit[index] = []);
    }

    public searchUser = (searchKey, data): void => {
        setTimeout(() => {
            data.list = this.users.filter((el) => el.fullname.includes(searchKey));
            data.state = searchSelectStateType.PRESENT;
        }, 500);
    };
}
