import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-cardboard-pause-contract-dialog',
    templateUrl: './cardboard-pause-contract-dialog.component.html',
    styleUrls: ['./cardboard-pause-contract-dialog.component.scss'],
})
export class CardboardPauseContractDialogComponent {
    public note: string;
    constructor(private dialog: MatDialogRef<CardboardPauseContractDialogComponent>) {}

    public onCloseDialog(hasConfirmed: boolean): void {
        hasConfirmed ? this.dialog.close(this.note) : this.dialog.close();
    }
}
