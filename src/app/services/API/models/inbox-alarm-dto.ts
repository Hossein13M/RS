/* tslint:disable */
import { ItemAlarmDto } from './item-alarm-dto';
export interface InboxAlarmDto {
    items: Array<ItemAlarmDto>;
    limit?: number;
    skip?: number;
    total: number;
}
