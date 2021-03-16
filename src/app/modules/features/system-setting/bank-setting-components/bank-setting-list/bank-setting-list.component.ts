import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BankService } from 'app/services/feature-services/bank.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { BankSettingAddComponent } from '../bank-setting-add/bank-setting-add.component';

@Component({
    selector: 'app-bank-setting-list',
    templateUrl: './bank-setting-list.component.html',
    styleUrls: ['./bank-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BankSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'operation'];
    nameSearchCtrl = new FormControl();

    pageHandler(e: PagingEvent) {
        this.bankService.specificationModel.limit = e.pageSize;
        this.bankService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    constructor(private matDialog: MatDialog, public bankService: BankService) {}

    ngOnInit() {
        this.get();
        this.nameSearchCtrl.valueChanges.subscribe((res) => {
            this.bankService.specificationModel.searchKeyword['searchKeyword'] = res;
            this.bankService.specificationModel.skip = 0;
            this.get();
        });
    }

    get() {
        this.bankService.getAllBank(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res.items);
            this.bankService.setPageDetailData(res);
        });
    }

    add() {
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

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.bankService.deleteBank(element.id, this).subscribe((x) => {
                        this.get();
                    });
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(BankSettingAddComponent, {
                panelClass: 'dialog-w60',
                data: element,
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

     handleError(): boolean {
        return false;
    }

    isWorking: any;
}
