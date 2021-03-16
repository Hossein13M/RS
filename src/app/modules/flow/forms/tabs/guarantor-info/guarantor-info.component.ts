import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GuarantorTypes } from '../../models/combo-lists';
import { GuarantorInfo } from '../../models/guarantor-info';

@Component({
    selector: 'app-guarantor-info',
    templateUrl: './guarantor-info.component.html',
    styleUrls: ['./guarantor-info.component.scss'],
    animations: fuseAnimations,
})
export class GuarantorInfoComponent implements OnInit {
    guarantorTypes = GuarantorTypes.map;

    public ELEMENT_DATA: GuarantorInfo[] = [];
    public dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['name', 'type', 'volume', 'document', 'amountUnderGuaranty', 'edit'];

    public selectedGuarantorInfoIndex: number;
    public guarantorInfoForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        type: new FormControl(),
        volume: new FormControl(),
        document: new FormControl(),
        amountUnderGuaranty: new FormControl(),
    });

    @ViewChild('myForm') myForm: NgForm;

    @Output() newData = new EventEmitter();

    constructor() {}

    @Input('data') set data(value: Array<GuarantorInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
    }

    editGuarantorInfo(guarantorInfo, index) {
        this.selectedGuarantorInfoIndex = index;
        this.guarantorInfoForm.controls['name'].setValue(guarantorInfo.name);
        this.guarantorInfoForm.controls['type'].setValue(guarantorInfo.type);
        this.guarantorInfoForm.controls['volume'].setValue(guarantorInfo.volume);
        this.guarantorInfoForm.controls['document'].setValue(guarantorInfo.document);
        this.guarantorInfoForm.controls['amountUnderGuaranty'].setValue(guarantorInfo.amountUnderGuaranty);
    }

    clear() {
        this.selectedGuarantorInfoIndex = null;
        if (this.guarantorInfoForm.valid) {
            this.newData.emit({ property: 'guarantorInfo', data: this.ELEMENT_DATA });
        }
        this.guarantorInfoForm.updateValueAndValidity();
        this.guarantorInfoForm.markAsUntouched();
        this.myForm.resetForm();
    }

    edit() {
        let toEditGuarantorInfo = this.ELEMENT_DATA[this.selectedGuarantorInfoIndex];
        toEditGuarantorInfo.name = this.guarantorInfoForm.controls['name'].value;
        toEditGuarantorInfo.type = this.guarantorInfoForm.controls['type'].value;
        toEditGuarantorInfo.volume = this.guarantorInfoForm.controls['volume'].value;
        toEditGuarantorInfo.document = this.guarantorInfoForm.controls['document'].value;
        toEditGuarantorInfo.amountUnderGuaranty = this.guarantorInfoForm.controls['amountUnderGuaranty'].value;
        this.dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
        } else {
        }
    }

    add() {
        this.ELEMENT_DATA.push(this.guarantorInfoForm.value);
        this.dataSource = new MatTableDataSource<GuarantorInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {}
}
