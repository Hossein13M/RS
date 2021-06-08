import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-tree-header-selector',
    templateUrl: './tree-header-selector.component.html',
    styleUrls: ['./tree-header-selector.component.scss'],
})
export class TreeHeaderSelectorComponent implements OnInit {
    @Input() organizationId: string | number;
    @Input() headerList: Array<{ title: string; icon: string; englishTitle: string }>;

    @Output() changedSection = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    public changeSection(headerTitle: string): void {
        this.changedSection.emit({ selectedSection: headerTitle });
    }
}
