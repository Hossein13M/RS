import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormElement } from '../../form-element';

@Component({
    selector: 'form-date',
    templateUrl: './form-date.component.html',
    styleUrls: ['./form-date.component.scss'],
})
export class FormDateComponent implements OnInit {
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
            helpText: ['', []],
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
