import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cardboard',
    templateUrl: './cardboard-list.component.html',
    styleUrls: ['./cardboard-list.component.scss'],
})
export class CardboardListComponent implements OnInit {
    constructor(private readonly router: Router) {}

    ngOnInit(): void {}
}
