/* tslint:disable */
import { StockPieChart } from './stock-pie-chart';
import { StockTableItem } from './stock-table-item';
export interface StocksDto {
    pieChart?: Array<StockPieChart>;
    table: Array<StockTableItem>;
}
