/* tslint:disable */
export interface CreateAlarmDto {
    description: string;
    isActive?: boolean;
    limit?: number;
    moduleId: number;
    priority?: 'Critical' | 'Warning' | 'Normal';
    sendEmail?: boolean;
    sendSms?: boolean;
    submitUser?: number;
    title: string;
    toUsers: Array<number>;
    type?: 'Qualitative' | 'Quantitative';
}
