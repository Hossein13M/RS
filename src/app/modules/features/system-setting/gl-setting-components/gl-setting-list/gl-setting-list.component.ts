import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GlSettingService } from 'app/services/feature-services/system-setting-services/gl-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { GlSettingAddComponent } from '../gl-setting-add/gl-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-gl-setting-list',
    templateUrl: './gl-setting-list.component.html',
    styleUrls: ['./gl-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class GlSettingListComponent implements AfterViewInit {
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    @ViewChild('status', { static: false }) statusRef: TemplateRef<any>;

    constructor(private matDialog: MatDialog, public glSettingService: GlSettingService) {}

    ngAfterViewInit(): void {
        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'symbol',
                name: 'نماد',
                type: 'string',
                search: {
                    mode: TableSearchMode.SERVER,
                    type: 'text',
                },
            },
            {
                id: 'status',
                name: 'وضعیت',
                type: 'custom',
                cellTemplate: this.statusRef,
            },
            {
                id: 'glCode',
                name: 'کد دفتر کل',
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
                        operation: ({ row }: any) => this.update(row),
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
        this.glSettingService.specificationModel.limit = pageEvent.limit;
        this.glSettingService.specificationModel.skip = pageEvent.skip;
        this.get();
    }

    get(): void {
        this.glSettingService.get().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.total = res.total;
            this.glSettingService.setPageDetailData(res);
        });
    }

    create(): void {
        this.matDialog
            .open(GlSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(row): void {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.glSettingService.delete(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    update(row): void {
        this.matDialog
            .open(GlSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
