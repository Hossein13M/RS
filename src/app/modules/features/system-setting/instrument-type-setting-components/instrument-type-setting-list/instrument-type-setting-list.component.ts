import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { InstrumentTypeService } from 'app/services/feature-services/system-setting-services/instrument-type.service';
import { InstrumentTypeSettingAddComponent } from '../instrument-type-setting-add/instrument-type-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-instrument-type-setting-list',
    templateUrl: './instrument-type-setting-list.component.html',
    styleUrls: ['./instrument-type-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class InstrumentTypeSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public instrumentTypeService: InstrumentTypeService) {}

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
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

        this.instrumentTypeService.specificationModel.searchKeyword = searchFilter;
        this.instrumentTypeService.specificationModel.skip = 0;
        this.get();
    }

    get(): void {
        this.instrumentTypeService.getInstrumentType().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.instrumentTypeService.setPageDetailData(res);
        });
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.instrumentTypeService.specificationModel.limit = pageEvent.limit;
        this.instrumentTypeService.specificationModel.skip = pageEvent.skip;
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
