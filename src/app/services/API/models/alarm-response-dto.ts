/* tslint:disable */
import { ToUserDto } from './to-user-dto';
export interface AlarmResponseDto {
    description: string;
    id: number;
    isActive?: boolean;
    limit?: number;
    moduleId: number;
    priority?: 'Critical' | 'Warning' | 'Normal';
    sendEmail?: boolean;
    sendSms?: boolean;
    submitDate: string;
    submitUser?: number;
    submitUserName: string;
    title: string;
    toUsers: Array<ToUserDto>;
    type?: 'Qualitative' | 'Quantitative';
}
