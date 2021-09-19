/* tslint:disable */
import { BondPieChart } from './bond-pie-chart';
import { BondTableItem } from './bond-table-item';

export interface BondsDto {
    pieChart?: Array<BondPieChart>;
    table: Array<BondTableItem>;
}
