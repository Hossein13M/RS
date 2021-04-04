import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BankService } from 'app/services/feature-services/bank.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BankSettingAddComponent } from '../bank-setting-add/bank-setting-add.component';
import { ColumnModel, PaginationChangeType, TableSearchMode } from '#shared/components/table/table-consts';

@Component({
    selector: 'app-bank-setting-list',
    templateUrl: './bank-setting-list.component.html',
    styleUrls: ['./bank-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BankSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'operation'];

    data: any;
    column: Array<ColumnModel>;

    pagination = { skip: 0, limit: 5, total: 100 };

    constructor(private matDialog: MatDialog, public bankService: BankService) {}

    ngOnInit(): void {
        this.get();

        this.column = [
            {
                name: 'نام بانک',
                id: 'name',
                type: 'string',
                search: {
                    type: 'text',
                    mode: TableSearchMode.SERVER,
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

    get(): void {
        this.bankService.getAllBank().subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.data = res.items;
            this.bankService.setPageDetailData(res);
        });
    }

    paginationControl(pageEvent: PaginationChangeType): void {
        this.pagination.limit = pageEvent.limit;
        this.pagination.skip = pageEvent.skip;
        this.get();
    }

    add(): void {
        this.matDialog
            .open(BankSettingAddComponent, {
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
                    this.bankService.deleteBank(row.id).subscribe((x) => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    edit(row): void {
        this.matDialog
            .open(BankSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: row,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    row.name = res.name;
                }
            });
    }
}
