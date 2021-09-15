import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-cardboard-upload-dialog',
    templateUrl: './cardboard-upload-dialog.component.html',
    styleUrls: ['./cardboard-upload-dialog.component.scss'],
})
export class CardboardUploadDialogComponent implements OnInit {
    constructor(public dialog: MatDialogRef<CardboardUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

    ngOnInit(): void {
        console.log(this.dialogData);
    }
}
