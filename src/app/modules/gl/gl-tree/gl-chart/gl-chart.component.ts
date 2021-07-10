import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { GlService } from 'app/modules/gl/gl.service';
import {
    GlCategoryModel,
    GlDetailModel,
    GlGeneralModel,
    GlGroupModel,
    GlSubsidiaryModel,
    TreeOrderType
} from '../../gl.model';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Component({
    selector: 'app-gl-chart',
    templateUrl: './gl-chart.component.html',
    styleUrls: ['./gl-chart.component.scss'],
    animations: [fuseAnimations],
})
export class GlChartComponent implements OnInit {
    public twoDayAgo: Date;
    public glCategories: Array<GlCategoryModel> = [];
    public glGroups: Array<GlGroupModel> = [];
    public glGeneral: Array<GlGeneralModel> = [];
    public glSubsidiary: Array<GlSubsidiaryModel> = [];
    public glDetail: Array<GlDetailModel> = [];
    public data: Array<any>;
    public form: FormGroup = this.fb.group({
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
        categoryLedgerCode: ['', Validators.required],
        groupLedgerCode: '',
        generalLedgerCode: '',
        subsidiaryLedgerCode: '',
        detailLedgerCode: '',
    });

    constructor(private glService: GlService, private fb: FormBuilder) {
        this.twoDayAgo = new Date();
        this.twoDayAgo.setDate(this.twoDayAgo.getDate() - 2);
    }

    ngOnInit(): void {
        this.glService.getGLLevels(null, TreeOrderType.Category).subscribe((res: any[]) => (this.glCategories = res));
        this.form
            .get('categoryLedgerCode')
            .valueChanges.subscribe((response) => this.glService.getGLLevels(response, TreeOrderType.Group).subscribe((x: any[]) => (this.glGroups = x)));

        this.form.get('groupLedgerCode').valueChanges.subscribe((response) => {
            this.glService.getGLLevels(response, TreeOrderType.General).subscribe((x: any[]) => (this.glGeneral = x));
        });
        this.form.get('generalLedgerCode').valueChanges.subscribe((response) => {
            this.glService.getGLLevels(response, TreeOrderType.Subsidiary).subscribe((x: any[]) => {
                this.glSubsidiary = x;
                this.form.get('subsidiaryLedgerCode').reset();
            });
        });
        this.form.get('subsidiaryLedgerCode').valueChanges.subscribe((response) => {
            this.glService.getGLLevels(response, TreeOrderType.Detail).subscribe((x: any[]) => (this.glDetail = x));
        });
    }

    public submitForm(): void {
        this.glService.getChartApi(this.form.value).subscribe((response: any) => {
            if (response) {
                response.map((x) => {
                    x.value = x.remainedAmount;
                    x.date = UtilityFunctions.convertDateToGregorianFormatForServer(x.date);
                });
            }
            this.data = null;
            setTimeout(() => (this.data = response), 100);
        });
    }
}
