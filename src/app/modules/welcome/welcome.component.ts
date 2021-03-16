import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
    animations: fuseAnimations,
})
export class WelcomeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
