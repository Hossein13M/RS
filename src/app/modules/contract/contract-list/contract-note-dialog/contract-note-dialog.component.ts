import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-contract-note-dialog',
    templateUrl: './contract-note-dialog.component.html',
    styleUrls: ['./contract-note-dialog.component.scss'],
})
export class ContractNoteDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public contractId: string, public readonly dialog: MatDialogRef<ContractNoteDialogComponent>) {}
}
