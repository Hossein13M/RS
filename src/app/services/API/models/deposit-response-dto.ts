/* tslint:disable */
import { DepositDto } from './deposit-dto';
export interface DepositResponseDto {
    items: Array<DepositDto>;
    limit?: number;
    skip?: number;
    total: number;
}
