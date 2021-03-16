import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { CollateralInfo } from '../../models/collateral-info';
import { CollaterallTypes } from '../../models/combo-lists';

@Component({
    selector: 'app-collateral-info',
    templateUrl: './collateral-info.component.html',
    styleUrls: ['./collateral-info.component.scss'],
    animations: fuseAnimations,
})
export class CollateralInfoComponent {
    public collateralMap = CollaterallTypes.map;

    public ELEMENT_DATA: CollateralInfo[] = [];
    public dataSource = new MatTableDataSource<CollateralInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['owner', 'underValue', 'marketValue', 'type', 'description', 'marketValueDate', 'date', 'edit'];
    public selectedCollateralIndex: number;
    public collateralForm: FormGroup = new FormGroup({
        owner: new FormControl('', [Validators.required]),
        underValue: new FormControl(0, [Validators.required]),
        marketValue: new FormControl(0, [Validators.required]),
        type: new FormControl(0, [Validators.required]),
        description: new FormControl('', [Validators.required]),
        marketValueDate: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
    });

    constructor() {}

    @ViewChild('myForm') myForm: NgForm;

    @Input('data') set data(value: Array<CollateralInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<CollateralInfo>(this.ELEMENT_DATA);
    }

    @Output() newData = new EventEmitter();

    editCollateral(collateral, index) {
        this.selectedCollateralIndex = index;
        this.collateralForm.controls['owner'].setValue(collateral.owner);
        this.collateralForm.controls['underValue'].setValue(collateral.underValue);
        this.collateralForm.controls['marketValue'].setValue(collateral.marketValue);
        this.collateralForm.controls['type'].setValue(collateral.type);
        this.collateralForm.controls['description'].setValue(collateral.description);
        this.collateralForm.controls['marketValueDate'].setValue(collateral.marketValueDate);
        this.collateralForm.controls['date'].setValue(collateral.date);
    }

    clear() {
        this.selectedCollateralIndex = null;
        if (this.collateralForm.valid) this.newData.emit({ property: 'collateralInfo', data: this.ELEMENT_DATA });
        this.myForm.resetForm();
    }

    edit() {
        let toEditCollateral = this.ELEMENT_DATA[this.selectedCollateralIndex];
        toEditCollateral.owner = this.collateralForm.controls['owner'].value;
        toEditCollateral.underValue = this.collateralForm.controls['underValue'].value;
        toEditCollateral.marketValue = this.collateralForm.controls['marketValue'].value;
        toEditCollateral.type = this.collateralForm.controls['type'].value;
        toEditCollateral.description = this.collateralForm.controls['description'].value;
        toEditCollateral.marketValueDate = this.collateralForm.controls['marketValueDate'].value;
        toEditCollateral.date = this.collateralForm.controls['date'].value;
        this.dataSource = new MatTableDataSource<CollateralInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<CollateralInfo>(this.ELEMENT_DATA);
        }
        this.clear();
    }

    add() {
        this.ELEMENT_DATA.push(this.collateralForm.value);
        this.dataSource = new MatTableDataSource<CollateralInfo>(this.ELEMENT_DATA);
        this.clear();
    }
}
