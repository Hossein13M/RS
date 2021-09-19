/* tslint:disable */
import { DetailLedgerDto } from './detail-ledger-dto';

export interface DetailLedgerDtoResponse {
    date: string;
    items: Array<DetailLedgerDto>;
}
