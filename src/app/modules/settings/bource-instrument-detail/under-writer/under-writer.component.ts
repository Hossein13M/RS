import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { UnderwritersDto } from 'app/services/API/models';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-under-writer',
    templateUrl: './under-writer.component.html',
    styleUrls: ['./under-writer.component.scss'],
    providers: [IssuersService],
    animations: fuseAnimations,
})
export class UnderWriterComponent implements OnInit {
    public underWriters = [];
    public searchKey: FormControl = new FormControl('');

    public ELEMENT_DATA: UnderwritersDto[] = [];
    public dataSource = new MatTableDataSource<UnderwritersDto>(this.ELEMENT_DATA);
    public displayedColumns = ['underwriterName', 'percent', 'edit'];

    public selectedUnderWriterIndex: number;
    public underWriterForm: FormGroup;

    constructor(
        private underWriterService: IssuersService,
        public matDialogRef: MatDialogRef<UnderWriterComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder
    ) {
        this.ELEMENT_DATA = this._data.underwriters;
        if (!this.ELEMENT_DATA) this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<UnderwritersDto>(this.ELEMENT_DATA);
        this.underWriterService.getIssuersList(this.searchKey.value).subscribe((res) => (this.underWriters = res));

        this.underWriterForm = this.fb.group({
            underwriterId: ['', [Validators.required]],
            underwriterName: ['', [Validators.required]],
            percent: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        });
    }

    ngOnInit(): void {
        this.searchKey.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(() => this.underWriterService.getIssuersList(this.searchKey.value).subscribe((res) => (this.underWriters = res)));

        this.matDialogRef.beforeClosed().subscribe((r) => this.matDialogRef.close(this.ELEMENT_DATA));
    }

    editUnderWriter(underWriter, index): void {
        this.selectedUnderWriterIndex = index;
        this.searchKey.setValue(underWriter.underwriterName);
        this.underWriterForm.controls['underwriterName'].setValue(underWriter.underwriterName);
        this.underWriterForm.controls['underwriterId'].setValue(underWriter.underwriterId);
        this.underWriterForm.controls['percent'].setValue(underWriter.percent);
    }

    clear(): void {
        this.selectedUnderWriterIndex = null;
        this.searchKey.setValue('');
        this.underWriterForm.controls['underwriterName'].setValue('');
        this.underWriterForm.controls['underwriterId'].setValue(0);
        this.underWriterForm.controls['percent'].setValue(0);
    }

    edit(): void {
        const toEditUnderWriter = this.ELEMENT_DATA[this.selectedUnderWriterIndex];
        toEditUnderWriter.underwriterId = this.underWriterForm.controls['underwriterId'].value;
        toEditUnderWriter.underwriterName = this.underWriterForm.controls['underwriterName'].value;
        toEditUnderWriter.percent = this.underWriterForm.controls['percent'].value;
        this.dataSource = new MatTableDataSource<UnderwritersDto>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index): void {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<UnderwritersDto>(this.ELEMENT_DATA);
        }
    }

    add(): void {
        this.ELEMENT_DATA.push(this.underWriterForm.value);
        this.dataSource = new MatTableDataSource<UnderwritersDto>(this.ELEMENT_DATA);
        this.clear();
    }
}
