import { Column, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { NewInstrumentService } from 'app/services/feature-services/system-setting-services/new-instrument.service';
import { ConfirmDialogComponent } from '#shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { InstrumentSettingAddComponent } from '../instrument-setting-add/instrument-setting-add.component';

@Component({
    selector: 'app-instrument-setting-list',
    templateUrl: './instrument-setting-list.component.html',
    styleUrls: ['./instrument-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class InstrumentSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<Column>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public newInstrumentService: NewInstrumentService) {}

    ngOnInit(): void {
        this.initColumn();
        this.initSearch();
        this.get();
    }

    private initColumn(): void {
        this.column = [
            { name: 'نام', id: 'name', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            { name: 'شماره ثبت', id: 'nameEn', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            { name: 'نماد', id: 'symbol', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            { name: 'نماد انگلیسی', id: 'symbolEn', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            {
                name: 'وضعیت',
                id: 'isActive',
                type: 'string',
                convert: (value) => (value === 'true' ? 'فعال' : 'غیر فعال'),
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'select',
                    options: [
                        { name: 'فعال', value: 'true' },
                        { name: 'غیرفعال', value: 'false' },
                    ],
                },
            },
            { name: 'کد نوع', id: 'type', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            {
                name: 'محل معامله',
                id: 'isInBourse',
                type: 'string',
                convert: (value) => (value === 'true' ? 'بورس' : 'خارج از بورس'),
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'select',
                    options: [
                        { name: 'بورس', value: 'true' },
                        { name: 'خارج از بورس', value: 'false' },
                    ],
                },
            },
            { name: 'تابلو', id: 'boardName', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            { name: 'بازار', id: 'marketName', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.edit(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
                ],
            },
        ];
    }

    private initSearch(): void {
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
        this.newInstrumentService.getInstruments(this.pagination, search).subscribe((res: any) => {
            this.pagination.limit = res.limit;
            this.pagination.total = res.total;
            this.data = [...res.items];
        });
    }

    add(): void {
        this.matDialog
            .open(InstrumentSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((response) => {
                if (response) this.get();
            });
    }

    delete(row): void {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.newInstrumentService
                        .deleteInstrument(row.id, row.isInBourse)
                        .subscribe(() => (this.data = this.data.filter((el) => el.id !== row.id)));
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(InstrumentSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) _.assign(row, res);
            });
    }
}
