import { Component, Input, OnInit } from '@angular/core';
import { StateType } from 'app/shared/state-type.enum';

@Component({
    selector: 'app-no-data',
    templateUrl: './no-data.component.html',
    styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
    @Input('state') state: StateType;
    @Input('dataLength') dataLength: any;

    constructor() {}

    ngOnInit(): void {}
}
