import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'app/services/alert.service';
import { BankService } from 'app/services/feature-services/bank.service';
import { BourseInstrumentDetailService } from 'app/services/feature-services/bourse-instrument-detail.service';
import { BrokerSettingService } from 'app/services/feature-services/system-setting-services/broker-setting.service';
import { FundSettingService } from 'app/services/feature-services/system-setting-services/fund-setting.service';
import { MarketSettingService } from 'app/services/feature-services/system-setting-services/market-setting.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    brokers = [];

    constructor(
        public dialogRef: MatDialogRef<MarketSettingAddComponent>,
        private alertService: AlertService,
        private bankService: BankService,
        private borckerService: BrokerSettingService,
        private bourseBonds: BourseInstrumentDetailService,
        private marketSettingService: MarketSettingService,
        private fundSettingService: FundSettingService,
        @Inject(MAT_DIALOG_DATA) public data,
        private fb: FormBuilder
    ) {}

    getBourse(searchKeyword?: string): void {
        this.bourseBonds.getBonds(searchKeyword).subscribe((res: any) => {
            this.bonds = res.items;
        });
    }

    getFunds(): void {
        this.fundSettingService.getAllNoPaging().subscribe((res: any) => {
            this.funds = res.items;
        });
    }

    getBrokers(): void {
        this.borckerService.getBrokerSettings().subscribe((res: any) => {
            this.brokers = res;
        });
    }

    ngOnInit(): void {
        this.data ? (this.title = 'ویرایش ') : (this.title = 'ایجاد ');

        this.createForm();
        this.getBrokers();
        this.getFunds();
        this.getBourse();

        this.symbolORFundTitleSearchKeyword.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((res) => this.getBourse(res));
    }

    createForm(): void {
        this.form = this.fb.group({
            organizationType: [this.data ? this.data.organizationType : 'M', Validators.required],
            brokerId: [this.data ? this.data.brokerId : ''],
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

    onCreateBranch(): void {
        this.marketSettingService.createMarket(this.form.value).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ایجاد شد');
            this.dialogRef.close(true);
        });
    }

    onEditBranch(): void {
        const obj = this.form.value;
        obj['id'] = this.data.id;
        this.marketSettingService.updateMarket(obj).subscribe(() => {
            this.alertService.onSuccess('با موفقیت ویرایش شد');
            this.dialogRef.close(true);
        });
    }

    close(): void {
        this.dialogRef.close(false);
    }
}
