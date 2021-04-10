import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { MarketSettingService } from 'app/services/feature-services/system-setting-services/market-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { TableSearchMode } from '#shared/components/table/table.model';
import { MarketSettingAddComponent } from '../market-setting-add/market-setting-add.component';

@Component({
    selector: 'app-market-setting-list',
    templateUrl: './market-setting-list.component.html',
    styleUrls: ['./market-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class MarketSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;

    isWorking: any;

    data = [];
    columns: Array<any>;

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public marketSettingService: MarketSettingService) {
        // Init Table Columns
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
                convert: (value: any) => {
                    return value === 'T' ? 'تمدن' : value === 'M' ? 'بازارگردانی' : value === 'F' ? 'صندوق' : '';
                },
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
                convert: (value: any) => {
                    return value ? 'دارد' : 'ندارد';
                },
            },
            {
                name: 'نام کاربری',
                id: 'username',
                type: 'string',
                convert: (value: any) => {
                    return value ? value : '-';
                },
            },
            {
                name: 'رمز عبور',
                id: 'password',
                type: 'string',
                convert: (value: any) => {
                    return value ? value : '-';
                },
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

        // Init Table Search Form
        this.searchFormGroup = this.fb.group({
            organizationType: '',
            bourseCode: '',
            nationalId: '',
            pamCode: '',
            apiActive: '',
            symbolORFundTitle: '',
            isBOC: '',
            brokerName: '',
            username: '',
            password: '',
        });
    }

    ngOnInit(): void {
        this.get();
    }

    get(): void {
        this.marketSettingService.getAllMarkets(this).subscribe((res: any) => {
            this.data = [...res.items];
            this.marketSettingService.setPageDetailData(res);
        });
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });

        this.marketSettingService.specificationModel.searchKeyword = searchFilter;
        this.marketSettingService.specificationModel.skip = 0;
        this.get();
    }

    add(): void {
        this.matDialog
            .open(MarketSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(element): void {
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.marketSettingService.deleteMarket(element.ticker, this).subscribe(() => this.get());
                }
            });
    }

    edit(element): void {
        this.matDialog
            .open(MarketSettingAddComponent, { panelClass: 'dialog-w60', data: element })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    pageHandler(e: PagingEvent): void {
        this.marketSettingService.specificationModel.limit = e.pageSize;
        this.marketSettingService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    handleError(): boolean {
        return false;
    }
}
