import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { GuarantorsService } from 'app/services/App/Guarantor/guarantor.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Column } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-guarantors',
    templateUrl: './guarantors.component.html',
    styleUrls: ['./guarantors.component.scss'],
    animations: fuseAnimations,
})
export class GuarantorsComponent implements OnInit {
    public guarantors = [];
    public searchKey: FormControl = new FormControl('');
    public selectedGuarantor: any;
    public guarantorForm: FormGroup;
    public data: Array<any> = [];
    public column: Array<Column> = [];

    constructor(
        private _guarantorsService: GuarantorsService,
        public matDialogRef: MatDialogRef<GuarantorsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private formBuilder: FormBuilder
    ) {
        this._guarantorsService.getGuarantors(this.searchKey.value).subscribe((res) => {
            this.guarantors = res;
        });

        this.guarantorForm = this.formBuilder.group({
            guarantorId: ['', [Validators.required]],
            guarantorName: ['', []],
            percent: ['', [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit(): void {
        this.searchKey.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => {
            this._guarantorsService.getGuarantors(this.searchKey.value).subscribe((res) => {
                this.guarantors = res;
            });
        });

        this.matDialogRef.beforeClosed().subscribe(() => {
            this.matDialogRef.close(this.data);
        });

        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'guarantorName',
                name: 'ضامن',
                type: 'string',
            },
            {
                id: 'percent',
                name: 'ارزش',
                type: 'number',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.editGuarantor(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.deleteCollate(row) },
                ],
            },
        ];
    }

    get(): void {
        this.data = this._data.Guarantors;
        if (!this.data) {
            this.data = [];
        }
    }

    editGuarantor(Guarantor): void {
        this.selectedGuarantor = Guarantor;
        this.guarantorForm.patchValue(Guarantor);
    }

    edit(): void {
        _.assign(this.selectedGuarantor, this.guarantorForm.value);
        this.initColumns();
        this.clear();
    }

    deleteCollate(row): void {
        _.remove(this.data, { ...row });
        this.initColumns();
    }

    addCollate(): void {
        this.guarantorForm.controls['guarantorName'].setValue(this.guarantorForm.controls['guarantorId'].value.guarantor, {
            emitEvent: false,
        });
        this.guarantorForm.controls['guarantorId'].setValue(this.guarantorForm.controls['guarantorId'].value.id);
        this.data.unshift({ id: Math.random(), ...this.guarantorForm.value });
        this.initColumns();
        this.clear();
    }

    clear(): void {
        this.selectedGuarantor = null;
        this.guarantorForm.reset();
    }
}
