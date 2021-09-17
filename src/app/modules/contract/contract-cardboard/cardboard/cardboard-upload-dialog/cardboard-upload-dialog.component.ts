import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '#services/alert.service';
import { CardboardService } from '../../cardboard.service';

@Component({
    selector: 'app-cardboard-upload-dialog',
    templateUrl: './cardboard-upload-dialog.component.html',
    styleUrls: ['./cardboard-upload-dialog.component.scss'],
})
export class CardboardUploadDialogComponent implements OnInit {
    public form: FormGroup = this.fb.group({
        contract: [null, Validators.required],
        fileName: [null, Validators.required],
        description: [null],
        type: ['draft', Validators.required],
        file: [null],
    });
    constructor(
        public dialog: MatDialogRef<CardboardUploadDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: { contractId: number; hasSignedFile: boolean },
        private readonly fb: FormBuilder,
        private readonly alertService: AlertService,
        private readonly cardBoardService: CardboardService
    ) {}

    ngOnInit(): void {
        this.setUploadFormBase();
        console.log(this.dialogData);
    }

    private setUploadFormBase(): void {
        this.form.get('contract').setValue(this.dialogData.contractId);
        this.dialogData.hasSignedFile ? this.form.get('description').setValidators([Validators.required]) : this.form.get('description').setValidators([]);
        this.form.updateValueAndValidity();
    }

    public submitForm(): void {
        const formData: FormData = new FormData();
        Object.keys(this.form.value).map((key) => formData.append(key, this.form.value[key]));
        this.uploadFile(formData);
        // const file = (document.getElementById('uploadFile') as HTMLInputElement).files[0];
        // if (!file) {
        //     this.alertService.onError('فایل را آپلود کنید');
        //     return;
        // } else {
        //     this.form.get('file').patchValue(file);
        //     this.form.updateValueAndValidity();
        //     formData.append('file', file);
        //     this.uploadFile(this.form.value);
        // }
    }

    public addFileToForm(event): void {
        // const file = (event.target as HTMLInputElement).files[0];
        const file = event.target.files[0]
        this.form.get('file').patchValue(file);
        this.form.updateValueAndValidity();
    }

    private uploadFile(formData: any): void {
        this.cardBoardService.uploadFileInContractCarddboard(formData).subscribe((result) => console.log(result));
    }

    public triggerFileSelect(): void {
        document.getElementById('uploadFile')?.click();
    }
}
