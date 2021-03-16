/* tslint:disable */
import { EtfItemPieChart } from './etf-item-pie-chart';
import { EtfTableItem } from './etf-table-item';
import { ItemChart } from './item-chart';
export interface EtfDtfDto {
    chart?: Array<ItemChart>;
    columnSet: Array<string>;
    industryPieChart?: Array<EtfItemPieChart>;
    institutionPieChart?: Array<EtfItemPieChart>;
    table: Array<EtfTableItem>;
    toolsPieChart?: Array<EtfItemPieChart>;
}
