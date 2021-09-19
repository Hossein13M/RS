import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-cardboard-pause-contract-dialog',
    templateUrl: './cardboard-note-dialog.component.html',
    styleUrls: ['./cardboard-note-dialog.component.scss'],
})
export class CardboardNoteDialogComponent {
    public note: string;

    constructor(
        private dialog: MatDialogRef<CardboardNoteDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public dialogData: {
            headerNote: string;
            buttonText: string;
            buttonIcon: string;
            buttonColor: ThemePalette;
        }
    ) {}

    public onCloseDialog(hasConfirmed: boolean): void {
        hasConfirmed ? this.dialog.close(this.note) : this.dialog.close();
    }
}
