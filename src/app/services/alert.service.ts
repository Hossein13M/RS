import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private snackBar: MatSnackBar) {}

    onError(message, hasAction?): void {
        this.snackBar.open(message, hasAction, { panelClass: 'snack-error', duration: 3000, direction: 'rtl' });
    }

    onSuccess(message, hasAction?): void {
        this.snackBar.open(message, hasAction, { panelClass: 'snack-success', duration: 3000, direction: 'rtl' });
    }
}
