import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-trade-dashboard',
    templateUrl: './trade-dashboard.component.html',
    styleUrls: ['./trade-dashboard.component.scss'],
})
export class TradeDashboardComponent implements OnInit {
    form: FormGroup = this.fb.group({ date: [new Date(), Validators.required] });
    today = new Date();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}
}
