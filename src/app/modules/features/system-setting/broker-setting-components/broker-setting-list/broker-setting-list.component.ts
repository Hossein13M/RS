import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BrokerSettingService } from 'app/services/feature-services/system-setting-services/broker-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagingEvent } from 'app/shared/components/paginator/paginator.component';
import { BrokerSettingAddComponent } from '../broker-setting-add/broker-setting-add.component';

@Component({
    selector: 'app-broker-setting-list',
    templateUrl: './broker-setting-list.component.html',
    styleUrls: ['./broker-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BrokerSettingListComponent implements OnInit {
    public dataSource = new MatTableDataSource<any>();
    public displayedColumns = ['name', 'code', 'operation'];

    constructor(private matDialog: MatDialog, public brokerService: BrokerSettingService) {}

    pageHandler(e: PagingEvent) {
        this.brokerService.specificationModel.limit = e.pageSize;
        this.brokerService.specificationModel.skip = e.currentIndex * e.pageSize;
        this.get();
    }

    ngOnInit() {
        this.get();
    }

    get() {
        this.brokerService.getBrokerSettings(this).subscribe((res: any) => (this.dataSource = new MatTableDataSource<any>(res)));
    }

    add() {
        this.matDialog
            .open(BrokerSettingAddComponent, { panelClass: 'dialog-w60', data: null })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.get();
                }
            });
    }

    delete(element) {
        this.matDialog
            .open(ConfirmDialogComponent, { panelClass: 'dialog-w40', data: { title: 'آیا از حذف این مورد اطمینان دارید؟' } })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.brokerService.deleteBrokerSetting(element.id, this).subscribe(() => this.get());
                }
            });
    }

    edit(element) {
        this.matDialog
            .open(BrokerSettingAddComponent, { panelClass: 'dialog-w60', data: element })
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
