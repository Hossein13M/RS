/* tslint:disable */
import { GeneralLedgerSearchDto } from './general-ledger-search-dto';

export interface GroupLedgerSearchDto {
    aggregatedCreditAmount?: string;
    aggregatedDebitAmount?: string;
    aggregatedRemainedAmount?: string;
    general?: Array<GeneralLedgerSearchDto>;
    groupLedgerCode: number;
    groupLedgerName: string;
}
