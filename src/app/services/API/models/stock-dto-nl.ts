/* tslint:disable */
import { StockPieChart } from './stock-pie-chart';
import { StockTableItemNl } from './stock-table-item-nl';

export interface StockDtoNl {
    pieChart?: Array<StockPieChart>;
    table: Array<StockTableItemNl>;
}
