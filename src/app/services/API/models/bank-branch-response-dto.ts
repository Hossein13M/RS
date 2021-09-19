/* tslint:disable */
import { BankBranchDto } from './bank-branch-dto';

export interface BankBranchResponseDto {
    items: Array<BankBranchDto>;
    limit?: number;
    skip?: number;
    total: number;
}
