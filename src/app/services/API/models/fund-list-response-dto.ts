/* tslint:disable */
import { ResponseFundDto } from './response-fund-dto';

export interface FundListResponseDto {
    items: Array<ResponseFundDto>;
    limit?: number;
    skip?: number;
    total: number;
}
