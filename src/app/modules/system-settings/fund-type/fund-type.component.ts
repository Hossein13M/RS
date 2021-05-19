import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FundTypeDto, IssuerDto } from 'app/services/API/models';
import { FundTypesService } from 'app/services/App/FundType/fund-type.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'fund-type',
    templateUrl: './fund-type.component.html',
    styleUrls: ['./fund-type.component.scss'],
    animations: fuseAnimations,
})
export class FundTypeComponent implements OnInit {
    fundTypeList: FundTypeDto[] = [];
    ELEMENT_DATA: FundTypeDto[] = [];

    searchInput: FormControl;
    public fundTypeName: FormControl;
    slectedIssuer = 0;

    dialogRef: any;
    loading = false;
    dataSource = new MatTableDataSource<FundTypeDto>(this.ELEMENT_DATA);
    displayedColumns = ['name', 'operation'];

    constructor(private fundTypeService: FundTypesService) {
        this.searchInput = new FormControl('');
        this.fundTypeName = new FormControl('');
    }

    ngOnInit(): void {
        this.fundTypeService.fundTypeList.subscribe((res) => {
            this.fundTypeList = res;
            this.ELEMENT_DATA = res;
            this.dataSource = new MatTableDataSource<IssuerDto>(this.ELEMENT_DATA);
        });

        this.fundTypeService.getFundTypes(this.searchInput.value).subscribe(() => {});

        this.searchInput.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchText) => this.fundTypeService.getFundTypes(searchText).subscribe(() => {}));
    }

    addIssuer(): void {
        this.fundTypeService.addFundType(this.fundTypeName.value).subscribe(() => {});
        this.fundTypeName.reset();
    }

    editIssuer(fundType): void {
        this.slectedIssuer = fundType.id;
        this.fundTypeName.setValue(fundType.name);
    }

    clear(): void {
        this.slectedIssuer = 0;
        this.fundTypeName.setValue('');
    }

    edit(): void {
        this.fundTypeService.editFundType(this.slectedIssuer, this.fundTypeName.value).subscribe(() => {});
    }

    remove(fundType): void {
        this.fundTypeService.deleteFundType(fundType.id).subscribe(() => {});
    }
}
