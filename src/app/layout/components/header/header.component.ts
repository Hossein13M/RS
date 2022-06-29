import { Component, Input, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [fuseAnimations],
})
export class HeaderComponent implements OnInit {
    @Input() pageTitle: string;
    @Input() headerColor: string = 'primary-400';

    constructor() {}

    ngOnInit(): void {}
}
