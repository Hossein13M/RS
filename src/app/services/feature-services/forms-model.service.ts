import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FormsModelService {
    public securityType: ComboModel[] = [
        {
            id: 1,
            name: 'سهام',
        },
        {
            id: 2,
            name: 'حق تقدم',
        },
        {
            id: 3,
            name: 'آتی',
        },
        {
            id: 4,
            name: 'اختیار معامله',
        },
        {
            id: 5,
            name: 'اختیار فروش تبعی',
        },
        {
            id: 6,
            name: 'گواهی سپرده',
        },
        {
            id: 7,
            name: 'سلف',
        },
        {
            id: 8,
            name: 'اجاره',
        },
        {
            id: 9,
            name: 'منفعت',
        },
        {
            id: 10,
            name: 'استصناع',
        },
        {
            id: 11,
            name: 'امتیاز تسهیلات مسکن',
        },
        {
            id: 12,
            name: 'اسناد خزانه',
        },
        {
            id: 13,
            name: 'اوراق رهنی',
        },
        {
            id: 14,
            name: 'ETF',
        },
        {
            id: 15,
            name: 'خرید دین',
        },
    ];
    public freqTypes: ComboModel[] = [
        { id: 1, name: '1' },
        { id: 3, name: '3' },
        { id: 6, name: '6' },
        { id: 12, name: '12' },
    ];
    public tradingMarketTypes: ComboModel[] = [
        { id: 1, name: 'بورس' },
        { id: 2, name: 'فرابورس' },
        { id: 3, name: 'بورس انرژی' },
        { id: 4, name: 'بورس کالا' },
        { id: 5, name: 'بانک' },
        { id: 6, name: 'سایر' },
    ];
    public marketmakingTypes: ComboModel[] = [
        {
            id: 1,
            name: 'مبتنی بر سفارش',
        },
        {
            id: 2,
            name: 'مبتنی بر حراج',
        },
        {
            id: 3,
            name: 'سایر',
        },
    ];

    public issuePermissionType: ComboModel[] = [
        {
            id: 1,
            name: 'سازمان بورس',
        },
        {
            id: 2,
            name: 'بانک مرکزی',
        },
        {
            id: 3,
            name: 'سایر',
        },
    ];

    public feeAndPettyTypes: ComboModel[] = [
        {
            id: 1,
            name: 'کارمزد بازارگردانی',
        },
        {
            id: 2,
            name: 'تنخواه بازارگردانی',
        },
        {
            id: 3,
            name: 'عودت تنخواه بازارگردانی',
        },
    ];

    public documentType: ComboModel[] = [
        {
            id: 1,
            name: 'نقد',
        },
        {
            id: 2,
            name: 'چک',
        },
    ];
    public assetTypes: ComboModel[] = [
        {
            name: 'سهام',
            id: 1,
        },
        {
            name: 'اوراق درآمد ثابت',
            id: 2,
        },
        {
            name: 'شاخص',
            id: 3,
        },
        {
            name: 'صندوق',
            id: 4,
        },
        {
            name: 'کالا',
            id: 5,
        },
        {
            name: 'نقد',
            id: 6,
        },
    ];

    constructor() {}
}

export class ComboModel {
    id?: any;
    name?: any;
}
