/* tslint:disable */
import { BankDto } from './bank-dto';

export interface BankResponseDto {
    items: Array<BankDto>;
    limit?: number;
    skip?: number;
    total: number;
}
