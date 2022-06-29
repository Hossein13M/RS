import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePriceDialogComponent } from './change-price-dialog/change-price-dialog.component';

@Component({
    selector: 'app-change-price',
    template: `
        <button mat-button (click)="openChangePriceDialog()" class="flex items-center border-r-2 border-l-2">
            <span>
                یکای پول:
                {{ priceUnitScaleString }}
                {{ priceUnit.unit === 'rial' ? 'ریال' : 'تومان' }}
            </span>
        </button>
    `,
    styles: [
        `
            button {
                min-width: 64px;
                height: 64px;
            }
            p {
                font-size: 14px;
            }
        `,
    ],
})
export class ChangePriceComponent implements OnInit {
    public priceUnit = { scale: 0, unit: 'rial' };
    public priceUnitScaleString: string = '';

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {
        this.setPriceUnitValue();
    }

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
