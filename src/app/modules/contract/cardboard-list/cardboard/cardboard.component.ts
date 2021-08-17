import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cardboard',
    templateUrl: './cardboard.component.html',
    styleUrls: ['./cardboard.component.scss'],
})
export class CardboardComponent {
    constructor(private readonly router: Router) {}

    public navigateToCardboard() {
        this.router.navigate(['/contract/cardboard']).finally();
    }
}
