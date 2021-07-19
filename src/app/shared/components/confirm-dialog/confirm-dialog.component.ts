import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    description: string;
    acceptLabel: string;
    rejectLabel: string;
    warnings: Array<string>;
}

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <div class="dialog-container">
            <div [title]="data.title ? data.title : 'حذف'" appDialogHeader>
                <mat-icon (click)="this.dialogRef.close()" class="icon-header">close</mat-icon>
            </div>

            <div style="height: 150px;padding: 15px;direction: rtl">
                <div>
                    {{ data?.description }}
                </div>

                <div mat-dialog-actions style="justify-content: flex-end;position: absolute;left: 0;bottom: 30px;">
                    <button mat-raised-button class="mat-accent mr-16" (click)="dialogRef.close(true)">
                        <mat-icon> done</mat-icon>

                        {{ data.acceptLabel ? data.acceptLabel : 'تایید' }}
                    </button>

                    <button mat-raised-button class="mat-warn mr-16" (click)="dialogRef.close(false)">
                        <mat-icon> close</mat-icon>

                        {{ data.rejectLabel ? data.rejectLabel : ' برگشت' }}
                    </button>
                </div>

                <div *ngIf="data?.warnings && data?.warnings.length > 0">
                    <ul>
                        <li *ngFor="let warning of data.warnings">
                            {{ warning }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styles: [``],
})
export class ConfirmDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}
