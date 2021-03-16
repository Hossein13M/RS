/* tslint:disable */
export interface CreateTradeDto {
    /**
     * توضیحات
     */
    comments: string;

    /**
     * کد ملی
     */
    nationalCode?: string;

    /**
     * میز / سبد
     */
    organizationType: 'T' | 'M' | 'F';

    /**
     * کد پم
     */
    pamCode?: string;

    /**
     * قیمت معامله
     */
    price: number;

    /**
     * نماد
     */
    ticker: string;

    /**
     * نوع معامله. خرید = ۱    فروش = ۲
     */
    tradeType: '1' | '2';

    /**
     * تاریخ معامله. نمونه : 23-05-2020
     */
    transactionDate?: string;

    /**
     * ارزش معامله
     */
    value: number;

    /**
     * حجم معامله
     */
    volume: number;
}
