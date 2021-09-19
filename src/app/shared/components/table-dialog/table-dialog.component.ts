import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface TableDialogData {
    title: string;
    columns: Array<any>;
    data: Array<any>;
}

@Component({
    selector: 'app-table-dialog',
    template: `
        <h1 mat-dialog-title *ngIf="dialogData.title" style="text-align: center;font-weight: normal">
            {{ dialogData.title }}
        </h1>
        <div mat-dialog-content class="border">
            <app-table [data]="dialogData.data" [columns]="dialogData.columns"></app-table>
        </div>
    `,
    styles: [
        `
            .border {
                border: 1px solid gray;
                border-radius: 5px;
                margin: 0 1rem;
            }
        `,
    ],
})
export class TableDialogComponent {
    constructor(public dialogRef: MatDialogRef<TableDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: TableDialogData) {}
}
