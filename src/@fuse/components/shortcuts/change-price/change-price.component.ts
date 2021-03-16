import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePriceDialogComponent } from './change-price-dialog/change-price-dialog.component';

@Component({
    selector: 'app-change-price',
    template: `
        <button mat-icon-button (click)="openChangePriceDialog()">
            <mat-icon class="mat-18">monetization_on</mat-icon>
        </button>
    `,
    styles: [],
})
export class ChangePriceComponent implements OnInit {
    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    openChangePriceDialog(): void {
        this.dialog.open(ChangePriceDialogComponent, {
            panelClass: 'dialog-w40',
        });
    }
}
