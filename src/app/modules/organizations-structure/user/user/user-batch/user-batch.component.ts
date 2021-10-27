import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization, Roles, Units, User, UserRole } from '../../user.model';
import { UserService } from '../../user.service';
import { forkJoin, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { phoneNumberValidator } from '#shared/validators/phoneNumber/phoneNumberValidator';
import * as _ from 'lodash';
import { AlertService } from '#shared/services/alert.service';

@Component({
    selector: 'app-user-batch',
    templateUrl: './user-batch.component.html',
    styleUrls: ['./user-batch.component.scss'],
})
export class UserBatchComponent implements OnInit, OnDestroy {
    public userData: User;
    public form: FormGroup;
    public userOrganizationControlsData: Array<{
        organizationsSearchControl: FormControl;
        organizations: Array<Organization>;
        units: Units;
        roles: Array<Roles>;
    }> = [];
    private defaultOrganizations: Array<Organization> = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public dialogRef: MatDialogRef<UserBatchComponent>,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        @Inject(MAT_DIALOG_DATA) public passedId: number | null
    ) {}

    public get userOrganizations(): FormArray {
        return this.form.get('userRoles') as FormArray;
    }

    ngOnInit(): void {
        this.formInit();
        this.defaultOrganizationsInit();
    }

    public addOrganization(): void {
        this.userOrganizations.push(
            this.formBuilder.group({
                personnelCode: ['', Validators.required],
                organizationId: ['', Validators.required],
                organizationCode: ['', Validators.required],
                units: [[], Validators.required],
                roles: [[], Validators.required],
            })
        );

        this.userOrganizationControlsData.push({
            organizationsSearchControl: new FormControl(''),
            organizations: this.defaultOrganizations,
            units: null,
            roles: [],
        });

        this.onSearchOrganizationSearchChange(this.userOrganizationControlsData.length - 1);
        this.onOrganizationCodeChange(this.userOrganizationControlsData.length - 1);
        // this.onUnitsChange(this.userRoleControlsData.length - 1);
    }

    public addExistingOrganization(userRoles: UserRole): void {
        forkJoin({
            units: this.userService.getOrganizationUnits([userRoles.organizationCode]),
            roles: this.userService.getOrganizationRoles(userRoles.organizationCode, userRoles.units),
        }).subscribe((response: { units: Units; roles: Array<Roles> }) => {
            this.userOrganizationControlsData.push({
                organizationsSearchControl: new FormControl(''),
                organizations: this.defaultOrganizations,
                units: response.units,
                roles: response.roles,
            });

            this.userOrganizations.push(
                this.formBuilder.group({
                    personnelCode: [userRoles.personnelCode, Validators.required],
                    organizationId: [userRoles.organizationId, Validators.required],
                    organizationCode: [userRoles.organizationCode, Validators.required],
                    units: [userRoles.units, Validators.required],
                    roles: [userRoles.roles, Validators.required],
                })
            );

            this.onSearchOrganizationSearchChange(this.userOrganizationControlsData.length - 1);
            this.onOrganizationCodeChange(this.userOrganizationControlsData.length - 1);
            this.onUnitsChange(this.userOrganizationControlsData.length - 1);
        });
    }

    public deleteOrganization(index: number): void {
        this.userOrganizationControlsData.splice(index, 1);
        this.userOrganizations.removeAt(index);
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.alertService.onError('لطفا ورودی های خود را چک کنید.');
            return;
        }

        this.isUpdate() ? this.updateUser() : this.createUser();
    }

    public closeDialog(): void {
        this.dialogRef.close(false);
    }

    public isUpdate(): boolean {
        return !!this.passedId;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private formInit(): void {
        this.form = this.formBuilder.group({
            username: [this.userData?.username ?? '', Validators.required],
            firstname: [this.userData?.firstname ?? '', Validators.required],
            lastname: [this.userData?.lastname ?? '', Validators.required],
            nationalCode: [this.userData?.nationalCode ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            phoneNumber: [this.userData?.phoneNumber ?? '', [Validators.required, phoneNumberValidator()]],
            email: [this.userData?.email ?? '', [Validators.required, Validators.email]],
            birthDate: [this.userData?.birthDate ?? '', Validators.required],
            userRoles: this.formBuilder.array([], [Validators.required]),
        });
    }

    private defaultOrganizationsInit(): void {
        this.userService.getOrganizations().subscribe((response) => {
            this.defaultOrganizations = response.items;
            this.userRolesInit();
        });
    }

    private userRolesInit(): void {
        this.isUpdate() ? this.setUserRolesData() : this.addOrganization();
    }

    private setUserRolesData(): void {
        this.userService.getUsers([], null, { id: this.passedId }).subscribe((response) => {
            this.userData = response.items[0];
            this.formInit();
            const { userRoles } = this.userData;
            for (const role of userRoles) {
                this.addExistingOrganization(role);
            }
        });
    }

    private onSearchOrganizationSearchChange(index: number): void {
        const { organizationsSearchControl, organizations } = this.userOrganizationControlsData[index];
        organizationsSearchControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                mergeMap((value: string) => this.userService.getOrganizations(value))
            )
            .subscribe((response) => setOrganization(response.items));

        function setOrganization(values: Array<Organization>): void {
            organizations.splice(0, organizations.length);
            organizations.push(...values);
        }
    }

    private onOrganizationCodeChange(index: number): void {
        const { controls } = this.form.get('userRoles') as FormArray;
        const addedForm = controls[index] as FormGroup;

        addedForm.controls['organizationCode'].valueChanges
            .pipe(
                tap((organizationCode: number) => {
                    addedForm.controls['organizationId'].setValue(getOrganizationsId(organizationCode, this.defaultOrganizations));
                }),
                takeUntil(this._unsubscribeAll),
                mergeMap((organizationCode: number) => this.userService.getOrganizationUnits([organizationCode]))
            )
            .subscribe((response) => {
                resetControls();
                this.userOrganizationControlsData[index].units = response;
                this.onUnitsChange(index);
            });

        function getOrganizationsId(organizationCode: number, organizations: Array<Organization>): number {
            const { id } = _.find(organizations, (organization) => organization.code === organizationCode);
            return id;
        }

        function resetControls(): void {
            addedForm.controls['units'].reset([]);
            addedForm.controls['roles'].reset([]);
        }
    }

    private onUnitsChange(index: number): void {
        const { controls } = this.form.get('userRoles') as FormArray;
        const addedForm = controls[index] as FormGroup;
        const { organizationCode } = addedForm.value;

        addedForm.controls['units'].valueChanges.subscribe();

        addedForm.controls['units'].valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                mergeMap((units: Array<number>) => this.userService.getOrganizationRoles(organizationCode, units))
            )
            .subscribe((response) => {
                resetRoleControl();
                this.userOrganizationControlsData[index].roles = response;
            });

        function resetRoleControl(): void {
            addedForm.controls['roles'].reset([]);
        }
    }

    private createUser(): void {
        this.userService.createUser(this.form.value).subscribe(
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
}
