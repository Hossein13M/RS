import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { DepositSettingService } from 'app/services/feature-services/system-setting-services/deposit-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { DepositSettingAddComponent } from '../deposit-setting-add/deposit-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-deposit-setting-list',
    templateUrl: './deposit-setting-list.component.html',
    styleUrls: ['./deposit-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class DepositSettingListComponent implements OnInit {
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public depositSettingService: DepositSettingService) {}

    ngOnInit(): void {
        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'accountType',
                name: 'نوع حساب',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'bankName',
                name: 'نام بانک',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'branchCode',
                name: 'کد شعبه',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'branchName',
                name: 'نام شعبه',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'depositNumber',
                name: 'شماره سپرده',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'openingDate',
                name: 'تاریخ افتتاح',
                type: 'date',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'date',
                },
            },
            {
                id: 'interestRate',
                name: 'نرخ سود',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'glCode',
                name: 'کد سطح GL',
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
                        operation: ({ row }: any) => this.update(row),
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

    paginationControl(pageEvent: PaginationChangeType): void {
        this.depositSettingService.specificationModel.limit = pageEvent.limit;
        this.depositSettingService.specificationModel.skip = pageEvent.skip;
        this.get();
    }

    get(): void {
        this.depositSettingService.get().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.depositSettingService.setPageDetailData(res);
        });
    }

    create(): void {
        this.matDialog
            .open(DepositSettingAddComponent, {
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
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.depositSettingService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    update(row): void {
        this.matDialog
            .open(DepositSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
