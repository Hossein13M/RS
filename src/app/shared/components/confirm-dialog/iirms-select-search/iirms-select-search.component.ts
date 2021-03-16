import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-iirms-select-search',
    templateUrl: './iirms-select-search.component.html',
    styleUrls: ['./iirms-select-search.component.scss'],
})
export class IirmsSelectSearchComponent {
    @Input() data;
    @Output() result = new EventEmitter();
    @Input() showPropertyName;
    @Input() smallSize;
    @Input() has2ndPropertyName;
    @Input() valueOf2ndPropertyName;

    constructor() {}

    onItemClicked(item): void {
        this.result.emit(item);
    }
}
