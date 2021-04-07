import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BourseMarketService } from 'app/services/feature-services/system-setting-services/bourse-market.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { BourseMarketSettingAddComponent } from '../bourse-market-setting-add/bourse-market-setting-add.component';
import { ColumnModel, PaginationChangeType } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-bourse-market-setting-list',
    templateUrl: './bourse-market-setting-list.component.html',
    styleUrls: ['./bourse-market-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BourseMarketSettingListComponent implements OnInit {
    data: any = [];
    column: Array<ColumnModel>;

    constructor(private matDialog: MatDialog, public bourseMarketService: BourseMarketService) {}

    ngOnInit(): void {
        this.initColumn();
        this.get();
    }

    initColumn(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام',
                type: 'string'
            },
            {
                id: 'code',
                name: 'کد',
                type: 'string'
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
        ]
    }

    get(): void {
        this.bourseMarketService.get().subscribe((res: any) => {
            this.data = res;
        });
    }

    create(): void {
        this.matDialog
            .open(BourseMarketSettingAddComponent, {
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
                    this.bourseMarketService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(BourseMarketSettingAddComponent, {
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
