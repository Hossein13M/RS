import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardboardService } from '../../cardboard.service';
import { FinalForm } from '../../cardboard.model';

@Component({
    selector: 'app-cardboard-form-viewer-dialog',
    templateUrl: './cardboard-form-viewer-dialog.component.html',
    styleUrls: ['./cardboard-form-viewer-dialog.component.scss'],
})
export class CardboardFormViewerDialogComponent implements OnInit {
    public loading: boolean = false;
    constructor(
        public dialog: MatDialogRef<CardboardFormViewerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: { contractId: string; data: FinalForm },
        private readonly cardboardService: CardboardService
    ) {}

    ngOnInit(): void {
    }

    public handleFormViewerInfo(event) {
        this.cardboardService.sendFinalFormData({ contract: this.dialogData.contractId, data: [event] }).subscribe((result) => console.log(result));
        // console.log(event);
    }
}
