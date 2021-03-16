import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TradeDashboardService } from './trade-dashboard.service';

@Component({
    selector: 'app-trade-dashboard',
    templateUrl: './trade-dashboard.component.html',
    styleUrls: ['./trade-dashboard.component.scss'],
})
export class TradeDashboardComponent implements OnInit {
    searchFormGroup: FormGroup;
    today = new Date();

    constructor(public tds: TradeDashboardService) {}

    ngOnInit(): void {}
}
