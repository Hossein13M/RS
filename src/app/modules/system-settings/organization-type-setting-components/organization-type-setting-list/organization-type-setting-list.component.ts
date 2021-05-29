import { Column, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { OrganizationTypeService } from 'app/services/feature-services/system-setting-services/organization-type.service';
import { ConfirmDialogComponent } from '#shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { OrganizationTypeSettingAddComponent } from '../organization-type-setting-add/organization-type-setting-add.component';

@Component({
    selector: 'app-organization-type-setting-list',
    templateUrl: './organization-type-setting-list.component.html',
    styleUrls: ['./organization-type-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class OrganizationTypeSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<Column>;

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public organizationTypeService: OrganizationTypeService) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    {
                        name: 'ویرایش',
                        icon: 'create',
                        color: 'accent',
                        operation: ({ row }: any) => this.edit(row),
                    },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: ({ row }: any) => this.delete(row),
                    },
                ],
            },
        ];
    }

    initSearch(): void {
        const mapKeys = _.dropRight(_.map(this.column, 'id'));
        const objectFromKeys = {};
        mapKeys.forEach((id) => {
            objectFromKeys[id] = '';
        });
        this.searchFormGroup = this.formBuilder.group({
            ...objectFromKeys,
        });
    }

    search(searchFilter: any): void {
        if (!searchFilter) return;
        Object.keys(searchFilter).forEach((key) => this.searchFormGroup.controls[key].setValue(searchFilter[key]));
        this.get(this.searchFormGroup.value);
    }

    get(search?: any): void {
        this.organizationTypeService.getOrganizationType(search).subscribe((res: any) => {
            this.data = [...res];
        });
    }

    add(): void {
        this.matDialog
            .open(OrganizationTypeSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: null,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(row): void {
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.organizationTypeService.deleteOrganizationType(row.id).subscribe(() => {
                        this.get();
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(OrganizationTypeSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }
}
