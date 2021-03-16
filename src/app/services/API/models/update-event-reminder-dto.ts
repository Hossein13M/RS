/* tslint:disable */
export interface UpdateEventReminderDto {
    isActive?: boolean;
    level?: 'Inform' | 'Warning' | 'Danger' | 'Critical';
    unit?: 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month';
    value?: number;
}
