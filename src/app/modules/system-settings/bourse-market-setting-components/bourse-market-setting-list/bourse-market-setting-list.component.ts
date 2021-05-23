import { Column, TableSearchMode } from '#shared/components/table/table.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { BourseMarketService } from 'app/services/feature-services/system-setting-services/bourse-market.service';
import { ConfirmDialogComponent } from '#shared/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import { BourseMarketSettingAddComponent } from '../bourse-market-setting-add/bourse-market-setting-add.component';

@Component({
    selector: 'app-bourse-market-setting-list',
    templateUrl: './bourse-market-setting-list.component.html',
    styleUrls: ['./bourse-market-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BourseMarketSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<Column>;

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public bourseMarketService: BourseMarketService) {}

    ngOnInit(): void {
        this.initColumn();
        this.initSearch();
        this.get();
    }

    initColumn(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER,
                },
            },
            {
                id: 'code',
                name: 'کد',
                type: 'string',
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
        mapKeys.forEach((id) => (objectFromKeys[id] = ''));
        this.searchFormGroup = this.formBuilder.group({ ...objectFromKeys });
    }

    search(searchFilter: any): void {
        if (!searchFilter) return;
        Object.keys(searchFilter).forEach((key) => this.searchFormGroup.controls[key].setValue(searchFilter[key]));
        this.get(this.searchFormGroup.value);
    }

    get(search?): void {
        this.bourseMarketService.getBourses(search).subscribe((res: any) => {
            this.data = [...res];
        });
    }

    create(): void {
        this.matDialog
            .open(BourseMarketSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: null,
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
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.bourseMarketService.deleteBourse(row.id).subscribe(() => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(BourseMarketSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
