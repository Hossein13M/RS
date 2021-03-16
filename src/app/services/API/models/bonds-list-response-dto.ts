/* tslint:disable */
import { BondsListDto } from './bonds-list-dto';
export interface BondsListResponseDto {
    items: Array<BondsListDto>;
    limit?: number;
    skip?: number;
}
