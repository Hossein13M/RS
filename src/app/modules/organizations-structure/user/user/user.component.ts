import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { UserBatchComponent } from './user-batch/user-batch.component';
import { Organization, User } from '../user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationModel } from '#shared/models/pagination.model';
import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
    public organizations: Array<Organization> = [];
    public organizationsForm: FormGroup;
    public organizationsSearchControl: FormControl = new FormControl();

    public users: Array<User>;
    public columns: Array<Column> = [
        {
            id: 'firstname',
            name: 'نام',
            type: 'string',
            search: { type: 'text', mode: TableSearchMode.SERVER },
        },
        {
            id: 'lastname',
            name: 'نام خانوادگی',
            type: 'string',
            search: { type: 'text', mode: TableSearchMode.SERVER },
        },
        {
            id: 'email',
            name: 'پست الکترونیک',
            type: 'string',
            search: { type: 'text', mode: TableSearchMode.SERVER },
        },
        {
            id: 'nationalCode',
            name: 'کد ملی',
            type: 'string',
            search: { type: 'text', mode: TableSearchMode.SERVER },
        },
        {
            id: 'username',
            name: 'نام کاربری',
            type: 'string',
            search: { type: 'text', mode: TableSearchMode.SERVER },
        },
        {
            id: 'phoneNumber',
            name: 'شماره تماس',
            type: 'string',
        },
        {
            id: 'status',
            name: 'وضعیت',
            type: 'string',
            convert: (value: 'Active' | 'InActive') => (value === 'Active' ? 'فعال' : 'غیر فعال'),
        },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '130px',
            sticky: true,
            operations: [
                { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.editUser(row) },
                { name: 'فعال‌سازی/غیرفعال‌سازی', icon: 'sync_alt', color: 'accent', operation: ({ row }: any) => this.changeUserStatus(row) },
            ],
        },
    ];
    public usersSearchForm: FormGroup;
    public pagination: PaginationModel = { skip: 0, limit: 5, total: 100 };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private userService: UserService, public matDialog: MatDialog, private alertService: AlertService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.organizationsForm = this.formBuilder.group({ organization: [[], Validators.required] });
        this.getOrganizations();
        this.organizationsSearchInit();
        this.onOrganizationCodeChange();
        this.initSearch();
        this.getUsers([]);
    }

    private organizationsSearchInit(): void {
        this.organizationsSearchControl.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((value: string) => {
            this.getOrganizations(value);
        });
    }

    private getOrganizations(searchKeyword?: string): void {
        this.userService.getOrganizations(searchKeyword).subscribe((response) => (this.organizations = response.items));
    }

    private onOrganizationCodeChange(): void {
        this.organizationsForm.controls['organization'].valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe((value: Array<string>) => {
            if (value) {
                this.getUsers(value);
            }
        });
    }

    private initSearch(): void {
        const mapKeys = _.dropRight(_.map(this.columns, 'id'));
        const objectFromKeys = {};
        mapKeys.forEach((id) => (objectFromKeys[id] = ''));
        this.usersSearchForm = this.formBuilder.group({ ...objectFromKeys });
    }

    public search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }
        const organizationId: Array<string> = this.organizationsForm.controls['organization'].value;
        Object.keys(searchFilter).forEach((key) => {
            this.usersSearchForm.controls[key].setValue(searchFilter[key]);
        });
        this.getUsers(organizationId, this.usersSearchForm.value);
    }

    public paginationControl(pageEvent: PaginationChangeType): void {
        const organizationId: Array<string> = this.organizationsForm.controls['organization'].value;
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.getUsers(organizationId);
    }

    private getUsers(organizationIds: Array<string>, search?: any): void {
        this.userService.getUsers(organizationIds, this.pagination, search).subscribe((response) => {
            this.users = response.items;
            this.pagination.total = response.total;
        });
    }

    public createUser(): void {
        const organizationIds: Array<string> = this.organizationsForm.controls['organization'].value;
        this.matDialog
            .open(UserBatchComponent, {
                data: null,
            })
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result: boolean) => {
                if (result) this.getUsers(organizationIds);
            });
    }

    private editUser(user: User): void {
        const organizationIds: Array<string> = this.organizationsForm.controls['organization'].value;
        this.matDialog
            .open(UserBatchComponent, {
                data: user.id,
            })
            .afterClosed()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result: boolean) => {
                if (result) this.getUsers(organizationIds);
            });
    }

    private changeUserStatus(user: User): void {
        this.userService.changeUserStatus(user.id).subscribe(() => this.getUsers([]));
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
