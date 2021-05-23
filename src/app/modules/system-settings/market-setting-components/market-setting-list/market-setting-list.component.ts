import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { MarketSettingService } from 'app/services/feature-services/system-setting-services/market-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { MarketSettingAddComponent } from '../market-setting-add/market-setting-add.component';

@Component({
    selector: 'app-market-setting-list',
    templateUrl: './market-setting-list.component.html',
    styleUrls: ['./market-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class MarketSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    pagination = { skip: 0, limit: 5, total: 100 };
    data = [];
    columns: Array<Column>;

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public marketSettingService: MarketSettingService) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.columns = [
            {
                name: 'نوع',
                id: 'organizationType',
                type: 'string',
                search: {
                    type: 'select',
                    options: [
                        { name: 'بازارگردانی', value: 'M' },
                        { name: 'تمدن', value: 'T' },
                        { name: 'صندوق', value: 'F' },
                    ],
                    mode: TableSearchMode.SERVER,
                },
                convert: (value: any) => (value === 'T' ? 'تمدن' : value === 'M' ? 'بازارگردانی' : value === 'F' ? 'صندوق' : ''),
            },
            { name: 'نماد/عنوان صندوق', id: 'symbolORFundTitle', type: 'string', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'کارگزاری', id: 'brokerName', type: 'string', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'کد بورسی', id: 'bourseCode', type: 'string', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'شناسه ملی', id: 'nationalId', type: 'string', search: { type: 'text', mode: TableSearchMode.SERVER } },
            { name: 'کد پم', id: 'pamCode', type: 'string', search: { type: 'text', mode: TableSearchMode.SERVER } },
            {
                name: 'دریافت داده',
                id: 'apiActive',
                type: 'string',
                search: {
                    type: 'select',
                    options: [
                        { name: 'فعال', value: true },
                        { name: 'غیر فغال', value: false },
                    ],
                    mode: TableSearchMode.SERVER,
                },
                convert: (value: any) => (value ? 'دارد' : 'ندارد'),
            },
            {
                name: 'نام کاربری',
                id: 'username',
                type: 'string',
                convert: (value: any) => (value ? value : '-'),
            },
            {
                name: 'رمز عبور',
                id: 'password',
                type: 'string',
                convert: (value: any) => (value ? value : '-'),
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'edit', color: 'accent', operation: ({ row }: any) => this.edit(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
                ],
            },
        ];
    }

    initSearch(): void {
        const mapKeys = _.dropRight(_.map(this.columns, 'id'));
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
        this.marketSettingService.getAllMarkets(this.pagination, search).subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.pagination.limit = res.limit;
        });
    }

    add(): void {
        this.matDialog
            .open(MarketSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }

    delete(element): void {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.marketSettingService.deleteMarket(element.ticker).subscribe(() => this.get());
            });
    }

    edit(element): void {
        this.matDialog
            .open(MarketSettingAddComponent, { panelClass: 'dialog-w60', data: element })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.get();
            });
    }
}
