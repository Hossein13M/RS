/* tslint:disable */
import { FundNavUserTransactionItemDto } from './fund-nav-user-transaction-item-dto';

export interface CreateFundNavUserTransactionDto {
    fundNationalCode: string;
    transactions: Array<FundNavUserTransactionItemDto>;
}
