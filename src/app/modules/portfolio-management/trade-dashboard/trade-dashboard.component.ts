import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-trade-dashboard',
    templateUrl: './trade-dashboard.component.html',
    styleUrls: ['./trade-dashboard.component.scss'],
})
export class TradeDashboardComponent {
    form: FormGroup;
    today = new Date();

    constructor(private fb: FormBuilder) {
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        this.form = this.fb.group({ date: [lastDay, [Validators.required]] });
    }
}
