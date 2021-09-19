/* tslint:disable */
import { GeneralLedgerDto } from './general-ledger-dto';

export interface GeneralLedgerDtoResponse {
    date: string;
    items: Array<GeneralLedgerDto>;
}
