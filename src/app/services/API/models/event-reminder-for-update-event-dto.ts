/* tslint:disable */
export interface EventReminderForUpdateEventDto {
    id?: number;
    isActive: boolean;
    level: 'Inform' | 'Warning' | 'Danger' | 'Critical';
    unit: 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month';
    value: number;
}
