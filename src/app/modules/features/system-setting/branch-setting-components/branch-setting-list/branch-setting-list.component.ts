import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { BranchSettingService } from 'app/services/feature-services/system-setting-services/branch-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { BranchSettingAddComponent } from '../branch-setting-add/branch-setting-add.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-branch-setting-list',
    templateUrl: './branch-setting-list.component.html',
    styleUrls: ['./branch-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BranchSettingListComponent implements OnInit {
    data: any;
    column: Array<ColumnModel>;
    searchFormGroup: FormGroup;

    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, public branchService: BranchSettingService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.get();
        this.initColumns();
        this.initSearch();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'bankName',
                name: 'نام بانک',
                type: 'string',
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
                        operation: ({ row }: any) => this.put(row),
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
        mapKeys.forEach((id) => (objectFromKeys[id] = ''));
        this.searchFormGroup = this.formBuilder.group({ ...objectFromKeys });
    }

    search(searchFilter: any): void {
        if (!searchFilter) return;
        Object.keys(searchFilter).forEach((key) => this.searchFormGroup.controls[key].setValue(searchFilter[key]));
        this.get(this.searchFormGroup.value);
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    get(search?: any): void {
        this.branchService.getBankBranch(this.pagination, search).subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.pagination.limit = res.limit;
        });
    }

    post(): void {
        this.matDialog
            .open(BranchSettingAddComponent, { panelClass: 'dialog-w60', data: null })
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
                    this.branchService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    put(row): void {
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
