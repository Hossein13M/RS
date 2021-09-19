/* tslint:disable */
import { AlarmResponseDto } from './alarm-response-dto';

export interface AlarmListResponseDto {
    items: Array<AlarmResponseDto>;
    limit?: number;
    skip?: number;
    total: number;
}
