/* tslint:disable */
import { GetTradeDataResponseItemsDto } from './get-trade-data-response-items-dto';

export interface GetTradeDataResponseDto {
    items: Array<GetTradeDataResponseItemsDto>;
    limit: number;
    skip: number;
    total: number;
}
