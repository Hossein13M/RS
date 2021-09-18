import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-contract-history-dialog',
    templateUrl: './contract-history-dialog.component.html',
    styleUrls: ['./contract-history-dialog.component.scss'],
})
export class ContractHistoryDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public contractId: string, public readonly dialog: MatDialogRef<ContractHistoryDialogComponent>) {}
}
