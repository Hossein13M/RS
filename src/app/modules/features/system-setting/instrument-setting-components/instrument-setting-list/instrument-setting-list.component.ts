import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { NewInstrumentService } from 'app/services/feature-services/system-setting-services/new-instrument.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { InstrumentSettingAddComponent } from '../instrument-setting-add/instrument-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-instrument-setting-list',
    templateUrl: './instrument-setting-list.component.html',
    styleUrls: ['./instrument-setting-list.component.scss'],
    animations: [fuseAnimations]
})
export class InstrumentSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog,
                private formBuilder: FormBuilder,
                public newInstrumentService: NewInstrumentService) {
    }

    ngOnInit(): void {
        this.initColumn();
        this.initSearch();
        this.get();
    }

    private initColumn(): void {
        this.column = [
            {
                name: 'نام',
                id: 'name',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
            },
            {
                name: 'شماره ثبت',
                id: 'nameEn',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
            },
            {
                name: 'نماد',
                id: 'symbol',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
            },
            {
                name: 'نماد انگلیسی',
                id: 'symbolEn',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
            },
            {
                name: 'وضعیت',
                id: 'isActive',
                type: 'string',
                convert: (value) => (value === 'true' ? 'فعال' : 'غیر فعال'),
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'select',
                    options: [
                        {
                            name: 'فعال',
                            value: 'true'
                        },
                        {
                            name: 'غیرفعال',
                            value: 'false'
                        }
                    ]
                }
            },
            {
                name: 'کد نوع',
                id: 'type',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
            },
            {
                name: 'محل معامله',
                id: 'isInBourse',
                type: 'string',
                convert: (value) => (value === 'true' ? 'بورس' : 'خارج از بورس'),
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'select',
                    options: [
                        {
                            name: 'بورس',
                            value: 'true'
                        },
                        {
                            name: 'خارج از بورس',
                            value: 'false'
                        }
                    ]
                }
            },
            {
                name: 'تابلو',
                id: 'boardName',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
            },
            {
                name: 'بازار',
                id: 'marketName',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text'
                }
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
                        operation: ({ row }: any) => this.edit(row)
                    },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: ({ row }: any) => this.delete(row)
                    }
                ]
            }
        ];
    }

    initSearch(): void {
        const mapKeys = _.dropRight(_.map(this.column, 'id'));
        const objectFromKeys = {};
        mapKeys.forEach((id) => {
            objectFromKeys[id] = '';
        })
        this.searchFormGroup = this.formBuilder.group({
            ...objectFromKeys
        })
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });

        this.newInstrumentService.specificationModel.searchKeyword = searchFilter;
        this.newInstrumentService.specificationModel.skip = 0;
        this.get();
    }


    paginationControl(pageEvent: PaginationChangeType): void {
        this.newInstrumentService.specificationModel.limit = pageEvent.limit;
        this.newInstrumentService.specificationModel.skip = pageEvent.skip * pageEvent.limit;
        this.get();
    }

    get(): void {
        this.newInstrumentService.get().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.limit = res.limit;
            this.pagination.total = res.total;
            this.pagination.limit = res.limit;
            this.newInstrumentService.setPageDetailData(res);
        });
    }

    add(): void {
        this.matDialog
            .open(InstrumentSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: null
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
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' }
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.newInstrumentService.delete(row.id, row.isInBourse).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(InstrumentSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
