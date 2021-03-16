/* tslint:disable */
export interface CreateEventReminderDto {
    eventId: number;
    isActive?: boolean;
    level?: 'Inform' | 'Warning' | 'Danger' | 'Critical';
    unit?: 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month';
    value?: number;
}
