import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GlSettingService } from 'app/modules/features/system-setting/gl-setting-components/gl-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { GlSettingAddComponent } from '../gl-setting-add/gl-setting-add.component';


@Component({
    selector: 'app-gl-setting-list',
    templateUrl: './gl-setting-list.component.html',
    styleUrls: ['./gl-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class GlSettingListComponent implements AfterViewInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<ColumnModel>;
    pagination = { skip: 0, limit: 5, total: 100 };

    @ViewChild('status', { static: false }) statusRef: TemplateRef<any>;

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, private glSettingService: GlSettingService) {}

    ngAfterViewInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            { id: 'symbol', name: 'نماد', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            { id: 'status', name: 'وضعیت', type: 'custom', cellTemplate: this.statusRef },
            { id: 'glCode', name: 'کد دفتر کل', type: 'string', search: { mode: TableSearchMode.SERVER, type: 'text' } },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.update(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
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
        this.glSettingService.getGlSettings(this.pagination, search).subscribe((response: any) => {
            this.data = [...response.items];
            this.pagination.total = response.total;
            this.pagination.limit = response.limit;
        });
    }

    create(): void {
        this.matDialog
            .open(GlSettingAddComponent, { panelClass: 'dialog-w60', data: null })
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
                    this.glSettingService.deleteGlSetting(row.id).subscribe(() => (this.data = this.data.filter((el) => el.id !== row.id)));
                }
            });
    }

    update(row): void {
        this.matDialog
            .open(GlSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) _.assign(row, res);
            });
    }
}
