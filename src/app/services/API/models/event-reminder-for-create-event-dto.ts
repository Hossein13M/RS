/* tslint:disable */
export interface EventReminderForCreateEventDto {
    isActive: boolean;
    level: 'Inform' | 'Warning' | 'Danger' | 'Critical';
    unit: 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month';
    value: number;
}
