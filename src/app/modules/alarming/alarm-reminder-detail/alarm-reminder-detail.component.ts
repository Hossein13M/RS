import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlarmService } from 'app/services/feature-services/alarm.service';

@Component({
    selector: 'app-alarm-reminder-detail',
    templateUrl: './alarm-reminder-detail.component.html',
    styleUrls: ['./alarm-reminder-detail.component.scss'],
})
export class AlarmReminderDetailComponent implements OnInit {
    data;

    constructor(
        public dialogRef: MatDialogRef<AlarmReminderDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public cData,
        private alarmService: AlarmService
    ) {}

    getReminderDetail() {
        this.alarmService.getReminderById(this.cData.inboxId).subscribe((res) => {
            this.data = res;
        });
    }

    ngOnInit() {
        this.getReminderDetail();
    }
}
