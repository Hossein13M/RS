import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchSelectDataType, searchSelectStateType } from 'app/shared/components/search-select/search-select.component';
import { SearchSelectMockData } from './search-select-mock-data';

@Component({
    selector: 'app-page4',
    templateUrl: './page4.component.html',
    styleUrls: ['./page4.component.scss'],
})
export class Page4Component implements OnInit {
    fg: FormGroup;
    cf: FormGroup;

    // ------- backend mock data
    backendData = SearchSelectMockData;

    constructor(private fb: FormBuilder) {
        this.fg = this.fb.group({ testSearchSelect: [{ ticker: 'IRO9PASN4191', symbol: 'ضسان3026' }, [Validators.required]] });

        this.cf = this.fb.group({
            label: ['لیبل', []],
            placeholder: ['جانما', []],
            appearance: ['outline', []],
            disabled: [false, []],
            dataType: ['all', []],
            multi: [false, []],
        });
    }

    ngOnInit(): void {}

    searchFn = (searchKey: string, data: SearchSelectDataType): void => {
        data.state = searchSelectStateType.LOADING;
        setTimeout(() => {
            data.list = this.backendData.filter((el) => el.symbol.includes(searchKey));
            data.state = searchSelectStateType.PRESENT;
        }, 1_000);
    };
}
