import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-mail-list-item',
    templateUrl: './mail-list-item.component.html',
    styleUrls: ['./mail-list-item.component.scss'],
})
export class MailListItemComponent {
    @Input() mail;

    constructor() {}
}
