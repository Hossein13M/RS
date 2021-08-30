import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'organizations',
        title: 'چینش سازمان‌ها',
        icon: 'bar_chart',
        type: 'collapsable',
        children: [
            { id: 'organizationsList', title: 'نهادها', type: 'item', icon: 'business', url: '/organizations-structure/organizations-list' },
            { id: 'user', title: 'کاربران', type: 'item', icon: 'people', url: '/organizations-structure/user' },
        ],
    },
    {
        id: 'contract',
        title: 'قراردادها',
        icon: 'gavel',
        type: 'collapsable',
        children: [
            { id: 'contractType', title: 'نوع قرارداد', type: 'item', icon: 'format_list_bulleted', url: '/contract/contract-type' },
            { id: 'contractFlow', title: 'جریان قرارداد', type: 'item', icon: 'timeline', url: '/contract/flow' },
            { id: 'contractCardboard', title: 'فرم قرارداد', type: 'item', icon: 'list_alt', url: '/contract/contract-form' },
            { id: 'contractsList', title: 'قراردادها', type: 'item', icon: 'fact_check', url: '/contract/contract-list' },
            { id: 'contractCardboard', title: 'کارتابل قرارداد', type: 'item', icon: 'dashboard', url: '/contract/cardboard' },
        ],
    },

    { id: 'assets', title: 'دارایی های تحت مدیریت', type: 'item', icon: 'money', url: '/aum' },

    { id: 'nav', title: 'ارزش خالص دارایی ها', type: 'item', icon: 'show_chart', exactMatch: true, url: '/nav' },
    { id: 'assetsMonitoring', title: 'پایش دارایی‌ها', type: 'item', icon: 'filter_list', exactMatch: true, url: '/assets-monitoring' },
    {
        id: 'marketRisk',
        title: 'ریسک بازار',
        icon: 'bar_chart',
        type: 'collapsable',
        children: [
            { id: 'yield_curve', title: 'منحنی بازده', type: 'item', icon: 'multiline_chart', url: '/risk-measurement/yield_curve' },
            { id: 'assets_return', title: 'بازده ریسک و دارایی ها', type: 'item', icon: 'assignment_return', url: '/risk-measurement/assets_return' },
            { id: 'risk_measuring', title: 'اندازه گیری ریسک', type: 'item', icon: 'straighten', url: '/risk-measurement/risk_measuring' },
        ],
    },
    {
        id: 'compliance',
        title: 'ریسک تطبیق',
        icon: 'multiline_chart',
        type: 'collapsable',
        children: [
            {
                id: 'fundCompliance',
                title: 'مدیریت حدود صندوق‌ها',
                icon: 'multiline_chart',
                type: 'collapsable',
                children: [
                    { id: 'complianceFund', title: 'تعریف حدود صندوق‌ها', type: 'item', url: '/compliance/fund' },
                    { id: 'complianceCalc', title: 'گزارش حدود صندوق ها', type: 'item', url: '/compliance/calculated' },
                ],
            },
        ],
    },
    {
        id: 'baseData',
        title: 'مدیریت قراردادها',
        icon: 'fact_check',
        type: 'collapsable',
        children: [
            { id: 'wfe', title: 'الگوی قراردادها', type: 'item', icon: 'developer_board', url: '/flow/flows' },
            { id: 'contractDashboard', title: 'کارتابل قراردادها', type: 'item', icon: 'email', url: '/flow/instance' },
            { id: 'operator', title: 'مدیریت مشتریان', type: 'item', icon: 'people', url: '/user/customer' },
        ],
    },
    {
        id: 'settings',
        title: 'تنظیمات سیستم',
        type: 'collapsable',
        icon: 'dashboard',
        children: [
            { id: 'userDetail', title: 'ورود اطلاعات پایه', type: 'item', icon: 'dashboard', url: '/system-settings/input' },
            { id: 'userInput', title: 'ورود اطلاعات ابزارها', type: 'item', icon: 'dashboard', url: '/system-settings/bourse' },
            { id: 'branch', type: 'item', url: '/system-settings/branch', title: ' شعب بانک‌ها', icon: 'subject' },
            { id: 'broker', type: 'item', url: '/system-settings/broker', title: 'لیست کارگزاری‌ها', icon: 'subject' },
            { id: 'gl', type: 'item', url: '/system-settings/gl', title: 'نگاشت کد دفتر کل', icon: 'subject' },
            { id: 'deposit', type: 'item', url: '/system-settings/deposit', title: 'ورود اطلاعات سپرده', icon: 'subject' },
            { id: 'bank', type: 'item', url: '/system-settings/bank', title: 'لیست بانک‌ها', icon: 'subject' },
            { id: 'bourse-board', type: 'item', url: '/system-settings/bourse-board', title: 'لیست تابلوهای بورسی', icon: 'subject' },
            { id: 'bourse-market', type: 'item', url: '/system-settings/bourse-market', title: 'لیست بازارهای بورسی', icon: 'subject' },
            { id: 'instrument', type: 'item', url: '/system-settings/instrument', title: 'لیست ابزار‌ها', icon: 'subject' },
            { id: 'fundRole', type: 'item', url: '/system-settings/fundRole', title: 'لیست ارکان', icon: 'subject' },
            { id: 'supervisor', type: 'item', url: '/system-settings/supervisor', title: 'لیست ناظر', icon: 'subject' },
            { id: 'organizationType', type: 'item', url: '/system-settings/organization-type', title: 'لیست نوع نهاد', icon: 'subject' },
            { id: 'instrumentType', type: 'item', url: '/system-settings/instrument-type', title: 'لیست نوع اوراق', icon: 'subject' },
            { id: 'fund', type: 'item', url: '/system-settings/fund', title: 'لیست مشخصات صندوق', icon: 'subject' },
            { id: 'market', type: 'item', url: '/system-settings/market', title: 'لیست اطلاعات بازار', icon: 'subject' },
        ],
    },
    {
        id: 'dashboards',
        title: 'مدیریت سیستم',
        type: 'collapsable',
        icon: 'settings',
        children: [{ id: 'user', title: 'ثبت کاربر', type: 'item', icon: 'accessibility', url: '/user/operator' }],
    },
];
