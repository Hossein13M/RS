import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { BourseIssueDateDto } from 'app/services/API/models';
import { IssueStartEndDateService } from 'app/services/issue-start-end-date/issue-start-end-date.service';
import * as moment from 'jalali-moment';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    animations: fuseAnimations,
})
export class DateComponent implements OnInit {
    public Dates = [];

    public ELEMENT_DATA: BourseIssueDateDto[] = [];
    public dataSource = new MatTableDataSource<BourseIssueDateDto>(this.ELEMENT_DATA);
    public displayedColumns = ['startDate', 'endDate', 'edit'];

    public slectedDate: number;

    public DateForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<DateComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private dateService: IssueStartEndDateService,
        private fb: FormBuilder
    ) {
        this.dateService.getDates(_data.id).subscribe(() => {});
        this.dateService.Dates.subscribe((r) => {
            this.Dates = r;
            this.ELEMENT_DATA = r;
            this.dataSource = new MatTableDataSource<BourseIssueDateDto>(this.ELEMENT_DATA);
        });

        this.DateForm = this.fb.group({
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.matDialogRef.beforeClosed().subscribe((r) => {
            this.matDialogRef.close(this.ELEMENT_DATA[this.ELEMENT_DATA.length - 1]);
        });
    }

    add(): void {
        this.dateService
            .addDate(
                this._data.id,
                this.DateForm.controls['startDate'].value.locale('en').format('YYYY-MM-DD'),
                this.DateForm.controls['endDate'].value.locale('en').format('YYYY-MM-DD')
            )
            .subscribe(() => {});
        this.clear();
    }

    clear(): void {
        this.slectedDate = null;
        this.DateForm.controls['startDate'].setValue('');
        this.DateForm.controls['endDate'].setValue('');
    }

    edit(): void {
        this.dateService
            .editDate(
                this.slectedDate,
                moment(this.DateForm.controls['startDate'].value).locale('en').format('YYYY-MM-DD'),
                moment(this.DateForm.controls['endDate'].value).locale('en').format('YYYY-MM-DD')
            )
            .subscribe(() => {});
        this.clear();
    }

    editDate(date): void {
        this.slectedDate = date.id;
        this.DateForm.controls['startDate'].setValue(new Date(date.startDate));
        this.DateForm.controls['endDate'].setValue(new Date(date.endDate));
    }

    deleteDate(id): void {
        this.dateService.delete(id).subscribe(() => {});
    }
}
