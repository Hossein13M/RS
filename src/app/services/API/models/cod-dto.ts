/* tslint:disable */
import { CodItemPieChart } from './cod-item-pie-chart';
import { CodTableItem } from './cod-table-item';
import { ItemChart } from './item-chart';
export interface CodDto {
    bankPieChart?: Array<CodItemPieChart>;
    chart?: Array<ItemChart>;
    columnSet: Array<string>;
    institutionPieChart?: Array<CodItemPieChart>;
    interestPieChart?: Array<CodItemPieChart>;
    table: Array<CodTableItem>;
}
