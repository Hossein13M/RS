import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-show-code-dialog',
    templateUrl: './show-code-dialog.component.html',
    styleUrls: ['./show-code-dialog.component.scss'],
})
export class ShowCodeDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}
}
