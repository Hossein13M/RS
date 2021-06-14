import { Component, OnInit } from '@angular/core';
import { AlarmService } from 'app/services/feature-services/alarm.service';

@Component({
    selector: 'app-alarming-menu',
    templateUrl: './alarming-menu.component.html',
    styleUrls: ['./alarming-menu.component.scss'],
})
export class AlarmingMenuComponent implements OnInit {
    unReadAlarms = [];
    isWorking: any;

    constructor(private alarmService: AlarmService) {}

    ngOnInit(): void {
        // this.getUnreadAlarm();
    }

    getUnreadAlarm(): void {
        this.alarmService.getUnreadAlarms(this).subscribe((res: any) => (this.unReadAlarms = res.items));
    }

    handleError(): boolean {
        return false;
    }
}
