import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-deposit-setting-detail',
    templateUrl: './deposit-setting-detail.component.html',
    styleUrls: ['./deposit-setting-detail.component.scss'],
})
export class DepositSettingDetailComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<DepositSettingDetailComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {}
}
