import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { BourseInstrumentDetailService } from 'app/services/feature-services/bourse-instrument-detail.service';
import { BrokerSettingService } from 'app/services/feature-services/system-setting-services/broker-setting.service';
import { FundSettingService } from 'app/services/feature-services/system-setting-services/fund-setting.service';
import { MarketSettingService } from 'app/services/feature-services/system-setting-services/market-setting.service';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'app-market-setting-add',
    templateUrl: './market-setting-add.component.html',
    styleUrls: ['./market-setting-add.component.scss'],
})
export class MarketSettingAddComponent implements OnInit {
    form: FormGroup;
    public symbolORFundTitleSearchKeyword: FormControl = new FormControl('');
    title = '';
    banks = [];
    funds = [];
    bonds = [];
    brockers = [];

    constructor(
        public dialogRef: MatDialogRef<MarketSettingAddComponent>,
        private AlertService: AlertService,
        private bankService: BankService,
        private borckerService: BrokerSettingService,
        private bourseBonds: BourseInstrumentDetailService,
        private marketSettingService: MarketSettingService,
        private fundSettingService: FundSettingService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    getBourse(searchKeyword?: string) {
        this.bourseBonds.getBonds(searchKeyword, this).subscribe((res: any) => {
            this.bonds = res.items;
            console.log(searchKeyword, res.length);
        });
    }

    getFunds() {
        this.fundSettingService.getAllNoPaging(this).subscribe((res: any) => {
            this.funds = res.items;
        });
    }

    getBrockers() {
        this.borckerService.getBrokerSettings(this).subscribe((res: any) => {
            this.brockers = res;
        });
    }

    ngOnInit() {
        if (this.data) {
            this.title = 'ویرایش ';
        } else {
            this.title = 'ایجاد ';
        }
        this.creatForm();
        this.getBrockers();
        this.getFunds();
        this.getBourse();

        this.symbolORFundTitleSearchKeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((res) => {
            this.getBourse(res);
        });
    }

    creatForm() {
        this.form = this.fb.group({
            organizationType: [this.data ? this.data.organizationType : 'M', Validators.required],
            brockerId: [this.data ? this.data.brokerId : ''],
            bourseCode: [this.data ? this.data.bourseCode : ''],
            nationalId: [this.data ? this.data.nationalId : '', Validators.required],
            pamCode: [this.data ? this.data.pamCode : '', Validators.required],
            apiActive: [this.data ? this.data.apiActive : ''],
            symbolORFundTitle: [this.data ? this.data.symbolORFundTitle : '', Validators.required],
            isBOC: [this.data ? this.data.isBOC : ''],
            username: [this.data ? this.data.username : ''],
            password: [this.data ? this.data.password : ''],
        });
    }

    onCreateBranch() {
        this.marketSettingService.createMarket(this.form.value, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch() {
        let obj = this.form.value;
        obj['id'] = this.data.id;
        this.marketSettingService.updateMarket(obj, this).subscribe((res) => {
            this.AlertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    close() {
        this.dialogRef.close(false);
    }

    handleError(): boolean {
        return false;
    }

    isWorking: any;
}
