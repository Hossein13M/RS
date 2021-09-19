/* tslint:disable */
import { DetailLedgerSearchDto } from './detail-ledger-search-dto';

export interface SubsidiaryLedgerSearchDto {
    aggregatedCreditAmount?: string;
    aggregatedDebitAmount?: string;
    aggregatedRemainedAmount?: string;
    detail?: Array<DetailLedgerSearchDto>;
    subsidiaryLedgerCode: number;
    subsidiaryLedgerName: string;
}
