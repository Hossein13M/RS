import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { BrokerSettingService } from 'app/services/feature-services/system-setting-services/broker-setting.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { BrokerSettingAddComponent } from '../broker-setting-add/broker-setting-add.component';
import { ColumnModel, PaginationChangeType } from '#shared/components/table/table.model';
import * as _ from 'lodash';
import { StateType } from '#shared/state-type.enum';
import { StateManager } from '#shared/pipes/stateManager.pipe';

@Component({
    selector: 'app-broker-setting-list',
    templateUrl: './broker-setting-list.component.html',
    styleUrls: ['./broker-setting-list.component.scss'],
    animations: [fuseAnimations],
})
export class BrokerSettingListComponent implements OnInit {
    constructor(private matDialog: MatDialog, public brokerService: BrokerSettingService) {}

    data: any = [];
    column: Array<ColumnModel>;
    state = StateType.LOADING;

    ngOnInit(): void {
        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'name',
                name: 'نام کارگزاری',
                type: 'string',
            },
            {
                id: 'code',
                name: 'کد کارگزاری',
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

    get(): void {
        this.brokerService
            .getBrokerSettings()
            .pipe(StateManager({ state: this.state }))
            .subscribe((res: any) => {
                this.data = res;
            });
    }

    add(): void {
        this.matDialog
            .open(BrokerSettingAddComponent, { panelClass: 'dialog-w60', data: null })
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
                    this.brokerService.delete(row.id).subscribe((x) => {
                        this.data = this.data.filter((el) => el.id !== row.id);
                    });
                }
            });
    }

    update(row): void {
        this.matDialog
            .open(BrokerSettingAddComponent, { panelClass: 'dialog-w60', data: row })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    _.assign(row, res);
                }
            });
    }
}
