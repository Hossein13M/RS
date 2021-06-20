import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUser, Organization, OrganizationRoles, OrganizationUnits } from '../../user.model';
import { UserService } from '../../user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { matchValidator } from '#shared/validators/match.validator';

@Component({
    selector: 'app-user-batch',
    templateUrl: './user-batch.component.html',
    styleUrls: ['./user-batch.component.scss'],
})
export class UserBatchComponent implements OnInit, OnDestroy {
    data: CreateUser = null;
    public title: string;

    public basicForm: FormGroup;

    public organizationForm: FormGroup;
    public organizationsSearchControl: FormControl = new FormControl();
    public organizations: Array<Organization> = [];
    public units: Array<OrganizationUnits>;
    public roles: Array<OrganizationRoles>;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(public dialogRef: MatDialogRef<UserBatchComponent>, private formBuilder: FormBuilder, private userService: UserService) {}

    ngOnInit(): void {
        this.basicFormInit();
        this.organizationFormInit();
        this.getOrganizations();
        this.organizationsSearchInit();
        this.onOrganizationCodeChange();
        this.onUnitsChange();
        this.passwordChange();

        this.basicForm.controls['phoneNumber'].valueChanges.subscribe((value) => {
            console.log(value);
        });
    }

    private basicFormInit(): void {
        this.basicForm = this.formBuilder.group({
            username: [this.data?.username ?? '', Validators.required],
            password: [this.data?.password ?? '', Validators.required],
            confirmPassword: [this.data?.confirmPassword ?? '', Validators.required],
            firstname: [this.data?.firstname ?? '', Validators.required],
            lastname: [this.data?.lastname ?? '', Validators.required],
            nationalCode: [this.data?.nationalCode ?? '', Validators.required],
            phoneNumber: [this.data?.phoneNumber ?? ''],
            email: [this.data?.email ?? ''],
            birthDate: [this.data?.birthDate ?? ''],
        });
    }

    private organizationFormInit(): void {
        this.organizationForm = this.formBuilder.group({
            personnelCode: [this.data?.personnelCode ?? '', Validators.required],
            organization: [this.data?.organization ?? null, Validators.required],
            units: [[], Validators.required],
            organizationRole: [this.data?.organizationRole ?? null, Validators.required],
        });
    }

    private organizationsSearchInit(): void {
        this.organizationsSearchControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((value: string) => {
            this.getOrganizations(value);
        });
    }

    private getOrganizations(searchKeyword?: string): void {
        this.userService.getOrganizations(searchKeyword).subscribe((response) => {
            this.organizations = response.items;
        });
    }

    private onOrganizationCodeChange(): void {
        this.organizationForm.controls['organization'].valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: Array<number>) => {
            if (codes) {
                this.getUnits(codes);
            }
        });
    }

    private getUnits(organizationCodes): void {
        this.userService.getOrganizationUnits(organizationCodes).subscribe((response) => {
            this.units = response;
        });
    }

    private onUnitsChange(): void {
        this.organizationForm.controls['units'].valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((units: Array<number>) => {
            const organizationCode = this.organizationForm.value.organization;
            if (units[0]) {
                this.getRoles(organizationCode);
            }
        });
    }

    private getRoles(units): void {
        this.userService.getOrganizationRoles(units).subscribe((response) => {
            this.roles = response;
        });
    }

    public onSubmit(): void {
        console.log(this.basicForm.value, this.organizationForm.value);
        const value = {
            ...this.basicForm.value,
            userRoles: [
                {
                    ...this.organizationForm.value,
                    organization: this.organizationForm.value.organization[0],
                    roles: this.organizationForm.value.organizationRole,
                },
            ],
        };
        this.userService.createUser(value).subscribe((response) => {
            console.log(response);
        });
    }

    private passwordChange(): void {
        const passwordControl = this.basicForm.controls['password'];
        const confirmPasswordControl = this.basicForm.controls['confirmPassword'];

        passwordControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((value: string) => {
            confirmPasswordControl.setValidators([Validators.required, matchValidator(value)]);
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
