import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization, User } from '../../user.model';
import { UserService } from '../../user.service';
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators";

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

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(public dialogRef: MatDialogRef<UserBatchComponent>, private formBuilder: FormBuilder, private userService: UserService) {}

    ngOnInit(): void {
        this.basicFormInit();
        this.organizationFormInit();
        this.getOrganizations();
        this.organizationsSearchInit();
    }

    private basicFormInit(): void {
        this.basicForm = this.formBuilder.group({
            username: [this.data?.username ?? '', Validators.required],
            password: [this.data?.password ?? '', Validators.required],
            firstname: [this.data?.firstname ?? '', Validators.required],
            lastname: [this.data?.lastname ?? '', Validators.required],
            nationalCode: [this.data?.nationalCode ?? '', Validators.required],
            personnelCode: [this.data?.personnelCode ?? '', Validators.required],
            phoneNumber: [this.data?.phoneNumber ?? ''],
            email: [this.data?.email ?? ''],
            birthDate: [this.data?.birthDate ?? ''],
        });
    }

    private organizationFormInit(): void {
        this.organizationForm = this.formBuilder.group({
            organization: [this.data?.organization ?? null, Validators.required],
            organizationRole: [this.data?.organizationRole ?? ''],
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

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
