import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CollateralsDto } from 'app/services/API/models';

@Component({
    selector: 'app-collateralls',
    templateUrl: './collateralls.component.html',
    styleUrls: ['./collateralls.component.scss'],
    animations: fuseAnimations,
})
export class CollaterallsComponent implements OnInit {
    public readonly collaterallTypes = [
        { id: 1, name: 'اوراق بهادار' },
        { id: 2, name: 'زمین و ساختمان' },
        { id: 3, name: 'ماشین آلات' },
        { id: 4, name: 'چک و سفته' },
        { id: 5, name: 'سایر' },
    ];

    public collateralMap = {
        1: 'اوراق بهادار',
        2: 'زمین و ساختمان',
        3: 'ماشین آلات',
        4: 'چک و سفته',
        5: 'سایر',
    };

    public ELEMENT_DATA: CollateralsDto[] = [];
    public dataSource = new MatTableDataSource<CollateralsDto>(this.ELEMENT_DATA);
    public displayedColumns = ['name', 'collateralTypeId', 'amount', 'edit'];
    public slectedCollaterallIndex: number;
    public collaterallForm: FormGroup;

    constructor(public matDialogRef: MatDialogRef<CollaterallsComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder) {
        this.ELEMENT_DATA = this._data.Collateralls;
        if (!this.ELEMENT_DATA) this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<CollateralsDto>(this.ELEMENT_DATA);

        this.collaterallForm = this.fb.group({
            name: ['', [Validators.required]],
            collateralTypeId: ['', [Validators.required]],
            amount: ['', [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit(): void {
        this.matDialogRef.beforeClosed().subscribe(() => this.matDialogRef.close(this.ELEMENT_DATA));
    }

    editCollaterall(Collaterall: CollateralsDto, index): void {
        this.slectedCollaterallIndex = index;
        this.collaterallForm.controls['collateralTypeId'].setValue(Collaterall.collateralTypeId);
        this.collaterallForm.controls['amount'].setValue(Collaterall.amount);
        this.collaterallForm.controls['name'].setValue(Collaterall.name);
    }

    clear(): void {
        this.slectedCollaterallIndex = null;
        this.collaterallForm.controls['collateralTypeId'].setValue(0);
        this.collaterallForm.controls['amount'].setValue(0);
        this.collaterallForm.controls['name'].setValue('');
    }

    edit(): void {
        const collateralls = this.ELEMENT_DATA;
        const findedCollaterall = collateralls[this.slectedCollaterallIndex];
        findedCollaterall.name = this.collaterallForm.controls['name'].value;
        findedCollaterall.amount = this.collaterallForm.controls['amount'].value;
        findedCollaterall.collateralTypeId = this.collaterallForm.controls['collateralTypeId'].value;
        this.dataSource = new MatTableDataSource<CollateralsDto>(this.ELEMENT_DATA);
        this.clear();
    }

    deleteCollat(index): void {
        const collateralls = this.ELEMENT_DATA;
        if (index > -1) collateralls.splice(index, 1);
        this.dataSource = new MatTableDataSource<CollateralsDto>(this.ELEMENT_DATA);
    }

    addCollat(): void {
        this.ELEMENT_DATA.push(this.collaterallForm.value);
        this.dataSource = new MatTableDataSource<CollateralsDto>(this.ELEMENT_DATA);
        this.clear();
    }
}
