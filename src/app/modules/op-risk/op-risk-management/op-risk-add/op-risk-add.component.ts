import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '#shared/services/alert.service';
import { StateManager } from '#shared/pipes/stateManager.pipe';
import { StateType } from '#shared/state-type.enum';
import { OpRiskFlowService } from '../../op-risk-flow/op-risk-flow.service';
import { OpRiskManagementService } from '../op-risk-management.service';
import { OperationRiskDetails, OpRiskModel, RiskStepInfo } from '../op-risk-model';
import { UtilityFunctions } from '#shared/utilityFunctions';

enum RiskComponentState {
    'Add',
    'Edit',
    'Show',
}

@Component({
    selector: 'app-op-risk-add',
    templateUrl: './op-risk-add.component.html',
    styleUrls: ['./op-risk-add.component.scss'],
})
export class OpRiskAddComponent implements OnInit {
    isEditMode: boolean = false;
    backRouteAddress: string;
    headerTitle: string;
    riskComponentStateTypes = RiskComponentState;
    riskComponentState: RiskComponentState = this.riskComponentStateTypes.Show;
    matStepperSelectedIndex: number = 0;
    operationRiskHistorySteps: Array<RiskStepInfo> = [];
    form: FormGroup;
    data: OperationRiskDetails;
    loading: boolean = false;
    flows: { data: Array<{ flowId: number; name: string }>; state: StateType } = { data: [], state: StateType.PRESENT };
    parents: Array<{ id: number; title: string }> = [];
    showParent: boolean = false;
    trees: Array<{ name: string; id: string; show: boolean; data?: any; zIndex: number }> = [
        { name: 'ساختار سازمانی', id: 'os', show: false, zIndex: 20 },
        { name: 'پست سازمانی', id: 'op', show: false, zIndex: 19 },
        { name: 'فرآیندها', id: 'pr', show: false, zIndex: 18 },
        { name: 'خطوط کسب‌و‌کار', id: 'bl', show: false, zIndex: 17 },
        { name: 'محصولات یا خدمات', id: 'ps', show: false, zIndex: 16 },
        { name: 'طبقه‌ی ریسک', id: 'rc', show: false, zIndex: 15 },
        { name: 'محرکه‌های عملیاتی', id: 'od', show: false, zIndex: 14 },
        { name: 'کنترل‌های عملیاتی ', id: 'oc', show: false, zIndex: 13 },
        { name: 'پوشش‌های زیان عملیاتی ', id: 'olc', show: false, zIndex: 12 },
        { name: 'زیان مستقیم ', id: 'dl', show: false, zIndex: 11 },
        { name: 'زیان غیرمستقیم ', id: 'il', show: false, zIndex: 10 },
        { name: 'رویداد مولد', id: 'il', show: false, zIndex: 9 },
    ];

    constructor(
        private opRiskFlowService: OpRiskFlowService,
        private opManagementService: OpRiskManagementService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.checkComponentState();
        this.getFlows();
        this.onComponentStateInitialized();
        if (this.riskComponentState !== RiskComponentState.Show) this.disableFormControllersOfInputs();
    }

    private checkComponentState(): void {
        this.backRouteAddress = this.activatedRoute.snapshot.queryParamMap.get('back') ?? '/op-risk/management';

        const opRiskId: string = this.activatedRoute.snapshot.queryParamMap.get('opRiskId');
        if (!opRiskId) this.riskComponentState = RiskComponentState.Add;
        else {
            const isComponentInEditMode: string = this.activatedRoute.snapshot.queryParamMap.get('edit');
            !!isComponentInEditMode ? (this.riskComponentState = RiskComponentState.Edit) : (this.riskComponentState = RiskComponentState.Show);
        }
        this.chooseProperNameForTitle();
    }

    private onComponentStateInitialized(): void {
        if (this.riskComponentState === RiskComponentState.Add) this.initialComponentOnAddState();
        else if (this.riskComponentState === RiskComponentState.Edit) this.initialComponentOnEditState();
        else if (this.riskComponentState === RiskComponentState.Show) this.initialComponentOnShowState();
    }

    private initialComponentOnShowState(): void {
        this.getOpRiskDetailsOnShowState(this.activatedRoute.snapshot.queryParamMap.get('opRiskId'));
        this.getSteps(this.activatedRoute.snapshot.queryParamMap.get('opRiskId'));
    }

    private initialComponentOnAddState(): void {
        this.createForm();
        this.loading = true;
    }

    private disableFormControllersOfInputs(): void {
        const disablingFormControlArrayName: Array<{ formControlName: string; childrenFormControllers: Array<string> }> = [
            { formControlName: 'recoveries', childrenFormControllers: ['recoveriesDescription', 'recoveriesAvg'] },
            { formControlName: 'directLosses', childrenFormControllers: ['directLossesDescription', 'directLossesAvg'] },
            { formControlName: 'inDirectLosses', childrenFormControllers: ['inDirectLossesDescription', 'inDirectLossesAvg'] },
        ];

        disablingFormControlArrayName.map((item) => {
            item.childrenFormControllers.map((fc) => {
                this.form.get(item.formControlName).valueChanges.subscribe((value) => {
                    UtilityFunctions.checkValueForNotBeingAnEmptyArray(value) ? this.form.get(fc).enable() : this.form.get(fc).disable();
                });
            });
        });
    }

    private initialComponentOnEditState(): void {
        // TODO: this needs to be fixed after adding has been completed
        this.loading = false;
        const opRiskId = this.activatedRoute.snapshot.queryParamMap.get('opRiskId');
        this.opManagementService.getOpRiskDetail(+opRiskId).subscribe((response: OperationRiskDetails) => {
            this.loading = true;
            this.data = response;
            this.createForm();
            if (response.controlDetails) {
                if (UtilityFunctions.checkValueForNotBeingAnEmptyArray(response.controlDetails)) {
                    this.form.controls['controlDescription'].setValue(response.controlDetails[0].description, { onlySelf: true });
                    this.form.controls['controlType'].setValue(response.controlDetails[0].type, { onlySelf: true });
                    this.form.controls['controlValue'].setValue(response.controlDetails[0].value, { onlySelf: true });
                }
            }
            this.form.controls['flow'].disable();
            this.isEditMode = true;
        });
    }

    private chooseProperNameForTitle(): void {
        const riskComponentTranslator = { Add: 'افزودن ریسک', Edit: 'ویرایش ریسک', Show: 'نمایش جزئیات ریسک' };
        this.headerTitle = riskComponentTranslator[RiskComponentState[this.riskComponentState]];
    }

    private getFlows(): void {
        this.opRiskFlowService
            .getFlowsAssignedToUser()
            .pipe(StateManager(this.flows))
            .subscribe((response: Array<{ flowId: number; name: string }>) => (this.flows.data = response));
    }

    public getTrees(treeId: string, treeIndex: number): void {
        this.opManagementService.getTrees(treeId).subscribe((response) => (this.trees[treeIndex]['data'] = response));
    }

    private getParents(): void {
        let data;
        if (this.riskComponentState === RiskComponentState.Show || this.riskComponentState === RiskComponentState.Edit) {
            data = {
                organizationCharts: UtilityFunctions.returnIdsFromAnArray(this.form.value.organizationCharts),
                owners: UtilityFunctions.returnIdsFromAnArray(this.form.value.owners),
                processes: UtilityFunctions.returnIdsFromAnArray(this.form.value.processes),
                businessLines: UtilityFunctions.returnIdsFromAnArray(this.form.value.businessLines),
                products: UtilityFunctions.returnIdsFromAnArray(this.form.value.products),
            };
        } else {
            data = {
                organizationCharts: this.form.value.organizationCharts,
                owners: this.form.value.owners,
                processes: this.form.value.processes,
                businessLines: this.form.value.businessLines,
                products: this.form.value.products,
            };
        }

        this.opManagementService.getParentRisk(data).subscribe((response: Array<{ id: number; title: string }>) => (this.parents = response));
    }

    public onCreateRisk(): void {
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

    onEditRisk(): void {
        // TODO: this needs to be fixed after adding has been completed
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
        if (formData.control === 'available') {
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
        if (this.isEditMode) {
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

    private createForm(): void {
        this.form = this.fb.group({
            flow: [],
            title: [],
            organizationCharts: [],
            owners: [],
            processes: [],
            businessLines: [],
            products: [],
            levels: [],
            averageIncomeType: [],
            averageIncome: [],
            parents: [],
            drivers: [],
            driversDescription: [],
            control: [],
            controlType: [],
            controlDescription: [],
            controlValue: [],
            controlClassification: [],
            recoveries: [],
            recoveriesDescription: [{ value: '', disabled: true }],
            recoveriesAvg: [{ value: '', disabled: true }],
            directLosses: [],
            directLossesDescription: [{ value: '', disabled: true }],
            directLossesAvg: [{ value: '', disabled: true }],
            inDirectLosses: [],
            inDirectLossesDescription: [{ value: '', disabled: true }],
            inDirectLossesAvg: [{ value: '', disabled: true }],
            id: [],
        });

        if (this.data) {
            this.form.patchValue(this.data);
            this.form.get('flow').setValue(this.data.flow.id);
        }

        this.form.valueChanges.subscribe((newValue) => {
            // the reason for the bellow code is for getting 'رویداد مولد' with the corresponding data when it is available
            if (
                UtilityFunctions.checkValueForNotBeingAnEmptyArray(newValue.organizationCharts) &&
                UtilityFunctions.checkValueForNotBeingAnEmptyArray(newValue.owners) &&
                UtilityFunctions.checkValueForNotBeingAnEmptyArray(newValue.processes)
            ) {
                this.showParent = true;
                this.getParents();
            }
        });
    }

    private getOpRiskDetailsOnShowState(opRiskId): void {
        this.loading = false;
        this.opManagementService.getOpRiskDetail(opRiskId).subscribe((response: OperationRiskDetails) => {
            this.data = response;
            this.createForm();
            this.form.disable();
            if (UtilityFunctions.checkValueForNotBeingAnEmptyArray(response.controlDetails)) {
                this.form.controls['controlDescription'].setValue(response.controlDetails[0].description);
                this.form.controls['controlType'].setValue(response.controlDetails[0].type);
                this.form.controls['controlValue'].setValue(response.controlDetails[0].value);
            }
            this.loading = true;
        });
    }

    private getSteps(opRiskId: number | string): void {
        this.opManagementService.getOpRiskSteps(+opRiskId).subscribe((response: Array<RiskStepInfo>) => {
            this.operationRiskHistorySteps = response;
            this.matStepperSelectedIndex = response.length - 1;
            this.operationRiskHistorySteps.map((step: RiskStepInfo) => {
                step.createdAt = UtilityFunctions.convertDateToGregorianFormatForServer(new Date(step.createdAt));
                const translatorForStepState = { submit: 'ثبت شده', accept: 'تایید شده', reject: 'رد شده' };
                step.action = translatorForStepState[step.action];
            });
        });
    }
}
