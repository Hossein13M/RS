import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-alarm-detail',
    templateUrl: './alarm-detail.component.html',
    styleUrls: ['./alarm-detail.component.scss'],
})
export class AlarmDetailComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<AlarmDetailComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {}
}
