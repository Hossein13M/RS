/* tslint:disable */
import { GetTradeResponseItemDto } from './get-trade-response-item-dto';
export interface GetTradeResponseDto {
    items: Array<GetTradeResponseItemDto>;
    limit: number;
    skip: number;
    total: number;
}
