import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-save-dialog',
    template: `
        <div style="padding: 10px">
            <h1 matDialogTitle style="text-align: center">آیا تغییرات ذخیره شود؟</h1>

            <mat-dialog-actions style="justify-content: center">
                <button mat-button matDialogClose="false" color="warn">لغو</button>

                <button mat-button matDialogClose="true" color="primary">ذخیره‌</button>
            </mat-dialog-actions>
        </div>
    `,
    styleUrls: [],
})
export class SaveDialogComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
