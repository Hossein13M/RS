import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FormsModelService } from 'app/services/feature-services/forms-model.service';
import { InvestorInventoriesInBeginngsOfContract } from '../../models/investor-inventories-In-beginngs-of-contract';

@Component({
    selector: 'app-investor-inventories-in-beginngs-of-contract',
    templateUrl: './investor-inventories-in-beginngs-of-contract.component.html',
    styleUrls: ['./investor-inventories-in-beginngs-of-contract.component.scss'],
    animations: fuseAnimations,
})
export class InvestorInventoriesInBeginngsOfContractComponent {
    public ELEMENT_DATA: InvestorInventoriesInBeginngsOfContract[] = [];
    public dataSource = new MatTableDataSource<InvestorInventoriesInBeginngsOfContract>(this.ELEMENT_DATA);
    public displayedColumns = [
        'date',
        'assetType',
        'securityType',
        'securitySymbol',
        'securityName',
        'securityCounts',
        'price',
        'changeType',
        'edit',
    ];

    public selectedInvestoryIndex: number;
    public investoryForm: FormGroup = new FormGroup({
        date: new FormControl(''),
        assetType: new FormControl(),
        securityType: new FormControl(),
        securitySymbol: new FormControl(),
        securityName: new FormControl(),
        securityCounts: new FormControl(),
        price: new FormControl(),
        changeType: new FormControl(),
    });

    constructor(public formsModelService: FormsModelService) {}

    @Output() newData = new EventEmitter();
    @ViewChild('myForm') myForm: NgForm;

    @Input('data') set data(value: Array<InvestorInventoriesInBeginngsOfContract>) {
        this.ELEMENT_DATA = value;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<InvestorInventoriesInBeginngsOfContract>(this.ELEMENT_DATA);
    }

    editInvestory(investory, index) {
        this.selectedInvestoryIndex = index;
        this.investoryForm.controls['date'].setValue(investory.date);
        this.investoryForm.controls['assetType'].setValue(investory.assetType);
        this.investoryForm.controls['securityType'].setValue(investory.securityType);
        this.investoryForm.controls['securitySymbol'].setValue(investory.securitySymbol);
        this.investoryForm.controls['securityName'].setValue(investory.securityName);
        this.investoryForm.controls['securityCounts'].setValue(investory.securityCounts);
        this.investoryForm.controls['price'].setValue(investory.price);
        this.investoryForm.controls['changeType'].setValue(investory.changeType);
    }

    clear() {
        this.selectedInvestoryIndex = null;
        if (this.investoryForm.valid) {
            this.newData.emit({ property: 'feeAndPetty', data: this.ELEMENT_DATA });
        }
        this.myForm.resetForm();
    }

    edit() {
        let toEditInvestory = this.ELEMENT_DATA[this.selectedInvestoryIndex];
        toEditInvestory.date = this.investoryForm.controls['date'].value;
        toEditInvestory.assetType = this.investoryForm.controls['assetType'].value;
        toEditInvestory.securityType = this.investoryForm.controls['securityType'].value;
        toEditInvestory.securitySymbol = this.investoryForm.controls['securitySymbol'].value;
        toEditInvestory.securityName = this.investoryForm.controls['securityName'].value;
        toEditInvestory.securityCounts = this.investoryForm.controls['securityCounts'].value;
        toEditInvestory.price = this.investoryForm.controls['price'].value;
        toEditInvestory.changeType = this.investoryForm.controls['changeType'].value;

        this.dataSource = new MatTableDataSource<InvestorInventoriesInBeginngsOfContract>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index) {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<InvestorInventoriesInBeginngsOfContract>(this.ELEMENT_DATA);
        }
    }

    add() {
        this.ELEMENT_DATA.push(this.investoryForm.value);
        this.dataSource = new MatTableDataSource<InvestorInventoriesInBeginngsOfContract>(this.ELEMENT_DATA);
        this.clear();
    }

    ngOnDestroy(): void {}
}
