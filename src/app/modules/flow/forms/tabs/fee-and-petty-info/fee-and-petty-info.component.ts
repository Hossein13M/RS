import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { DocumentTypes, FeeAndPettyInfoType } from '../../models/combo-lists';
import { FeeAndPettyInfo } from '../../models/fee-and-petty-info';

@Component({
    selector: 'app-fee-and-petty-info',
    templateUrl: './fee-and-petty-info.component.html',
    styleUrls: ['./fee-and-petty-info.component.scss'],
    animations: fuseAnimations,
})
export class FeeAndPettyInfoComponent {
    feeMap = FeeAndPettyInfoType.map;
    documentType = DocumentTypes.map;

    public ELEMENT_DATA: FeeAndPettyInfo[] = [];
    public dataSource = new MatTableDataSource<FeeAndPettyInfo>(this.ELEMENT_DATA);
    public displayedColumns = ['type', 'contractDate', 'feeAmount', 'realDate', 'documentType', 'description', 'edit'];

    public selectedFeeAndPettyIndex: number;
    public feeAndPettyForm: FormGroup = new FormGroup({
        type: new FormControl('', [Validators.required]),
        contractDate: new FormControl('', [Validators.required]),
        feeAmount: new FormControl('', [Validators.required]),
        realDate: new FormControl('', [Validators.required]),
        documentType: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
    });

    @ViewChild('myForm') myForm: NgForm;

    @Input('data') set data(value: Array<FeeAndPettyInfo>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) this.ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource<FeeAndPettyInfo>(this.ELEMENT_DATA);
    }

    @Output() newData = new EventEmitter();

    constructor(public formsModelService: FormsModelService) {}

    editFeeAndPetty(feeAndPetty, index): void {
        this.selectedFeeAndPettyIndex = index;
        this.feeAndPettyForm.controls['type'].setValue(feeAndPetty.type);
        this.feeAndPettyForm.controls['contractDate'].setValue(feeAndPetty.contractDate);
        this.feeAndPettyForm.controls['feeAmount'].setValue(feeAndPetty.feeAmount);
        this.feeAndPettyForm.controls['realDate'].setValue(feeAndPetty.realDate);
        this.feeAndPettyForm.controls['documentType'].setValue(feeAndPetty.documentType);
        this.feeAndPettyForm.controls['description'].setValue(feeAndPetty.description);
    }

    clear(): void {
        this.selectedFeeAndPettyIndex = null;
        if (this.feeAndPettyForm.valid) this.newData.emit({ property: 'feeAndPetty', data: this.ELEMENT_DATA });
        this.myForm.resetForm();
    }

    edit(): void {
        const toEditFeeAndPetty = this.ELEMENT_DATA[this.selectedFeeAndPettyIndex];
        toEditFeeAndPetty.type = this.feeAndPettyForm.controls['type'].value;
        toEditFeeAndPetty.contractDate = this.feeAndPettyForm.controls['contractDate'].value;
        toEditFeeAndPetty.feeAmount = this.feeAndPettyForm.controls['feeAmount'].value;
        toEditFeeAndPetty.realDate = this.feeAndPettyForm.controls['realDate'].value;
        toEditFeeAndPetty.documentType = this.feeAndPettyForm.controls['documentType'].value;
        toEditFeeAndPetty.description = this.feeAndPettyForm.controls['description'].value;
        this.dataSource = new MatTableDataSource<FeeAndPettyInfo>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index): void {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<FeeAndPettyInfo>(this.ELEMENT_DATA);
        }
        this.newData.emit({ property: 'feeAndPetty', data: this.ELEMENT_DATA });
    }

    add(): void {
        this.ELEMENT_DATA.push(this.feeAndPettyForm.value);
        this.dataSource = new MatTableDataSource<FeeAndPettyInfo>(this.ELEMENT_DATA);
        this.clear();
    }
}
