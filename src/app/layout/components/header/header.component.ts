import { Component, Input, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [fuseAnimations],
})
export class HeaderComponent implements OnInit {
    @Input() pageTitle: string;
    @Input() headerColor: ThemePalette = 'primary';

    constructor() {}

    ngOnInit(): void {}
}
