import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-comment-dialog',
    template: `
        <div style="padding: 20px">
            <h1 matDialogTitle style="text-align: center">اضافه کردن یادداشت</h1>

            <mat-dialog-content>
                <mat-form-field appearance="legacy" style="width: 100%" dir="rtl">
                    <textarea style="text-align: right;width: 100%" placeholder="متن یادداشت" matInput type="text" [(ngModel)]="comment"> </textarea>
                </mat-form-field>
            </mat-dialog-content>

            <mat-dialog-actions style="justify-content: center">
                <button mat-button matDialogClose color="warn">لغو</button>

                <button mat-button [disabled]="!comment" [matDialogClose]="comment" color="primary">اضافه کردن</button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [],
})
export class AddCommentDialogComponent implements OnInit {
    comment: any;

    constructor() {}

    ngOnInit(): void {}
}
