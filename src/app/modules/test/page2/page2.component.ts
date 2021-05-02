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
                value: 20.3,
            },
            {
                name: 'تمدن',
                value: 80.7,
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
