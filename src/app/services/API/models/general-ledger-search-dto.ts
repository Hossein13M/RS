/* tslint:disable */
import { SubsidiaryLedgerSearchDto } from './subsidiary-ledger-search-dto';

export interface GeneralLedgerSearchDto {
    aggregatedCreditAmount?: string;
    aggregatedDebitAmount?: string;
    aggregatedRemainedAmount?: string;
    generalLedgerCode: number;
    generalLedgerName: string;
    subsidiary?: Array<SubsidiaryLedgerSearchDto>;
}
