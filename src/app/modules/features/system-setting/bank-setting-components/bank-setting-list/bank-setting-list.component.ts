import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { BankService } from 'app/services/feature-services/bank.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BankSettingAddComponent } from '../bank-setting-add/bank-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-bank-setting-list',
    templateUrl: './bank-setting-list.component.html',
    styleUrls: ['./bank-setting-list.component.scss'],
    animations: [fuseAnimations]
})
export class BankSettingListComponent implements OnInit {
    searchFormGroup: FormGroup;
    data: any = [];
    column: Array<ColumnModel>;

    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, private formBuilder: FormBuilder, public bankService: BankService) {
    }

    ngOnInit(): void {
        this.initColumns();
        this.initSearch();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                name: 'نام بانک',
                id: 'name',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER
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
                        operation: ({ row }: any) => this.update(row)
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
        });
        this.searchFormGroup = this.formBuilder.group({
            ...objectFromKeys
        });
    }

    search(searchFilter: any): void {
        if (!searchFilter) {
            return;
        }

        Object.keys(searchFilter).forEach((key) => {
            this.searchFormGroup.controls[key].setValue(searchFilter[key]);
        });

        this.bankService.specificationModel.searchKeyword = searchFilter;
        this.bankService.specificationModel.skip = 0;
        this.get();
    }


    paginationControl(pageEvent: PaginationChangeType): void {
        this.bankService.specificationModel.limit = pageEvent.limit;
        this.bankService.specificationModel.skip = pageEvent.skip * pageEvent.limit;
        this.get();
    }

    get(): void {
        this.bankService.get().subscribe((res: any) => {
            this.data = [...res.items];
            this.pagination.limit = res.limit;
            this.pagination.total = res.total;
            this.bankService.setPageDetailData(res);
        });
    }

    create(): void {
        this.matDialog
            .open(BankSettingAddComponent, {
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
                    this.bankService.delete(row.id).subscribe((x) => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    update(row): void {
        this.matDialog
            .open(BankSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    row.name = res.name;
                }
            });
    }
}
