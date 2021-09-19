/* tslint:disable */
import { UpdateIpsHistoryItemResponseDto } from './update-ips-history-item-response-dto';

export interface UpdateIpsHistoryResponseDto {
    items: Array<UpdateIpsHistoryItemResponseDto>;
    limit: number;
    skip: number;
    total: number;
}
