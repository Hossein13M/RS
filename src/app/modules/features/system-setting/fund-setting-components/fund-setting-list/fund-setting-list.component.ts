import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FundSettingService } from 'app/services/feature-services/system-setting-services/fund-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { FundSettingAddComponent } from '../fund-setting-add/fund-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-fund-setting-list',
    templateUrl: './fund-setting-list.component.html',
    styleUrls: ['./fund-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class FundSettingListComponent implements OnInit {
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, public fundSettingService: FundSettingService) {}

    ngOnInit(): void {
        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام',
                type: 'string',
                minWidth: '20ch',
                convert: (value: string) => _.truncate(value, { length: 17, omission: '...' }),
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'code',
                name: 'کد',
                type: 'string',
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'fundTypeId',
                name: 'نوع',
                type: 'string',
                minWidth: '10ch',
                convert: (value: unknown): string => (value ? 'فعال' : 'غیر فعال'),
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'select',
                },
            },
            {
                id: 'etf',
                name: 'وضعیت',
                type: 'string',
                convert: (value: boolean): string => (value ? 'دارد' : 'ندارد'),
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'select',
                },
            },
            {
                id: 'benefitGuarantor',
                name: 'ضامن سود',
                type: 'string',
                minWidth: '70px',
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'liquidityGuarantor',
                name: 'ضامن نقدشوندگی',
                minWidth: '150px',
                type: 'string',
                convert: (value: { name: string }) => value?.name,
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'marketers',
                name: 'بازارگردان',
                type: 'string',
                minWidth: '170px',
                convert: (value: Array<{ name: string }>) => {
                    const marketersNames = _.map(value, (marketer) => marketer.name);
                    return _.join(marketersNames, ', ');
                },
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'truster',
                name: 'متولی',
                minWidth: '30ch',
                convert: (value: { name: string }) => _.truncate(value?.name, { length: 25, omission: '...' }),
                type: 'string',
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'registerManagements',
                name: 'مدیر ثبت',
                type: 'string',
                minWidth: '170px',
                convert: (value: Array<{ name: string }>) => {
                    const marketersNames = _.map(value, (marketer) => marketer.name);
                    return _.join(marketersNames, ', ');
                },
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'investmentManagement',
                name: 'مدیر سرمایه گذاری',
                type: 'string',
                convert: (value: { name: string }) => value?.name,
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'nationalId',
                name: 'شناسه ملی',
                type: 'string',
                convert: (value: { name: string }) => value?.name,
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

    paginationControl(pageEvent: PaginationChangeType): void {
        this.fundSettingService.specificationModel.limit = pageEvent.limit;
        this.fundSettingService.specificationModel.skip = pageEvent.skip;
        this.get();
    }

    get(): void {
        this.fundSettingService.getAll().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.fundSettingService.setPageDetailData(res);
            console.log(this.data[0]);
        });
    }

    add(): void {
        this.matDialog
            .open(FundSettingAddComponent, { panelClass: 'dialog-w80', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    delete(row): void {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.fundSettingService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(FundSettingAddComponent, { panelClass: 'dialog-w80', data: row })
            .afterClosed()
            .subscribe((res) => {
                _.assign(row, res);
            });
    }
}
