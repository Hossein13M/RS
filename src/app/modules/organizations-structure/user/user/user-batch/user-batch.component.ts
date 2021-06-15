import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization, OrganizationRoles, OrganizationUnits, User } from '../../user.model';
import { UserService } from '../../user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-batch',
    templateUrl: './user-batch.component.html',
    styleUrls: ['./user-batch.component.scss'],
})

/*
* {
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "personnelCode": "string",
  "username": "string",
  "password": "string",
  "phoneNumber": "string",
  "organization": 0,
  "organizationRole": 0,
  "nationalCode": "string",
  "birthDate": "2021-06-15T09:13:13.467Z"
}*/
export class UserBatchComponent implements OnInit, OnDestroy {
    data: User = null;
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
        this.organizationCodeListening();
        this.unitsListening();
    }

    private basicFormInit(): void {
        this.basicForm = this.formBuilder.group({
            username: [this.data?.username ?? '', Validators.required],
            password: [this.data?.password ?? '', Validators.required],
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

    private organizationCodeListening(): void {
        this.organizationForm.controls['organization'].valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((codes: Array<number>) => {
            if (codes[0]) {
                // Todo(backend's sake): units should accept an array instead of single value
                this.getUnits(codes[0]);
            }
        });
    }

    private getUnits(organizationCodes): void {
        this.userService.getOrganizationUnits(organizationCodes).subscribe((response) => {
            this.units = response;
        });
    }

    private unitsListening(): void {
        this.organizationForm.controls['units'].valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((units: Array<number>) => {
            const organizationCode = this.organizationForm.value.organization[0]; // Todo(backend's sake): roles should recive units but we are sending organizationCodes
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
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
