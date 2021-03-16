import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-page5',
    templateUrl: './page5.component.html',
    styleUrls: ['./page5.component.scss'],
})
export class Page5Component implements OnInit {
    labels = [{ text: '0' }, { text: '0' }];
    // Controls Form
    cf: FormGroup;
    oldValue = 0;

    constructor(private fb: FormBuilder) {
        this.cf = this.fb.group({
            minRange: [-3000, []],
            maxRange: [+3000, []],
            handValue: [200, []],
            label1: ['0', []],
            label2: ['0', []],
            reverse: [false, []],
        });

        this.cf.get('label1').valueChanges.subscribe((newLabel1) => {
            this.labels[0].text = newLabel1;
            this.labels = [...this.labels];
        });
        this.cf.get('label2').valueChanges.subscribe((newLabel2) => {
            this.labels[1].text = newLabel2;
            this.labels = [...this.labels];
        });

        this.cf.get('handValue').valueChanges.subscribe((newHandValue) => {
            this.labels[0].text = `${newHandValue}\nمقدار جدید `;
            this.cf.get('label1').setValue(this.labels[0].text);
            this.labels[1].text = `${this.oldValue}\nمقدار قبلی `;
            this.cf.get('label2').setValue(this.labels[1].text);
            this.labels = [...this.labels];
            this.oldValue = newHandValue;
        });
    }

    ngOnInit(): void {}

    randomValue(): void {
        this.cf
            .get('handValue')
            .setValue(
                Math.trunc(Math.random() * (Math.abs(this.cf.value.maxRange) + Math.abs(this.cf.value.minRange))) -
                    Math.abs(this.cf.value.minRange)
            );
    }
}
