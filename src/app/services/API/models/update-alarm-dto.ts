/* tslint:disable */
export interface UpdateAlarmDto {
    description?: string;
    id?: number;
    isActive?: boolean;
    limit?: number;
    moduleId: number;
    priority?: 'Critical' | 'Warning' | 'Normal';
    sendEmail?: boolean;
    sendSms?: boolean;
    submitUser?: number;
    title?: string;
    toUsers?: Array<number>;
    type?: 'Qualitative' | 'Quantitative';
}
