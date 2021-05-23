import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { StateManager } from '#shared/pipes/stateManager.pipe';
import { StateType } from '#shared/state-type.enum';
import { OpRiskFlowService } from '../../op-risk-flow/op-risk-flow.service';
import { OpRiskManagementService } from '../op-risk-management.service';
import { OpRiskModel } from '../op-risk-model';

@Component({
    selector: 'app-op-risk-add',
    templateUrl: './op-risk-add.component.html',
    styleUrls: ['./op-risk-add.component.scss'],
})
export class OpRiskAddComponent implements OnInit {
    flows = { data: [], state: StateType.PRESENT };
    parents = [];
    trees: Array<{ name: string; id: string; show: boolean; data?: any }> = [
        { name: 'ساختار سازمانی', id: 'os', show: false },
        { name: 'مالک ریسک', id: 'op', show: false },
        { name: 'فرایند', id: 'pr', show: false },
        { name: 'خط کسب و کار', id: 'bl', show: false },
        { name: 'محصول یا خدمت', id: 'ps', show: false },
        { name: 'طبقه ریسک', id: 'rc', show: false },
        { name: 'محرکه عملیاتی', id: 'od', show: false },
        { name: 'طبقه بندی های عملیاتی ', id: 'oc', show: false },
        { name: 'پوشش های عملیاتی ', id: 'olc', show: false },
        { name: 'زیان مستقیم ', id: 'dl', show: false },
        { name: 'زیان غیر مستقیم ', id: 'il', show: false },
        { name: 'رویداد مولد', id: 'il', show: false },
    ];
    form: FormGroup;
    selectedNodes: any;
    showParent = false;

    inAdd = true;
    data: any;
    show: boolean = false;

    stepIndex = 0;
    steps = [];

    title: string;
    inEdit = false;
    back: any;

    constructor(
        private opRiskFlowService: OpRiskFlowService,
        private opManagementService: OpRiskManagementService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {
        if (this.activatedRoute.snapshot.queryParamMap.get('opRiskId')) {
            if (this.activatedRoute.snapshot.queryParamMap.get('edit')) {
                this.getHistoryInEdit(this.activatedRoute.snapshot.queryParamMap.get('opRiskId')).subscribe((response) => {
                    this.show = true;
                    this.data = response;
                    this.createForm();
                    if (response.controlDetails) {
                        if (response.controlDetails && response.controlDetails.length > 0) {
                            this.form.controls['controlDescription'].setValue(response.controlDetails[0].description, { onlySelf: true });
                            this.form.controls['controlType'].setValue(response.controlDetails[0].type, { onlySelf: true });
                            this.form.controls['controlValue'].setValue(response.controlDetails[0].value, { onlySelf: true });
                        }
                    }
                    this.title = 'ویرایش ریسک';
                    this.inAdd = true;
                    this.show = true;
                    this.form.enable();
                    this.form.controls['flow'].disable();
                    this.inEdit = true;
                });
            } else {
                this.getHistory(this.activatedRoute.snapshot.queryParamMap.get('opRiskId'));
                this.getSteps(this.activatedRoute.snapshot.queryParamMap.get('opRiskId'));
                this.title = 'مشاهده جزئیات ریسک';
            }
        } else {
            this.createForm();
            this.show = true;
            this.title = 'ایجاد ریسک';
        }
    }

    ngOnInit(): void {
        this.back = this.activatedRoute.snapshot.queryParamMap.get('back');
        this.getFlows();
    }

    getFlows(): void {
        this.opRiskFlowService
            .getOPRiskFlow({ skip: 0, limit: 100 })
            .pipe(StateManager(this.flows))
            .subscribe((response: any) => (this.flows.data = response.items));
    }

    getTrees(name, index): void {
        this.opManagementService.getTrees(name).subscribe((response) => (this.trees[index]['data'] = response));
    }

    getParents(): void {
        this.opManagementService.specificationModel.searchKeyword = {
            organizationCharts: this.form.value.organizationCharts,
            owners: this.form.value.owners,
            processes: this.form.value.processes,
            businessLines: this.form.value.businessLines || [],
            products: this.form.value.products || [],
        };
        this.opManagementService.getParentRisk().subscribe((response) => (this.parents = response));
    }

    onCreate(): void {
        const data = this.createObject(this.form.value, false);
        this.opManagementService.createOpRisk(data).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت ایجاد شد');
                this.router.navigate(['/op-risk/management']).finally();
            },
            (error) => {
                if (error.statusCode === 403) {
                    this.alertService.onSuccess('دسترسی شما تایید نشده است.');
                    return;
                }
                this.alertService.onError('اطلاعات ورودی را بررسی کنید.');
            }
        );
    }

    onEdit(): void {
        const data = this.createObject(this.form.value, false);
        this.opManagementService.updateOpRisk(data).subscribe(
            () => {
                this.alertService.onSuccess('با موفقیت به روز رسانی شد');
                this.router.navigate(['/op-risk/management']).finally();
            },
            (error) => {
                if (error.statusCode === 403) {
                    this.alertService.onSuccess('دسترسی شما تایید نشده است.');
                }
            }
        );
    }

    onDraft(): void {
        const data = this.createObject(this.form.value, true);
        this.opManagementService.createOpRisk(data).subscribe(() => this.alertService.onSuccess('با موفقیت ایجاد شد'));
    }

    createObject(formData, isDraft): OpRiskModel {
        const finalData = new OpRiskModel();
        finalData.flow = formData?.flow ?? this.data?.flow?.id;
        finalData.title = formData.title;
        finalData.organizationCharts = formData.organizationCharts || [];
        finalData.owners = formData.owners || [];
        finalData.processes = formData.processes || [];
        finalData.businessLines = formData.businessLines || [];
        finalData.products = formData.products || [];
        finalData.levels = formData.levels || [];
        finalData.averageIncomeType = formData.averageIncomeType;
        finalData.averageIncome = formData.averageIncome;
        finalData.parents = formData.parents || [];
        finalData.drivers = formData.drivers || [];
        finalData.driversDescription = formData.driversDescription;
        finalData.control = formData.control;
        if (formData.control === 'inadequate') {
            const controlDetail = {
                type: formData.controlType,
                description: formData.controlDescription,
                value: formData.controlValue,
                classifications: formData.controlClassification || [],
            };
            finalData.controlDetails = [controlDetail];
        }
        finalData.recoveries = formData.recoveries || [];
        finalData.recoveriesDescription = formData.recoveriesDescription;
        finalData.recoveriesAvg = formData.recoveriesAvg;
        finalData.directLosses = formData.directLosses || [];
        finalData.directLossesDescription = formData.directLossesDescription;
        finalData.directLossesAvg = formData.directLossesAvg;
        finalData.inDirectLosses = formData.inDirectLosses || [];
        finalData.inDirectLossesDescription = formData.inDirectLossesDescription;
        finalData.inDirectLossesAvg = formData.inDirectLossesAvg;
        finalData.isDraft = isDraft;
        if (this.inEdit) {
            finalData.id = formData.id;
            const treeCorrectionsNames = [
                'levels',
                'organizationCharts',
                'owners',
                'processes',
                'parents',
                'products',
                'recoveries',
                'inDirectLosses',
                'drivers',
                'directLosses',
                'businessLines',
            ];

            for (const treeName of treeCorrectionsNames) {
                if (!finalData[treeName] || finalData[treeName].length <= 0) {
                    continue;
                }

                finalData[treeName] = finalData[treeName].map((el) => el?.treeNode?.id ?? el);
            }
        }
        return finalData;
    }

    createForm(): void {
        this.form = this.fb.group({
            flow: [this.data?.flow?.id ?? ''],
            title: [this.data ? this.data.title : ''],
            organizationCharts: [this.data ? this.data.organizationCharts : ''],
            owners: [this.data ? this.data.owners : ''],
            processes: [this.data ? this.data.processes : ''],
            businessLines: [this.data ? this.data.businessLines : ''],
            products: [this.data ? this.data.products : ''],
            levels: [this.data ? this.data.levels : ''],
            averageIncomeType: [this.data ? this.data.averageIncomeType : ''],
            averageIncome: [this.data ? this.data.averageIncome : ''],
            parents: [this.data ? this.data.parents : ''],
            drivers: [this.data ? this.data.drivers : ''],
            driversDescription: [this.data ? this.data.driversDescription : ''],
            control: [this.data ? this.data.control : ''],
            controlType: [this.data ? this.data.controlType : ''],
            controlDescription: [this.data ? this.data.controlDescription : ''],
            controlValue: [this.data ? this.data.controlValue : ''],
            controlClassification: [this.data ? this.data.controlClassification : ''],
            recoveries: [this.data ? this.data.recoveries : ''],
            recoveriesDescription: [this.data ? this.data.recoveriesDescription : ''],
            recoveriesAvg: [this.data ? this.data.recoveriesAvg : ''],
            directLosses: [this.data ? this.data.directLosses : ''],
            directLossesDescription: [this.data ? this.data.directLossesDescription : ''],
            directLossesAvg: [this.data ? this.data.directLossesAvg : ''],
            inDirectLosses: [this.data ? this.data.inDirectLosses : ''],
            inDirectLossesDescription: [this.data ? this.data.inDirectLossesDescription : ''],
            inDirectLossesAvg: [this.data ? this.data.inDirectLossesAvg : ''],
            id: [this.data ? this.data.id : ''],
        });
        this.form.valueChanges.pipe(debounceTime(200)).subscribe((newValue) => {
            if (newValue.organizationCharts && newValue.owners && newValue.processes) this.showParent = true;
        });
    }

    getHistory(opRiskId): void {
        this.show = false;
        this.opManagementService.getOpRiskDetail(opRiskId).subscribe((response) => {
            this.show = true;
            this.data = response;
            this.createForm();
            this.inAdd = false;
            this.form.disable();
            if (response.controlDetails && response.controlDetails.length > 0) {
                this.form.controls['controlDescription'].setValue(response.controlDetails[0].description, {
                    onlySelf: true,
                });
                this.form.controls['controlType'].setValue(response.controlDetails[0].type, { onlySelf: true });
                this.form.controls['controlValue'].setValue(response.controlDetails[0].value, { onlySelf: true });
            }
        });
    }

    getHistoryInEdit(opRiskId): Observable<any> {
        this.show = false;
        return this.opManagementService.getOpRiskDetail(opRiskId);
    }

    getSteps(opRiskId): void {
        this.opManagementService.getOpRiskSteps(opRiskId).subscribe((response) => {
            for (let i = 0; i < 3; i++) {
                this.steps.push({ action: 'در انتظار تایید', createdAt: null, fromStep: null, id: null, rejectReason: null, userId: null, username: null });
            }
            for (let i = 0; i < response.length; i++) {
                if (response[i].action === 'submit') {
                    response[i].action = 'ثبت شده';
                }
                if (response[i].action === 'accept') {
                    response[i].action = 'تایید شده';
                }
                if (response[i].action === 'reject') {
                    response[i].action = 'رد شده';
                }
                this.stepIndex = response[i].toStep;
                response[i].createdAt = new Date(response[i].createdAt).toLocaleDateString('fa-Ir', { year: 'numeric', month: 'long', day: 'numeric' });
                this.steps[i] = response[i];
            }
        });
    }
}
