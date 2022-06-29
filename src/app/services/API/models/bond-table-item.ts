/* tslint:disable */
import { BondDetail } from './bond-detail';

export interface BondTableItem {
    /**
     * نرخ سود اسمی
     */
    couponRate?: number;

    /**
     * قیمت روز
     */
    dayPrice?: number;

    /**
     * ارزش روز
     */
    dayValue?: number;
    details?: Array<BondDetail>;
    name?: string;

    /**
     * درصد از کل دارایی
     */
    percentageOfAssets?: number;

    /**
     * درصد از سبد سهام
     */
    percentageOfBonds?: number;

    /**
     * حجم کل
     */
    volume?: number;
}
