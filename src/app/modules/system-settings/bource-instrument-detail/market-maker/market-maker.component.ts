import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { IssuersService } from 'app/services/App/Issuer/issuer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Column } from '#shared/components/table/table.model';
import * as _ from 'lodash';

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

    public data: Array<any> = [];
    public column: Array<Column> = [];

    public selectedMarketMaker: any;
    public marketMakerForm: FormGroup;

    constructor(
        private marketMakerService: IssuersService,
        public matDialogRef: MatDialogRef<MarketMakerComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder
    ) {
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

        this.matDialogRef.beforeClosed().subscribe(() => {
            this.matDialogRef.close(this.data);
        });
        this.initColumns();
        this.get();
    }

    initColumns(): void {
        this.column = [
            {
                id: 'markerMakerName',
                name: 'بازارگردان',
                type: 'string',
            },
            {
                id: 'percent',
                name: 'درصد',
                type: 'string',
            },
            {
                name: 'عملیات',
                id: 'operation',
                type: 'operation',
                minWidth: '130px',
                sticky: true,
                operations: [
                    { name: 'ویرایش', icon: 'create', color: 'accent', operation: ({ row }: any) => this.editMarketMaker(row) },
                    { name: 'حذف', icon: 'delete', color: 'warn', operation: ({ row }: any) => this.delete(row) },
                ],
            },
        ];
    }

    get(): void {
        this.data = this._data.marketMakers;
        if (!this.data) {
            this.data = [];
        }
    }

    editMarketMaker(marketMaker): void {
        this.selectedMarketMaker = marketMaker;
        this.searchKey.setValue(marketMaker.markerMakerName);
        this.marketMakerForm.patchValue(marketMaker);
    }

    edit(): void {
        _.assign(this.selectedMarketMaker, this.marketMakerForm.value);
        this.clear();
    }

    delete(row): void {
        _.remove(this.data, { ...row });
    }

    add(): void {
        this.data.push({ id: Math.random(), ...this.marketMakerForm.value });
        this.clear();
    }

    clear(): void {
        this.selectedMarketMaker = null;
        this.searchKey.setValue('');
        this.marketMakerForm.reset();
    }
}
