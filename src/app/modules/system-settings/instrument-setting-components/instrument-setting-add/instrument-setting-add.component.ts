import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '#shared/services/alert.service';
import { BourseBoardService } from 'app/services/feature-services/system-setting-services/bourse-board.service';
import { BourseMarketService } from 'app/services/feature-services/system-setting-services/bourse-market.service';
import { NewInstrumentService } from 'app/services/feature-services/system-setting-services/new-instrument.service';

@Component({
    selector: 'app-instrument-setting-add',
    templateUrl: './instrument-setting-add.component.html',
    styleUrls: ['./instrument-setting-add.component.scss'],
})
export class InstrumentSettingAddComponent implements OnInit {
    form: FormGroup;
    banks = [];
    title = '';
    markets = [];
    boards = [];

    constructor(
        public dialogRef: MatDialogRef<InstrumentSettingAddComponent>,
        private bourseMarketService: BourseMarketService,
        private alertService: AlertService,
        private bourseBoardService: BourseBoardService,
        private newInstrumentService: NewInstrumentService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    getBoard(): void {
        this.bourseBoardService.get().subscribe((res: any) => {
            this.boards = res;
        });
    }

    getMarket(): void {
        this.bourseMarketService.getBourses(this).subscribe((res: any) => {
            this.markets = res;
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
        this.getBoard();
        this.getMarket();
    }

    creatForm(): void {
        this.form = this.fb.group({
            ticker: [this.data ? this.data.ticker : '', Validators.required],
            type: [this.data ? this.data.type : '', Validators.required],
            symbol: [this.data ? this.data.symbol : ''],
            symbolEn: [this.data ? this.data.symbolEn : ''],
            name: [this.data ? this.data.name : '', Validators.required],
            nameEn: [this.data ? this.data.nameEn : ''],
            marketId: [this.data ? this.data.marketId : ''],
            boardId: [this.data ? this.data.boardId : ''],
            isInBourse: [this.data ? this.data.isInBourse : '', Validators.required],
            isActive: [this.data ? this.data.isActive : '', Validators.required],
        });
    }

    onCreateBranch(): void {
        this.newInstrumentService.createInstrument(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = this.form.value;
        obj['id'] = this.data.id;
        this.newInstrumentService.updateInstrument(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(obj);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
