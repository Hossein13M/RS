import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FundRoleService } from 'app/services/feature-services/system-setting-services/fund-role.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BourseBoardSettingAddComponent } from '../../bourse-board-setting-components/bourse-board-setting-add/bourse-board-setting-add.component';
import { FundRoleSettingAddComponent } from '../fund-role-setting-add/fund-role-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-fund-role-setting-list',
    templateUrl: './fund-role-setting-list.component.html',
    styleUrls: ['./fund-role-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class FundRoleSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public fundRoleService: FundRoleService) {}

    ngOnInit(): void {
        this.initColumn();
        this.initSearch();
        this.get();
    }

    initColumn(): void {
        this.column = [
            {
                name: 'نام',
                id: 'name',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'تلفن',
                id: 'phone',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'شماره ثبت',
                id: 'regNumber',
                type: 'string',
                minWidth: '70px',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'نام نماینده',
                id: 'agentName',
                type: 'string',
                minWidth: '70px',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'تلفن نماینده',
                id: 'agentPhone',
                type: 'string',
                minWidth: '70px',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'کد ملی',
                id: 'nationalId',
                type: 'string',
                minWidth: '70px',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'کد ملی',
                id: 'nationalId',
                type: 'string',
                minWidth: '70px',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                name: 'آدرس',
                id: 'address',
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
        if (!searchFilter) {
            return;
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });

        this.fundRoleService.specificationModel.searchKeyword = searchFilter;
        this.fundRoleService.specificationModel.skip = 0;
        this.get();
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.fundRoleService.specificationModel.limit = pageEvent.limit;
        this.fundRoleService.specificationModel.skip = pageEvent.skip;
        this.get();
    }

    get(): void {
        this.fundRoleService.getWithPaging().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.fundRoleService.setPageDetailData(res);
        });
    }

    add(): void {
        this.matDialog
            .open(FundRoleSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    delete(row): void {
        console.log(row);
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.fundRoleService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(BourseBoardSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
