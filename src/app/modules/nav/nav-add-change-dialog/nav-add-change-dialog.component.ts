import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    SearchSelectDataType,
    searchSelectStateType
} from 'app/shared/components/search-select/search-select.component';
import { NavService } from '../nav.service';

export interface NavAddChangeDialogData {
    navFundType: string;
}

@Component({
    selector: 'app-nav-add-change-dialog',
    templateUrl: './nav-add-change-dialog.component.html',
    styleUrls: ['./nav-add-change-dialog.component.scss'],
})
export class NavAddChangeDialogComponent implements OnInit {
    formConfig: Array<any>;
    showingFormConfig = [];

    form: FormGroup;
    formSubscription: any;

    bankAccountList: Array<any>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: NavAddChangeDialogData,
        public dialog: MatDialogRef<NavAddChangeDialogComponent>,
        private fb: FormBuilder,
        public navService: NavService
    ) {
        this.formConfig = [
            {
                id: 'transactionType',
                type: 'select',
                label: 'نوع تغییر',
                width: '300px',
                validators: [Validators.required],
                select: [
                    {
                        name: 'خرید ابزارهای بورسی',
                        value: '1',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'ticker',
                                    uiPropertyName: 'symbol',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchTickerFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'فروش ابزارهای بورسی',
                        value: '2',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'ticker',
                                    uiPropertyName: 'symbol',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchTickerFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'صدور صندوق',
                        value: '3',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'code',
                                    uiPropertyName: 'name',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchNonBourseInstrumentFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'rate',
                                    label: 'نرخ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'ابطال صندوق',
                        value: '4',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'code',
                                    uiPropertyName: 'name',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchNonBourseInstrumentFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'rate',
                                    label: 'نرخ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },
                    //
                    // {
                    //     name: 'برداشت از سپرده',
                    //     value: '5',
                    //     ifSelect: {
                    //         replaceId: 'type-if',
                    //         replaceForm: [
                    //             {
                    //                 id: 'accountNumber',
                    //                 type: 'searchSelect',
                    //                 valuePropertyName: 'accountNumber',
                    //                 uiPropertyName: ['bankName', 'accountNumber'],
                    //                 label: 'حساب',
                    //                 placeholder: 'جستجوی نام حساب',
                    //                 searchFn: this.bankAccountSearchFn,
                    //                 validators: [Validators.required],
                    //             },
                    //             {
                    //                 id: 'amount',
                    //                 label: 'مبلغ',
                    //                 type: 'input',
                    //                 validators: [Validators.required],
                    //                 inputType: 'number'
                    //             },
                    //             {
                    //                 id: 'amountCheckBox',
                    //                 label: 'تمام موجودی',
                    //                 type: 'checkbox',
                    //                 noFormItem: true,
                    //                 onChange: this.selectAllPrice
                    //             }
                    //         ]
                    //     }
                    // },

                    {
                        name: 'بازکردن سپرده',
                        value: '6',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                // {
                                //     id: 'accountNumber',
                                //     label: 'نام حساب',
                                //     type: 'input',
                                //     validators: [Validators.required],
                                //     inputType: 'text'
                                // },
                                {
                                    id: 'rate',
                                    label: 'نرخ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'description',
                                    label: 'توضیحات',
                                    type: 'input',
                                    validators: [],
                                    inputType: 'text',
                                },
                                {
                                    id: 'paymentDay',
                                    label: 'روز پرداخت سود',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'amount',
                                    label: 'مبلغ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'تعیین قیمت کارشناسی',
                        value: '7',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'code',
                                    uiPropertyName: 'name',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchNonBourseInstrumentFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'estimatedPrice',
                                    label: 'قیمت کارشناسی',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'خرید اوراق بانکی',
                        value: '8',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'code',
                                    uiPropertyName: 'name',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchNonBourseInstrumentFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'amount',
                                    label: 'مبلغ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'فروش اوراق بانکی',
                        value: '9',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'code',
                                    uiPropertyName: 'name',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchNonBourseInstrumentFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'amount',
                                    label: 'مبلغ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'تعیین سود تقسیمی سهام',
                        value: '10',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'ticker',
                                    type: 'searchSelect',
                                    valuePropertyName: 'code',
                                    uiPropertyName: 'name',
                                    outputValueForm: 'all',
                                    label: 'نماد',
                                    placeholder: 'جستجوی نام نماد',
                                    searchFn: this.searchNonBourseInstrumentFn,
                                    validators: [Validators.required],
                                },
                                {
                                    id: 'DPS',
                                    label: 'سود تقسیمی واحد',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'DPSDate',
                                    label: 'تاریخ دریافت سود',
                                    type: 'date',
                                    validators: [Validators.required],
                                },

                                {
                                    id: 'discountRate',
                                    label: 'نرخ تنزیل',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'صدور واحدها',
                        value: '12',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'rate',
                                    label: 'نرخ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },

                    {
                        name: 'ابطال واحدها',
                        value: '13',
                        ifSelect: {
                            replaceId: 'type-if',
                            replaceForm: [
                                {
                                    id: 'volume',
                                    label: 'حجم',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                                {
                                    id: 'rate',
                                    label: 'نرخ',
                                    type: 'input',
                                    validators: [Validators.required],
                                    inputType: 'number',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                id: 'type-if',
                type: null,
            },
        ];
    }

    ngOnInit(): void {
        const formSubscriptionChange = (newFormValue: any) => {
            if (this.formSubscription) {
                this.formSubscription.unsubscribe();
            }

            const [newFormGroupObj, newConfig] = this.updateForm(this.formConfig, newFormValue);
            if (JSON.stringify(newConfig) !== JSON.stringify(this.showingFormConfig)) {
                this.showingFormConfig = newConfig;
                this.form = this.fb.group(newFormGroupObj);
            }
            this.formSubscription = this.form.valueChanges.subscribe((newValue) => formSubscriptionChange(newValue));
        };

        formSubscriptionChange(null);
    }

    updateForm(config: any, value: any): Array<any> {
        const formGroupObj = {};

        const copyOfConfig = [...config];

        // replace ifSelect
        copyOfConfig.forEach((formEl: any) => {
            if (!!formEl.type && formEl.type === 'select' && !!value && !!value[formEl.id]) {
                formEl.select.forEach((selectOption: any) => {
                    if (selectOption.value === value[formEl.id] && !!selectOption.ifSelect) {
                        // find replacement!
                        for (let i = 0; i < copyOfConfig.length; i++) {
                            if (copyOfConfig[i].id === selectOption.ifSelect.replaceId) {
                                // remove replace element and add replace form
                                copyOfConfig.splice(i, 1, ...selectOption.ifSelect.replaceForm);

                                // search Again!
                                i = 0;
                            }
                        }
                    }
                });
            }
        });

        // create form group object
        copyOfConfig.forEach((formEl: any) => {
            if (!!formEl.type && !formEl.noFormItem) {
                formGroupObj[formEl.id] = [
                    // Value
                    value && value[formEl.id] ? value[formEl.id] : '',

                    // Validators
                    formEl.validators ? formEl.validators : [],
                ];
            }
        });

        return [formGroupObj, copyOfConfig];
    }

    addChange(): void {
        this.dialog.close(this.form.value);
    }

    // -------------------------------------------------------------------------------------
    searchTickerFn = (searchKey: string, data: SearchSelectDataType): void => {
        data.state = searchSelectStateType.LOADING;
        const transactionType =
            this.form && this.form.get('transactionType') && this.form.get('transactionType').value ? this.form.get('transactionType').value : null;

        this.navService.getAllTickersBySearch(this.data.navFundType, transactionType, searchKey).subscribe(
            (list: Array<any>) => {
                data.state = searchSelectStateType.PRESENT;
                if (list && list.length !== 0) {
                    data.list = list.slice(0, 20);
                } else {
                    data.list = [];
                }
            },
            () => {
                data.state = searchSelectStateType.FAILED;
            }
        );
    };

    searchNonBourseInstrumentFn = (searchKey: string, data: SearchSelectDataType): void => {
        data.state = searchSelectStateType.LOADING;

        const trans =
            this.form && this.form.get('transactionType') && this.form.get('transactionType').value ? this.form.get('transactionType').value : null;

        let transactionType = 3;

        if (trans === '8') {
            transactionType = 3;
        }
        if (trans === '9') {
            transactionType = 4;
        }

        this.navService.getAllNonBourseInstrument(this.data.navFundType, transactionType, searchKey).subscribe(
            (list: Array<any>) => {
                data.state = searchSelectStateType.PRESENT;
                if (list && list.length !== 0) {
                    data.list = list.slice(0, 20);
                } else {
                    data.list = [];
                }
            },
            () => {
                data.state = searchSelectStateType.FAILED;
                data.list = [];
            }
        );
    };

    bankAccountSearchFn = (searchKey: string, data: SearchSelectDataType): void => {
        data.state = searchSelectStateType.LOADING;
        this.navService.getAllBankAccountApi(this.data.navFundType, searchKey).subscribe(
            (list: any) => {
                this.bankAccountList = list;
                data.list = list.slice(0, 20);
                data.state = searchSelectStateType.PRESENT;
            },
            () => {
                data.state = searchSelectStateType.FAILED;
            }
        );
    };

    // -------- Mat Select Change Value Function
    selectAllPrice = (event): void => {
        if (event.checked && this.form.get('accountNumber')) {
            if (this.form.get('accountNumber').value) {
                const amount = this.bankAccountList.filter((x) => x.accountNumber === this.form.get('accountNumber').value)[0]
                    .aggregatedRemainedAmount;
                this.form.get('amount').setValue(amount);
            }
        } else {
            this.form.get('amount').setValue(null);
        }
    };
}
