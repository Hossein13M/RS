import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BourseMarketService } from 'app/services/feature-services/system-setting-services/bourse-market.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { BourseMarketSettingAddComponent } from '../bourse-market-setting-add/bourse-market-setting-add.component';

@Component({
    selector: 'app-bourse-market-setting-list',
    templateUrl: './bourse-market-setting-list.component.html',
    styleUrls: ['./bourse-market-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BourseMarketSettingListComponent implements OnInit {
    constructor(private matDialog: MatDialog, public bourseMarket: BourseMarketService) {}
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'code', 'operation'];

    isWorking: any;

    pageHandler(e: PagingEvent) {
        this.bourseMarket.specificationModel.limit = e.pageSize;
        this.bourseMarket.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.bourseMarket.getBourseMarket(this).subscribe((res: any) => {
            this.dataSource = new MatTableDataSource<any>(res);
        });
    }

    add() {
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

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, {
                panelClass: 'dialog-w40',
                data: { title: 'آیا از حذف این مورد اطمینان دارید؟' },
            })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.bourseMarket.deleteBourseMarket(element.id, this).subscribe((x) => {
                        this.get();
                    });
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(BourseMarketSettingAddComponent, {
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
}
