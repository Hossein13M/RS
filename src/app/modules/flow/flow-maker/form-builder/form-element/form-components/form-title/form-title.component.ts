import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormElement } from '../../form-element';

@Component({
    selector: 'form-title',
    templateUrl: './form-title.component.html',
    styleUrls: ['./form-title.component.scss'],
})
export class FormTitleComponent implements OnInit {
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
            valueType: ['default', [Validators.required]],
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
