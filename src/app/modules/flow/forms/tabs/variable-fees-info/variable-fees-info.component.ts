import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { VariableFeesInfo } from '../../models/variable-fees-info';

@Component({
    selector: 'app-variable-fees-info',
    templateUrl: './variable-fees-info.component.html',
    styleUrls: ['./variable-fees-info.component.scss'],
    animations: fuseAnimations,
})
export class VariableFeesInfoComponent {
    public ELEMENT_DATA: VariableFeesInfo[] = [];
    public dataSource = new MatTableDataSource<VariableFeesInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['lowerBound', 'upperBound', 'excessReturnPercent', 'edit'];

    @ViewChild('myForm') myForm: NgForm;

    @Output() newData = new EventEmitter();

    public selectedVariableFeeIndex: number;
    public variableFeeForm: FormGroup = new FormGroup({
        lowerBound: new FormControl(0),
        upperBound: new FormControl(0),
        excessReturnPercent: new FormControl(0),
    });

    constructor() {}

    @Input('data') set data(value: Array<VariableFeesInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<VariableFeesInfo>(this.ELEMENT_DATA);
    }

    editVariableFee(variableFee, index) {
        this.selectedVariableFeeIndex = index;
        this.variableFeeForm.controls['lowerBound'].setValue(variableFee.lowerBound);
        this.variableFeeForm.controls['upperBound'].setValue(variableFee.upperBound);
        this.variableFeeForm.controls['excessReturnPercent'].setValue(variableFee.excessReturnPercent);
    }

    clear() {
        this.selectedVariableFeeIndex = null;
        if (this.variableFeeForm.valid) {
            this.newData.emit({ property: 'variableFeesInfo', data: this.ELEMENT_DATA });
        }
        this.myForm.resetForm();
    }

    edit() {
        let toEditVariableFee = this.ELEMENT_DATA[this.selectedVariableFeeIndex];
        toEditVariableFee.lowerBound = this.variableFeeForm.controls['lowerBound'].value;
        toEditVariableFee.upperBound = this.variableFeeForm.controls['upperBound'].value;
        toEditVariableFee.excessReturnPercent = this.variableFeeForm.controls['excessReturnPercent'].value;

        this.dataSource = new MatTableDataSource<VariableFeesInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<VariableFeesInfo>(this.ELEMENT_DATA);
        }
        this.newData.emit({ property: 'variableFeesInfo', data: this.ELEMENT_DATA });
    }

    add() {
        this.ELEMENT_DATA.push(this.variableFeeForm.value);
        this.dataSource = new MatTableDataSource<VariableFeesInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}
}
