import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mail-list',
    templateUrl: './mail-list.component.html',
    styleUrls: ['./mail-list.component.scss'],
})
export class MailListComponent implements OnInit {
    @Input() list;
    @Output() msgId = new EventEmitter<number>();

    content: any;

    constructor() {}

    showEmail(msgId: number) {
        this.msgId.emit(msgId);
    }

    ngOnInit() {}
}
