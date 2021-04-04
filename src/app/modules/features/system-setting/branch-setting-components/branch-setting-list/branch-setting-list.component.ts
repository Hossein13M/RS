import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BranchSettingService } from 'app/services/feature-services/system-setting-services/branch-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BranchSettingAddComponent } from '../branch-setting-add/branch-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table-consts';
import * as _ from 'lodash';

@Component({
    selector: 'app-branch-setting-list',
    templateUrl: './branch-setting-list.component.html',
    styleUrls: ['./branch-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BranchSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['bankName', 'branchCode', 'branchName', 'operation'];
    searchFormGroup: FormGroup;

    data: any;
    column: Array<ColumnModel>;

    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, public branchService: BranchSettingService) {}

    ngOnInit(): void {
        this.get();
        this.initializeColumns();
    }

    initializeColumns(): void {
        this.column = [
            {
                id: 'bankName',
                name: 'نام بانک',
                type: 'string',
                search: {
                    type: 'select',
                    mode: TableSearchMode.LOCAL,
                },
            },
            {
                id: 'code',
                name: 'کد شعبه',
                type: 'number',
                search: {
                    type: 'text',
                    mode: TableSearchMode.LOCAL,
                },
            },
            {
                id: 'name',
                name: 'نام شعبه',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.LOCAL,
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

    paginationControl(pageEvent: PaginationChangeType): void {
        this.branchService.specificationModel.limit = pageEvent.limit;
        this.branchService.specificationModel.skip = pageEvent.skip;
        this.get();
    }

    get(): void {
        this.branchService.getBankBranch().subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.data = res.items;
            this.pagination.total = res.total;
            this.branchService.setPageDetailData(res);
        });
    }

    add(): void {
        this.matDialog
            .open(BranchSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
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
                    this.branchService.deleteBankBranch(row.id).subscribe((x) => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(BranchSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
