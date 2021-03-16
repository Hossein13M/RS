import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'app/shared/material.module';
import { ShareModule } from 'app/shared/share.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddAlarmReminderComponent } from './add-alarm-reminder/add-alarm-reminder.component';
import { AddAlarmComponent } from './add-alarm/add-alarm.component';
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';
import { AlarmReminderDetailComponent } from './alarm-reminder-detail/alarm-reminder-detail.component';
import { AlarmReminderComponent } from './alarm-reminder/alarm-reminder.component';
import { ListAlarmComponent } from './list-alarm/list-alarm.component';
const routes: Routes = [
    {
        path: 'list',
        component: ListAlarmComponent,
    },
    {
        path: 'remindList',
        component: AlarmReminderComponent,
    },
];

@NgModule({
    declarations: [
        AddAlarmComponent,
        ListAlarmComponent,
        AlarmDetailComponent,
        AlarmReminderComponent,
        AddAlarmReminderComponent,
        AlarmReminderDetailComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, ShareModule, NgxMatSelectSearchModule],
    entryComponents: [AddAlarmComponent, AlarmDetailComponent, AddAlarmReminderComponent, AlarmReminderDetailComponent],
})
export class AlarmingModule {}
