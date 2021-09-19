import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Column } from '#shared/components/table/table.model';
import * as _ from 'lodash';

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

    public data: Array<any> = [];
    public column: Array<Column> = [];

    public selectedUnderWriter: any;
    public underWriterForm: FormGroup;

    constructor(
        private _underWriterService: IssuersService,
        public matDialogRef: MatDialogRef<UnderWriterComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private formBuilder: FormBuilder
    ) {
        this._underWriterService.getIssuersList(this.searchKey.value).subscribe((res) => (this.underWriters = res));

        this.underWriterForm = this.formBuilder.group({
            underwriterId: ['', [Validators.required]],
            underwriterName: ['', [Validators.required]],
            percent: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        });
    }

    ngOnInit(): void {
        this.searchKey.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(() => this._underWriterService.getIssuersList(this.searchKey.value).subscribe((res) => (this.underWriters = res)));

        this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(this.data));

        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'underwriterName',
                name: 'پذیره نویس',
                type: 'string',
            },
            {
                id: 'percent',
                name: 'درصد',
                type: 'number',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.editUnderWriter(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
                ],
            },
        ];
    }

    get(): void {
        this.data = this._data.underwriters;
        if (!this.data) {
            this.data = [];
        }
    }

    editUnderWriter(underWriter): void {
        this.selectedUnderWriter = underWriter;
        this.searchKey.setValue(underWriter.underwriterName);
        this.underWriterForm.patchValue(underWriter);
    }

    edit(): void {
        _.assign(this.selectedUnderWriter, this.underWriterForm.value)
        this.clear();
    }

    delete(row): void {
        _.remove(this.data, { ...row });
    }

    add(): void {
        this.data.push({ id: Math.random(), ...this.underWriterForm.value });
        this.clear();
    }

    clear(): void {
        this.selectedUnderWriter = null;
        this.searchKey.setValue('');
        this.underWriterForm.reset();
    }
}
