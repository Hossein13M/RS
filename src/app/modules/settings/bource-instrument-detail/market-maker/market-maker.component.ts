import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { MarketMakersDto } from 'app/services/API/models';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-market-maker',
    templateUrl: './market-maker.component.html',
    styleUrls: ['./market-maker.component.scss'],
    providers: [IssuersService],
    animations: fuseAnimations,
})
export class MarketMakerComponent implements OnInit {
    public marketMakers = [];
    public searchKey: FormControl = new FormControl('');

    public ELEMENT_DATA: MarketMakersDto[] = [];
    public dataSource = new MatTableDataSource<MarketMakersDto>(this.ELEMENT_DATA);
    public displayedColumns = ['markerMakerName', 'percent', 'edit'];

    public selectedMarketMakerIndex: number;
    public marketMakerForm: FormGroup;

    constructor(
        private marketMakerService: IssuersService,
        public matDialogRef: MatDialogRef<MarketMakerComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder
    ) {
        this.ELEMENT_DATA = this._data.marketMakers;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<MarketMakersDto>(this.ELEMENT_DATA);

        this.marketMakerService.getIssuersList(this.searchKey.value).subscribe((res) => {
            this.marketMakers = res;
        });

        this.marketMakerForm = this.fb.group({
            markerMakerId: ['', [Validators.required]],
            markerMakerName: ['', [Validators.required]],
            percent: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        });
    }

    ngOnInit(): void {
        this.searchKey.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.marketMakerService.getIssuersList(this.searchKey.value).subscribe((res) => {
                this.marketMakers = res;
            });
        });

        this.matDialogRef.beforeClosed().subscribe((r) => {
            this.matDialogRef.close(this.ELEMENT_DATA);
        });
    }

    editMarketMaker(marketMaker, index): void {
        this.selectedMarketMakerIndex = index;
        this.searchKey.setValue(marketMaker.markerMakerName);
        this.marketMakerForm.controls['markerMakerName'].setValue(marketMaker.markerMakerName);
        this.marketMakerForm.controls['markerMakerId'].setValue(marketMaker.markerMakerId);
        this.marketMakerForm.controls['percent'].setValue(marketMaker.percent);
    }

    clear(): void {
        this.selectedMarketMakerIndex = null;
        this.searchKey.setValue('');
        this.marketMakerForm.controls['markerMakerName'].setValue('');
        this.marketMakerForm.controls['markerMakerId'].setValue(0);
        this.marketMakerForm.controls['percent'].setValue(0);
    }

    edit(): void {
        const toEditMarketMaker = this.ELEMENT_DATA[this.selectedMarketMakerIndex];
        toEditMarketMaker.markerMakerId = this.marketMakerForm.controls['markerMakerId'].value;
        toEditMarketMaker.markerMakerName = this.marketMakerForm.controls['markerMakerName'].value;
        toEditMarketMaker.percent = this.marketMakerForm.controls['percent'].value;
        this.dataSource = new MatTableDataSource<MarketMakersDto>(this.ELEMENT_DATA);
        this.clear();
    }

    delete(index): void {
        if (index > -1) {
            this.ELEMENT_DATA.splice(index, 1);
            this.dataSource = new MatTableDataSource<MarketMakersDto>(this.ELEMENT_DATA);
        }
    }

    add(): void {
        this.ELEMENT_DATA.push(this.marketMakerForm.value);
        this.dataSource = new MatTableDataSource<MarketMakersDto>(this.ELEMENT_DATA);
        this.clear();
    }
}
