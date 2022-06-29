/* tslint:disable */
import { StockDetail } from './stock-detail';

export interface StockTableItem {
    /**
     * قیمت روز
     */
    dayPrice?: number;

    /**
     * ارزش روز
     */
    dayValue?: number;
    details?: Array<StockDetail>;
    name?: string;

    /**
     * درصد از کل دارایی
     */
    percentageOfAssets?: number;

    /**
     * درصد از سبد سهام
     */
    percentageOfStocks?: number;

    /**
     * حجم کل
     */
    volume?: number;
}
