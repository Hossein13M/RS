import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { CollateralsDto } from 'app/services/API/models';
import { Column } from '#shared/components/table/table.model';
import * as _ from 'lodash';

@Component({
    selector: 'app-collateralls',
    templateUrl: './collateralls.component.html',
    styleUrls: ['./collateralls.component.scss'],
    animations: fuseAnimations,
})
export class CollaterallsComponent implements OnInit {
    public readonly collateralTypes = [
        { id: 1, name: 'اوراق بهادار' },
        { id: 2, name: 'زمین و ساختمان' },
        { id: 3, name: 'ماشین آلات' },
        { id: 4, name: 'چک و سفته' },
        { id: 5, name: 'سایر' },
    ];
    public selectedCollateral: CollateralsDto;
    public collateralMap = {
        1: 'اوراق بهادار',
        2: 'زمین و ساختمان',
        3: 'ماشین آلات',
        4: 'چک و سفته',
        5: 'سایر',
    };
    public collateralForm: FormGroup;
    data: Array<any> = [];
    column: Array<Column> = [];

    constructor(public matDialogRef: MatDialogRef<CollaterallsComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private formBuilder: FormBuilder) {
        this.collateralForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            collateralTypeId: ['', [Validators.required]],
            amount: ['', [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit(): void {
        this.initColumns();
        this.get();
        this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(this.data));
    }

    initColumns(): void {
        this.column = [
            {
                name: 'نام',
                id: 'name',
                type: 'string',
            },
            {
                name: 'نوع وثیقه',
                id: 'collateralTypeId',
                type: 'string',
                convert: (id: number) => this.collateralMap[id],
            },
            {
                name: 'ارزش',
                id: 'amount',
                type: 'string',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    {
                        name: 'ویرایش',
                        icon: 'create',
                        color: 'accent',
                        operation: ({ row }: any) => this.editCollateral(row),
                    },
                    {
                        name: 'حذف',
                        icon: 'delete',
                        color: 'warn',
                        operation: ({ row }: any) => this.deleteCollate(row),
                    },
                ],
            },
        ];
    }

    get(): void {
        this.data = this._data.Collateralls;
        if (!this.data) this.data = [];
    }

    editCollateral(Collateral: CollateralsDto): void {
        this.selectedCollateral = Collateral;
        this.collateralForm.patchValue(Collateral);
    }

    edit(): void {
        _.assign(this.selectedCollateral, this.collateralForm.value);
        this.initColumns();
        this.clear();
    }

    deleteCollate(row): void {
        _.remove(this.data, { ...row });
        this.initColumns();
    }

    addCollate(): void {
        this.data.push({ id: Math.random(), ...this.collateralForm.value });
        this.initColumns();
        this.clear();
    }

    clear(): void {
        this.selectedCollateral = null;
        this.collateralForm.reset();
    }
}
