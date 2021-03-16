import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormElement } from '../../form-element';

@Component({
    selector: 'form-button',
    templateUrl: './form-button.component.html',
    styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnInit {
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
            valueType: ['default'],
            builderType: ['confirm'],
            style: ['button'],
            required: [false],
            requiredErrorMsg: [''],
        });
        this.data.form.push(this.valueForm);
    }

    deleteThis() {
        this.delete.emit(this.data.id);
    }
}
