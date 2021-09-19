/* tslint:disable */
import { GroupLedgerSearchDto } from './group-ledger-search-dto';

export interface CategoryLedgerSearchDto {
    aggregatedCreditAmount?: string;
    aggregatedDebitAmount?: string;
    aggregatedRemainedAmount?: string;
    categoryLedgerCode: string;
    categoryLedgerName: string;
    group?: Array<GroupLedgerSearchDto>;
}
