/* tslint:disable */
import { DepositPieChart } from './deposit-pie-chart';
import { DepositTableItem } from './deposit-table-item';
export interface DepositsDto {
    pieChart?: Array<DepositPieChart>;
    table: Array<DepositTableItem>;
}
