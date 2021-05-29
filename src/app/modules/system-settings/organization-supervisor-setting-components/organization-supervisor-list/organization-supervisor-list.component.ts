import { Column, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { OrganizationSupervisorService } from 'app/services/feature-services/system-setting-services/organization-supervisor.service';
import { ConfirmDialogComponent } from '#shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { OrganizationSupervisorAddComponent } from '../organization-supervisor-add/organization-supervisor-add.component';

@Component({
    selector: 'app-organization-supervisor-list',
    templateUrl: './organization-supervisor-list.component.html',
    styleUrls: ['./organization-supervisor-list.component.scss'],
    animations: [fuseAnimations],
})
export class OrganizationSupervisorListComponent implements OnInit {
    data: any = [];
    column: Array<Column>;

    constructor(private matDialog: MatDialog, public organizationSupervisorService: OrganizationSupervisorService) {}

    ngOnInit(): void {
        this.initColumn();
        this.get();
    }

    initColumn(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام',
                type: 'string',
                search: {
                    mode: TableSearchMode.LOCAL,
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

    get(): void {
        this.organizationSupervisorService.get().subscribe((res: any) => {
            this.data = [...res];
        });
    }

    add(): void {
        this.matDialog
            .open(OrganizationSupervisorAddComponent, {
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
                    this.organizationSupervisorService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(OrganizationSupervisorAddComponent, {
                panelClass: 'dialog-w60',
                data: row,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
