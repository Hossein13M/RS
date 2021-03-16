/* tslint:disable */
export interface EtfTableItem {
    code?: number;

    /**
     * قیمت پایانی
     */
    dayPrice?: number;

    /**
     * sample "گنجینه" : 59540196
     */
    fundName?: number;

    /**
     * درصد از کل دارایی
     */
    percentOfTotal?: number;

    /**
     * محل معامله
     */
    placeOfTransaction?: string;

    /**
     * نماد
     */
    symbol?: string;

    /**
     * ارزش کل
     */
    totalValue?: number;

    /**
     * حجم کل
     */
    totalVolume?: number;
}
