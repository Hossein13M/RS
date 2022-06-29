import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { ResponseComplianceFundDto, ResponseFundDto } from 'app/services/API/models';
import { ComplianceFundsService } from 'app/services/App/compliance/complianceFund/compliance-funds.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-compliance-fund',
    templateUrl: './compliance-fund.component.html',
    styleUrls: ['./compliance-fund.component.scss'],
    animations: fuseAnimations,
})
export class ComplianceFundComponent implements OnInit {
    public complianceFunds: ResponseComplianceFundDto[] = [];
    public funds: ResponseFundDto[] = [];
    public compliance: FormGroup;
    public searchFund: FormControl;

    public ELEMENT_DATA: ResponseComplianceFundDto[] = [];
    public slectedCompliance: boolean = false;
    public loading: boolean = false;
    public dataSource = new MatTableDataSource<ResponseComplianceFundDto>(this.ELEMENT_DATA);
    public displayedColumns = ['fund', 'up', 'down', 'edit', 'delete'];

    constructor(
        private complianceFundsService: ComplianceFundsService,
        public matDialogRef: MatDialogRef<ComplianceFundComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any
    ) {
        this.complianceFundsService.complianceFunds.subscribe((res) => {
            this.complianceFunds = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<ResponseComplianceFundDto>(this.ELEMENT_DATA);
        });
        this.complianceFundsService.funds.subscribe((res) => {
            this.funds = res;
        });
        this.complianceFundsService.getFunds().subscribe((ress) => {});

        this.complianceFundsService.getComplianceFunds(_data.compliance.id).subscribe((ress) => {});

        this.compliance = new FormGroup({
            fund: new FormControl({ disabled: this.slectedCompliance }),
            up: new FormControl(),
            down: new FormControl(),
        });

        this.searchFund = new FormControl('');
    }

    ngOnInit() {
        this.searchFund.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            if (searchText.id) {
                this.compliance.controls['fund'].setValue(searchText);
                this.searchFund.setValue(searchText.name);
                searchText = searchText.name;
            } else {
                this.complianceFundsService.getFunds(searchText).subscribe((i) => {
                    //loading
                });
            }
        });
    }

    editComplianceFund(complianceFund: ResponseComplianceFundDto) {
        this.slectedCompliance = true;
        this.compliance.controls['fund'].setValue({ name: complianceFund.fundName, id: complianceFund.id });
        this.compliance.controls['up'].setValue(complianceFund.up);
        this.compliance.controls['down'].setValue(complianceFund.down);
    }

    clear() {
        this.slectedCompliance = false;
        this.compliance.controls['fund'].setValue({ name: null, id: null });
        this.compliance.controls['up'].setValue(null);
        this.compliance.controls['down'].setValue(null);
    }

    edit() {
        this.complianceFundsService
            .editcomplianceFunds(this.compliance.controls['fund'].value.id, this.compliance.controls['up'].value, this.compliance.controls['down'].value)
            .subscribe((res) => {});
        this.clear();
    }

    deleteFund(id: number) {
        this.complianceFundsService.deleteComplianceFund(id).subscribe((res) => {});
    }

    addComplianceFund() {
        this.complianceFundsService
            .addComplianceFund(
                this._data.compliance.id,
                this.compliance.controls['fund'].value.id,
                this.compliance.controls['up'].value,
                this.compliance.controls['down'].value
            )
            .subscribe((res) => {});
        this.clear();
    }
}
