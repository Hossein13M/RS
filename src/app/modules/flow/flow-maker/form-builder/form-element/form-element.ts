import { FormArray } from '@angular/forms';

export enum FormElementType {
    DATE = 'DATE',
    TITLE = 'TITLE',
    TEXTFIELD = 'TEXTFIELD',
    NUMBER = 'NUMBER',
    BUTTON = 'BUTTON',
}

export class FormElement {
    type: FormElementType;
    id: number;
    form: FormArray;

    constructor(type: FormElementType, id: number, form: FormArray) {
        this.type = type;
        this.id = id;
        this.form = form;
    }
}
