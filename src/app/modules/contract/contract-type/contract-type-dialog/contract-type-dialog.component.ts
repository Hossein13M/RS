import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service';
import { ContractService } from '../../contract.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { UserService } from '../../../organizations-structure/user/user.service';
import { Roles, Units, User } from '../../../organizations-structure/user/user.model';
import { searchSelectStateType } from '#shared/components/search-select/search-select.component';

@Component({
    selector: 'app-contract-type-dialog',
    templateUrl: './contract-type-dialog.component.html',
    styleUrls: ['./contract-type-dialog.component.scss'],
})
export class ContractTypeDialogComponent implements OnInit {
    private activeOrganizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');
    public title: string;
    public isEditMode: boolean = false;
    public users: Array<User>;
    public allRolesList: Array<Roles>;
    public rolesOnSpecificUnit: Array<Roles>;
    public units: Units;
    public contractTypeForms: any;
    public form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        form: [null, Validators.required],
        organization: [this.activeOrganizationCode, Validators.required],
        users: [null, Validators.required],
        roles: [null, Validators.required],
        units: [null, Validators.required],
        allUnitsList: [null, Validators.required],
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private contractService: ContractService,
        public dialogRef: MatDialogRef<any>,
        private alertService: AlertService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.checkForEditMode();
        this.getOrganizationUsers();
        this.getOrganizationUnits();
        this.getOrganizationRoles('allRoles');
        this.form.get('allUnitsList').valueChanges.subscribe(() => this.getOrganizationRoles('roleBasedOnUnit'));
        this.getContractTypeForms();
    }

    private checkForEditMode(): void {
        this.isEditMode = !!this.data;
        this.isEditMode ? (this.title = 'ویرایش نوع قرارداد') : (this.title = 'افزودن نوع قرارداد');
        if (this.isEditMode) this.form.get('name').setValue(this.data.name);
    }

    private getOrganizationUsers(): void {
        this.userService.getUsers([`${this.activeOrganizationCode}`]).subscribe((response) => (this.users = response.items));
    }

    private getOrganizationRoles(type: 'roleBasedOnUnit' | 'allRoles'): void {
        let unitIds: Array<number>;
        type === 'roleBasedOnUnit' ? (unitIds = this.form.get('allUnitsList').value) : (unitIds = []);
        this.userService.getOrganizationRoles(this.activeOrganizationCode, unitIds).subscribe((response) => {
            type === 'roleBasedOnUnit' ? (this.rolesOnSpecificUnit = response) : (this.allRolesList = response);
            console.log(this.rolesOnSpecificUnit);
        });
    }

    private getOrganizationUnits(): void {
        this.userService.getOrganizationUnits([this.activeOrganizationCode]).subscribe((response) => (this.units = response));
    }

    public submitForm(): void {
        console.log(this.form.value);
    }

    public searchUser = (searchKey, data): void => {
        setTimeout(() => {
            data.list = this.users.filter((el) => el.fullname.includes(searchKey));
            data.state = searchSelectStateType.PRESENT;
        }, 500);
    };

    private getContractTypeForms(): void {
        this.contractService.getContractTypeForms(this.activeOrganizationCode).subscribe((response) => (this.contractTypeForms = response));
    }
}
