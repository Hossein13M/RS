import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/alert.service';
import { CardboardService } from '../../cardboard.service';
import { CardBoardDownloadFiles, DownloadFileSearchParams } from '../../cardboard.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Column } from '#shared/components/table/table.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-cardboard-download-dialog',
    templateUrl: './cardboard-download-dialog.component.html',
    styleUrls: ['./cardboard-download-dialog.component.scss'],
})
export class CardboardDownloadDialogComponent implements OnInit {
    public filesList: Array<CardBoardDownloadFiles>;
    public form: FormGroup = this.fb.group({ fromDate: [null], toDate: [null], type: [null], fileName: [null] });
    public pagination = { skip: 0, limit: 5, total: 100 };
    public tableColumn: Array<Column> = [
        { id: 'index', type: 'index', minWidth: '50px' },
        { id: 'fileName', name: 'نام فایل', type: 'string', minWidth: '50px' },
        { id: 'description', name: 'توضیحات', type: 'string', minWidth: '50px' },
        {
            id: 'type',
            name: 'نوع فایل',
            convert: (value) => CardboardDownloadDialogComponent.convertFileTypeToPersian(value),
            type: 'string',
            minWidth: '50px',
        },
        { id: 'createdAt', name: 'تاریخ ساخت', convert: (value) => UtilityFunctions.convertDateToPersianDateString(value), type: 'string', minWidth: '50px' },
        { id: 'isActive', name: 'وضعیت فرم', convert: (value) => (value ? 'فعال' : 'غیر فعال'), type: 'string', minWidth: '50px' },
        {
            name: 'عملیات',
            id: 'operation',
            type: 'operation',
            minWidth: '50px',
            sticky: true,
            showSearchButtons: false,
            operations: [
                {
                    name: 'دانلود فایل',
                    icon: 'get_app',
                    color: 'primary',
                    operation: (row: { operationItem: any; row: CardBoardDownloadFiles }) => this.downloadFile(row.row.fileName, row.row.url),
                },
            ],
        },
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public contractId: string,
        public dialog: MatDialogRef<CardboardDownloadDialogComponent>,
        private readonly alertService: AlertService,
        private readonly cardBoardService: CardboardService,
        private readonly fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getFilesList();
    }

    private getFilesList(searchParams?: DownloadFileSearchParams): void {
        this.cardBoardService.getDownloadedFilesList(searchParams ? searchParams : { contract: this.contractId }).subscribe(
            (response) => (this.filesList = response),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    public onSearchFile(): void {
        const searchParams: DownloadFileSearchParams = { ...this.form.value, contract: this.contractId };
        Object.keys(searchParams).forEach((key) => searchParams[key] == null && delete searchParams[key]);
        if (searchParams.toDate) searchParams.toDate = UtilityFunctions.convertDateToGregorianFormatForServer(new Date(searchParams.toDate));
        if (searchParams.fromDate) searchParams.toDate = UtilityFunctions.convertDateToGregorianFormatForServer(new Date(searchParams.fromDate));

        this.getFilesList(searchParams);
    }

    public downloadFile(fileName: string, url: string): void {
        this.cardBoardService.downloadCounterTrigger({ contract: this.contractId, fileName: fileName }).subscribe(() => window.open(url, '_blank'));
    }

    static convertFileTypeToPersian(fileTypeEngName: string): string {
        const fileTypes: Array<{ perName: string; engName: string }> = [
            { perName: 'امضا شده', engName: 'signed' },
            { perName: 'امضا نشده', engName: 'unsigned' },
            { perName: 'پیش‌نویس', engName: 'draft' },
        ];
        return fileTypes.find((fileType) => fileType.engName === fileTypeEngName).perName;
    }
}
