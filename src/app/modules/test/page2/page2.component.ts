import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-page2',
    templateUrl: './page2.component.html',
    styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
    datas = [
        [
            {
                name: 'صندوق',
                value: 0,
                childs: [
                    {
                        code: 1001,
                        name: 'گنجینه زرین شهر',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1002,
                        name: 'اندوخته توسعه صادرات آرمانی',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1003,
                        name: 'ثروت آفرین تمدن',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1004,
                        name: 'گوهر نفیس تمدن',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1005,
                        name: 'آرمان آتیه درخشان مس',
                        value: 0,
                        childs: [],
                    },
                ],
            },
            {
                name: 'تمدن',
                value: 1084403999210,
                childs: [
                    {
                        name: 'ای تی اف - سهام',
                        value: 395576026780,
                        childs: [
                            {
                                name: 'آتیمس',
                                value: 395576026780,
                            },
                        ],
                    },
                    {
                        name: 'صندوق سرمایه گذاری در اوراق با درآمد ثابت',
                        value: 340860702240,
                        childs: [
                            {
                                name: 'سپاس',
                                value: 312063222240,
                            },
                            {
                                name: 'سخند',
                                value: 28797480000,
                            },
                        ],
                    },
                    {
                        name: 'ای تی اف - مختلط',
                        value: 341967270190,
                        childs: [
                            {
                                name: 'اوصتا',
                                value: 270496000000,
                            },
                            {
                                name: 'ثروتم',
                                value: 67406270190,
                            },
                            {
                                name: 'آرمانی',
                                value: 3840000000,
                            },
                            {
                                name: 'فنابا',
                                value: 225000000,
                            },
                        ],
                    },
                    {
                        name: 'ای تی اف - جسورانه',
                        value: 6000000000,
                        childs: [
                            {
                                name: 'تهران1',
                                value: 6000000000,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            {
                name: 'صندوق ۲',
                value: 0,
                childs: [
                    {
                        code: 1001,
                        name: 'گنجینه زرین شهر ۲',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1002,
                        name: 'اندوخته توسعه صادرات آرمانی ۲',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1003,
                        name: 'ثروت آفرین تمدن ۲',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1004,
                        name: 'گوهر نفیس تمدن ۲',
                        value: 0,
                        childs: [],
                    },
                    {
                        code: 1005,
                        name: 'آرمان آتیه درخشان مس',
                        value: 0,
                        childs: [],
                    },
                ],
            },
            {
                name: 'تمدن ۲',
                value: 1084403999210,
                childs: [
                    {
                        name: 'ای تی اف - سهام',
                        value: 395576026780,
                        childs: [
                            {
                                name: 'آتیمس',
                                value: 395576026780,
                            },
                        ],
                    },
                    {
                        name: 'صندوق سرمایه گذاری در اوراق با درآمد ثابت',
                        value: 340860702240,
                        childs: [
                            {
                                name: 'سپاس',
                                value: 312063222240,
                            },
                            {
                                name: 'سخند',
                                value: 28797480000,
                            },
                        ],
                    },
                    {
                        name: 'ای تی اف - مختلط',
                        value: 341967270190,
                        childs: [
                            {
                                name: 'اوصتا',
                                value: 270496000000,
                            },
                            {
                                name: 'ثروتم',
                                value: 67406270190,
                            },
                            {
                                name: 'آرمانی',
                                value: 3840000000,
                            },
                            {
                                name: 'فنابا',
                                value: 225000000,
                            },
                        ],
                    },
                    {
                        name: 'ای تی اف - جسورانه',
                        value: 6000000000,
                        childs: [
                            {
                                name: 'تهران1',
                                value: 6000000000,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            {
                name: 'بازارگردانی',
                value: 3205194875,
                childs: [
                    {
                        name: 'ابزارهای بورسی',
                        value: 3205194875,
                        childs: [
                            {
                                name: 'اوراق',
                                value: 3205194875,
                                childs: [
                                    {
                                        name: 'صکوک',
                                        value: 3205194875,
                                        childs: [
                                            {
                                                name: 'صکوک اجاره',
                                                value: 3205194875,
                                                childs: [{ name: 'ذاجاد21', value: 3205194875 }],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'تمدن',
                value: 200680348140,
                childs: [
                    {
                        name: 'ابزارهای بورسی',
                        value: 200680348140,
                        childs: [
                            {
                                name: 'سهام',
                                value: 23747766000,
                                childs: [
                                    {
                                        name: '‫سهم‬',
                                        value: 23747766000,
                                        childs: [{ name: 'ذانرژي1', value: 23747766000 }],
                                    },
                                ],
                            },
                            {
                                name: 'اوراق',
                                value: 46452490000,
                                childs: [
                                    {
                                        name: 'مشارکت',
                                        value: 12223790000,
                                        childs: [
                                            {
                                                name: 'مشارکت شهرداری ها',
                                                value: 12223790000,
                                                childs: [{ name: 'مكرج112', value: 12223790000 }],
                                            },
                                        ],
                                    },
                                    {
                                        name: 'صکوک',
                                        value: 34228700000,
                                        childs: [
                                            {
                                                name: 'صکوک مرابحه',
                                                value: 34228700000,
                                                childs: [{ name: 'ذگندم2', value: 34228700000 }],
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                name: 'صندوق',
                                value: 130480092140,
                                childs: [
                                    {
                                        name: 'ای تی اف - سهام',
                                        value: 94098210140,
                                        childs: [{ name: 'ذآتيمس', value: 94098210140 }],
                                    },
                                    {
                                        name: 'صندوق سرمایه گذاری در اوراق با درآمد ثابت',
                                        value: 30156882000,
                                        childs: [{ name: 'ذسخند', value: 30156882000 }],
                                    },
                                    {
                                        name: 'ای تی اف - مختلط',
                                        value: 225000000,
                                        childs: [{ name: 'ذفنابا', value: 225000000 }],
                                    },
                                    {
                                        name: 'ای تی اف - جسورانه',
                                        value: 6000000000,
                                        childs: [{ name: 'ذتهران1', value: 6000000000 }],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    ];
    index = 2;
    data = this.datas[this.index];
    // Controls Form
    cf: FormGroup;

    constructor(private fb: FormBuilder) {
        this.cf = this.fb.group({ chartName: ['نام چارت', []], cardLayout: [true, []], height: ['300px', []], showLabel: [false, []] });
    }

    ngOnInit(): void {}

    changeDate(): void {
        if (this.index === this.datas.length - 1) {
            this.index = 0;
            this.data = this.datas[this.index];
        } else {
            this.index++;
            this.data = this.datas[this.index];
        }
    }
}
