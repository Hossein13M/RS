import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormElement } from './form-element';

@Component({
    selector: 'form-element',
    templateUrl: './form-element.component.html',
    styleUrls: ['./form-element.component.scss'],
})
export class FormElementComponent implements OnInit {
    @Input()
    minimize = false;

    @Input()
    data: FormElement;

    @Output()
    delete = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {}

    deleteThis() {
        this.delete.emit(this.data.id);
    }
}
