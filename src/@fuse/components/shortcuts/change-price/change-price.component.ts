import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePriceDialogComponent } from './change-price-dialog/change-price-dialog.component';

@Component({
    selector: 'app-change-price',
    template: `
        <div fxLayout="row" fxLayoutAlign="space-around center">
            <button mat-icon-button (click)="openChangePriceDialog()">
                <mat-icon class="mat-18">monetization_on</mat-icon>
            </button>
            <p>
                {{ priceUnitScaleString }}
                {{ priceUnit.unit === 'rial' ? 'ریال' : 'تومان' }}
            </p>
        </div>
    `,
    styles: [
        `
            p {
                font-size: 14px;
            }
        `,
    ],
})
export class ChangePriceComponent implements OnInit {
    priceUnit = { scale: 0, unit: 'rial' };
    priceUnitScaleString: string = '';

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {
        this.setPriceUnitValue();
    }

    ngOnChanges(): void {}

    public openChangePriceDialog(): void {
        this.dialog
            .open(ChangePriceDialogComponent, { panelClass: 'dialog-w40' })
            .afterClosed()
            .subscribe(() => this.setPriceUnitValue());
    }

    private setPriceUnitValue(): void {
        let localStoragePriceUnit = JSON.parse(localStorage.getItem('priceUnit'));
        if (!!localStoragePriceUnit) this.priceUnit = localStoragePriceUnit;

        switch (this.priceUnit.scale) {
            case 0:
                this.priceUnitScaleString = '';
                break;
            case 3:
                this.priceUnitScaleString = 'هزار';
                break;
            case 6:
                this.priceUnitScaleString = 'میلیون';
                break;
            case 9:
                this.priceUnitScaleString = 'میلیارد';
                break;
            case 12:
                this.priceUnitScaleString = 'هزار میلیارد';
                break;
        }
    }
}
