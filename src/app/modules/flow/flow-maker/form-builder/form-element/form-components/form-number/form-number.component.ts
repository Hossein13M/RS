import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormElement } from '../../form-element';

@Component({
    selector: 'form-number',
    templateUrl: './form-number.component.html',
    styleUrls: ['./form-number.component.scss'],
})
export class FormNumberComponent implements OnInit {
    @Input()
    data: FormElement;

    @Output()
    delete = new EventEmitter<number>();

    valueForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.valueForm = this.fb.group({
            id: [this.data.id],
            type: [this.data.type],
            name: ['', [Validators.required]],
            defaultValue: ['', []],
            maxValue: [100, []],
            minValue: [0, []],
            step: [1, []],
            class: ['', []],

            required: [false],
            requiredErrorMsg: ['', [Validators.required]],
        });
        this.data.form.push(this.valueForm);
    }

    deleteThis() {
        this.delete.emit(this.data.id);
    }
}
