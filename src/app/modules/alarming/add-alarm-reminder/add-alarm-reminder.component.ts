import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { AlarmService } from 'app/services/feature-services/alarm.service';

@Component({
    selector: 'app-add-alarm-reminder',
    templateUrl: './add-alarm-reminder.component.html',
    styleUrls: ['./add-alarm-reminder.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddAlarmReminderComponent implements OnInit {
    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddAlarmReminderComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private AlertService: AlertService,
        private alarmService: AlarmService,
        private fb: FormBuilder
    ) {}

    createForm() {
        this.form = this.fb.group({ date: ['', Validators.required] });
    }

    ngOnInit() {
        this.createForm();
    }

    createReminder() {
        this.alarmService.setReminder(this.data.inboxId, this.form.value).subscribe(() => {
            this.AlertService.onSuccess('تاریخ یادآوری با موفقیت ثبت شد.');
            this.dialogRef.close(true);
        });
    }
}
