import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { GlService } from 'app/modules/gl/gl.service';
import * as moment from 'jalali-moment';
import { GlCategoryModel, GlDetailModel, GlGeneralModel, GlGroupModel, GlSubsidiaryModel, TreeOrderType } from '../../gl.model';
import { GlTreeService } from '../gl-tree.service';

@Component({
    selector: 'app-gl-chart',
    templateUrl: './gl-chart.component.html',
    styleUrls: ['./gl-chart.component.scss'],
    animations: [fuseAnimations],
})
export class GlChartComponent implements OnInit {
    public twoDayAgo: Date;
    public form: FormGroup;
    public glCategories: Array<GlCategoryModel> = [];
    public glGroups: Array<GlGroupModel> = [];
    public glGeneral: Array<GlGeneralModel> = [];
    public glSubsidiary: Array<GlSubsidiaryModel> = [];
    public glDetail: Array<GlDetailModel> = [];
    public data: Array<any>;

    constructor(private glService: GlService, private glTreeService: GlTreeService, private fb: FormBuilder) {
        this.twoDayAgo = new Date();
        this.twoDayAgo.setDate(this.twoDayAgo.getDate() - 2);
    }

    ngOnInit(): void {
        this.createForm();
        this.glService.getLevelApi(null, TreeOrderType.Category).subscribe((res: any[]) => (this.glCategories = res));
        this.form.get('categoryLedgerCode').valueChanges.subscribe((res) => {
            this.glService.getLevelApi(res, TreeOrderType.Group).subscribe((x: any[]) => (this.glGroups = x));
        });
        this.form.get('groupLedgerCode').valueChanges.subscribe((res) => {
            this.glService.getLevelApi(res, TreeOrderType.General).subscribe((x: any[]) => (this.glGeneral = x));
        });
        this.form.get('generalLedgerCode').valueChanges.subscribe((res) => {
            this.glService.getLevelApi(res, TreeOrderType.Subsidiary).subscribe((x: any[]) => {
                this.glSubsidiary = x;
                this.form.get('subsidiaryLedgerCode').reset();
            });
        });
        this.form.get('subsidiaryLedgerCode').valueChanges.subscribe((res) => {
            this.glService.getLevelApi(res, TreeOrderType.Detail).subscribe((x: any[]) => (this.glDetail = x));
        });
    }

    createForm(): void {
        this.form = this.fb.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            categoryLedgerCode: ['', Validators.required],
            groupLedgerCode: '',
            generalLedgerCode: '',
            subsidiaryLedgerCode: '',
            detailLedgerCode: '',
        });
    }

    submitForm(): void {
        this.glTreeService.getChartApi(this.form.value).subscribe((res: any) => {
            if (res) {
                res.map((x) => {
                    x.value = x.remainedAmount;
                    x.date = moment(x.date).locale('fa').format('YYYY-MM-DD');
                });
            }
            this.data = null;
            setTimeout(() => (this.data = res), 100);
        });
    }
}
