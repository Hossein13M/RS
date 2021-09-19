import { ThemePalette } from '@angular/material/core';

export const ContractHistoryIcons: Array<Action> = [
    { typePer: 'شروع', icon: 'lens', iconColor: 'warn', titleText: 'آغاز قرارداد' },
    { typePer: 'پایان', icon: 'check_circle_outline', iconColor: 'primary', titleText: 'پایان قرارداد' },
    { typePer: 'ایجاد کد', icon: 'code', iconColor: 'primary', titleText: 'ساختن کد قرارداد' },
    { typePer: 'متوقف', icon: 'pause_circle_filled', iconColor: 'warn', titleText: 'متوقف‌کردن قرارداد' },
    { typePer: 'بازگشایی', icon: 'play_circle_filled', iconColor: 'accent', titleText: 'بازگشایی قرارداد' },
    { typePer: 'رد', icon: 'thumb_down_alt', iconColor: 'warn', titleText: 'رد کردن قرارداد' },
    { typePer: 'تایید', icon: 'thumb_up_off_alt', iconColor: 'primary', titleText: 'تایید قرارداد' },
    { typePer: 'آپلود', icon: 'publish', iconColor: 'warn', titleText: 'آپلود قرارداد' },
    { typePer: 'دانلود', icon: 'get_app', iconColor: 'warn', titleText: 'دانلود قرارداد' },
    { typePer: 'ثبت اطلاعات', icon: 'description', iconColor: 'accent', titleText: 'ثبت داده‌ی فرم پایانی' },
];

export interface Action {
    typePer: string;
    icon: string;
    iconColor: ThemePalette;
    titleText: string;
}
