import { ColumnModel } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { BourseBoardService } from 'app/services/feature-services/system-setting-services/bourse-board.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { BourseBoardSettingAddComponent } from '../bourse-board-setting-add/bourse-board-setting-add.component';

@Component({
    selector: 'app-bourse-board-setting-list',
    templateUrl: './bourse-board-setting-list.component.html',
    styleUrls: ['./bourse-board-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BourseBoardSettingListComponent implements OnInit {
    data: any = [];
    column: Array<ColumnModel>;

    constructor(private matDialog: MatDialog, private bourseBoardService: BourseBoardService) {}

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
            },
            {
                id: 'code',
                name: 'کد',
                type: 'string',
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
        this.bourseBoardService.get().subscribe((res: any) => {
            this.data = [...res];
        });
    }

    add(): void {
        this.matDialog
            .open(BourseBoardSettingAddComponent, {
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
                    this.bourseBoardService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(BourseBoardSettingAddComponent, {
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
