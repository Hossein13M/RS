/* tslint:disable */
import { BondPieChart } from './bond-pie-chart';
import { BondTableItemNl } from './bond-table-item-nl';

export interface BondsDtoNl {
    pieChart?: Array<BondPieChart>;
    table: Array<BondTableItemNl>;
}
