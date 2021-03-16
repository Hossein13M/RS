import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class AlarmService {
    private static getAllAlarms = '/api/v1/alarm/?moduleId={moduleId}';
    private static createAlarmApi = '/api/v1/alarm';
    private static getReminderListAlarm = '/api/v1/sent-alarm/inbox';
    private static setReminderApi = '/api/v1/sent-alarm/reminder-date/{inboxId}';
    private static getReminderByIdApi = '/api/v1/sent-alarm/{inboxId}';
    alarmType = [
        {
            title: 'کیفی',
            value: 'Qualitative',
        },
        {
            title: 'کمی',
            value: 'Quantitative',
        },
    ];
    alarmActivation = [
        {
            title: 'غیرفعال',
            value: 0,
        },
        {
            title: 'فعال',
            value: 1,
        },
    ];
    alarmPriority = [
        { title: 'بالا', value: 'Critical' },
        { title: 'متوسط', value: 'Warning' },
        { title: 'کم', value: 'Normal' },
    ];

    constructor(private apiClientService: ApiClientService) {}

    createAlarm(data, fc?: FormContainer) {
        return this.apiClientService.post(AlarmService.createAlarmApi, data, fc);
    }

    updateAlarm(data, fc?: FormContainer) {
        return this.apiClientService.put(AlarmService.createAlarmApi, fc, data);
    }

    getAllAlarmsByModuleId(specification, fc?: FormContainer) {
        const api = AlarmService.getAllAlarms.replace('{moduleId}', specification);
        return this.apiClientService.get(api, fc);
    }

    getReminderAlarm(fc?: FormContainer) {
        return this.apiClientService.get(AlarmService.getReminderListAlarm, fc);
    }

    setReminder(inboxId, data, fc?: FormContainer) {
        const api = AlarmService.setReminderApi.replace('{inboxId}', inboxId);
        return this.apiClientService.put(api, fc, data);
    }

    getReminderById(id, fc?: FormContainer) {
        const api = AlarmService.getReminderByIdApi.replace('{inboxId}', id);
        return this.apiClientService.get(api, fc);
    }

    public getUnreadAlarms(fc?: FormContainer) {
        const api = AlarmService.getReminderListAlarm + '?status=Unread';
        return this.apiClientService.get(api, fc);
    }
}
