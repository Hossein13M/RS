/* tslint:disable */
import { GetMarketDto } from './get-market-dto';

export interface MarketResponseDto {
    items: Array<GetMarketDto>;
    limit?: number;
    skip?: number;
    total: number;
}
