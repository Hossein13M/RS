import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlarmService } from 'app/services/feature-services/alarm.service';
import { AddAlarmReminderComponent } from '../add-alarm-reminder/add-alarm-reminder.component';
import { AlarmReminderDetailComponent } from '../alarm-reminder-detail/alarm-reminder-detail.component';

@Component({
    selector: 'app-alarm-reminder',
    templateUrl: './alarm-reminder.component.html',
    styleUrls: ['./alarm-reminder.component.scss'],
})
export class AlarmReminderComponent implements OnInit {
    displayedColumns: string[] = ['status', 'title', 'priority', 'remindDate', 'operation'];

    dataSource = new MatTableDataSource<any>();

    isWorking: any;

    constructor(private dialog: MatDialog, private alarmService: AlarmService) {}

    ngOnInit(): void {
        this.getReminderListAlarm();
    }

    createReminder(data): void {
        this.dialog
            .open(AddAlarmReminderComponent, { panelClass: 'dialog-w40', data: data })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.getReminderListAlarm();
                }
            });
    }

    openAlarm(data): void {
        this.dialog
            .open(AlarmReminderDetailComponent, { panelClass: 'dialog-w50', data: data })
            .afterClosed()
            .subscribe((res) => {
                if (res) {
                    this.getReminderListAlarm();
                }
            });
    }

    getReminderListAlarm(): void {
        this.alarmService.getReminderAlarm(this).subscribe((res: any) => (this.dataSource = new MatTableDataSource<any>(res.items)));
    }

    handleError(): boolean {
        return false;
    }
}
