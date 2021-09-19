/* tslint:disable */
import { SmsReceptorDto } from './sms-receptor-dto';

export interface SmsResponseDto {
    createdAt?: string;
    id: number;
    message: string;
    receptors: Array<SmsReceptorDto>;
    sender: string;
}
