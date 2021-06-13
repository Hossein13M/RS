import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private snackBar: MatSnackBar) {}

    public onError(message, hasAction?): void {
        this.snackBar.open(message, hasAction, { panelClass: 'snack-error', duration: 3000, direction: 'rtl' });
    }

    public onSuccess(message, hasAction?): void {
        this.snackBar.open(message, hasAction, { panelClass: 'snack-success', duration: 3000, direction: 'rtl' });
    }

    public onInfo(message, hasAction?): void {
        this.snackBar.open(message, hasAction, { panelClass: 'snack-info', duration: 3000, direction: 'rtl' });
    }
}
