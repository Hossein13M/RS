import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '#shared/services/alert.service';
import { AlarmService } from 'app/services/feature-services/alarm.service';
import { RiskModuleService } from 'app/services/feature-services/risk-module.service';
import { AddAlarmComponent } from '../add-alarm/add-alarm.component';
import { AlarmDetailComponent } from '../alarm-detail/alarm-detail.component';

@Component({
    selector: 'app-list-alarm',
    templateUrl: './list-alarm.component.html',
    styleUrls: ['./list-alarm.component.scss'],
})
export class ListAlarmComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private AlertService: AlertService,
        private alarmService: AlarmService,
        private moduleService: RiskModuleService
    ) {}

    displayedColumns: string[] = ['isActive', 'title', 'type', 'priority', 'sendEmail', 'sendSms', 'operation'];
    dataSource = new MatTableDataSource<any>();
    modules;
    currentModuleId;
    isWorking: any;

    ngOnInit(): void {
        this.getAllModules();
    }

    getAllModules(): void {
        this.moduleService.getAllModules(this).subscribe((res) => (this.modules = res));
    }

    getAlarmByModuleId(moduleId): void {
        this.alarmService.getAllAlarmsByModuleId(moduleId, this).subscribe((res: any) => (this.dataSource = new MatTableDataSource<any>(res.items)));
    }

    onModuleChange(event): void {
        this.currentModuleId = event;
        this.getAlarmByModuleId(event);
    }

    createAlarm(data): void {
        if (data === null) {
            if (!this.currentModuleId) {
                this.AlertService.onError('ابتدا ماژول مورد نظر را انتخاب کنید.');
                return;
            }
        }
        this.dialog
            .open(AddAlarmComponent, { panelClass: 'dialog-w50', data: { data: data, moduleId: this.currentModuleId } })
            .afterClosed()
            .subscribe((res) => {
                if (res) this.getAlarmByModuleId(this.currentModuleId);
            });
    }

    openAlarmDetail(data): void {
        this.dialog
            .open(AlarmDetailComponent, { panelClass: 'dialog-w50', data: data })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.getAlarmByModuleId(this.currentModuleId);
                }
            });
    }

    handleError(): boolean {
        return false;
    }
}
