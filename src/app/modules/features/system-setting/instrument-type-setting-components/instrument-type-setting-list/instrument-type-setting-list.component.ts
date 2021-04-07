import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { InstrumentTypeService } from 'app/services/feature-services/system-setting-services/instrument-type.service';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { InstrumentTypeSettingAddComponent } from '../instrument-type-setting-add/instrument-type-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';

@Component({
    selector: 'app-instrument-type-setting-list',
    templateUrl: './instrument-type-setting-list.component.html',
    styleUrls: ['./instrument-type-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class InstrumentTypeSettingListComponent implements OnInit {
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, private fb: FormBuilder, public instrumentTypeService: InstrumentTypeService) {}

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
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'ticker',
                name: 'شناسه نماد',
                type: 'string',
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'type',
                name: 'نوع',
                type: 'string',
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'status',
                name: 'وضعیت',
                type: 'string',
                convert: (value) => (value === 'true' ? 'فعال' : 'غیر فعال'),
                search: {
                    mode: TableSearchMode.LOCAL,
                    type: 'text',
                },
            },
            {
                id: 'symbol',
                name: 'وضعیت',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'isInBourse',
                name: 'محل معامله',
                type: 'string',
                convert: (value) => (value === 'true' ? 'بورس' : 'خارج از بورس'),
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
                ],
            },
        ];
    }

    get(): void {
        this.instrumentTypeService.getInstrumentType().subscribe((res: any) => {
            this.data = res.items;
            this.pagination.total = res.total;
            this.instrumentTypeService.setPageDetailData(res);
        });
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    edit(row): void {
        this.matDialog
            .open(InstrumentTypeSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }
}
