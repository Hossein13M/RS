/* tslint:disable */
import { GroupLedgerDto } from './group-ledger-dto';

export interface GroupLedgerDtoResponse {
    date: string;
    items: Array<GroupLedgerDto>;
}
