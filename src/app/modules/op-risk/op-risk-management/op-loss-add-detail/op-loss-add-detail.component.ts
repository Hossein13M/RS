import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'app/services/alert.service';
import { OpRiskFlowService } from '../../op-risk-flow/op-risk-flow.service';
import { OpLossManagementService } from '../op-loss-management.service';
import { OpRiskManagementService } from '../op-risk-management.service';

@Component({
    selector: 'app-op-loss-add-detail',
    templateUrl: './op-loss-add-detail.component.html',
    styleUrls: ['./op-loss-add-detail.component.scss'],
})
export class OpLossAddDetailComponent implements OnInit {
    view: any;

    stepIndex = 0;
    steps = [];

    data: any;
    form: FormGroup;

    opLossId = 0;
    lastLossEventId = 0;
    mainSaved = false;

    driverArray: any;
    recoveriesArray: any;
    directLossesArray: any;
    inDirectLossesArray: any;
    relatedRiskArray: any;
    addRelatedRisk = false;
    created = false;
    title = 'جزئیات زیان';
    selected: number;

    constructor(
        private readonly opFlowService: OpRiskFlowService,
        private readonly opRiskManagementService: OpRiskManagementService,
        private opLossManagementService: OpLossManagementService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.lastLossEventId = Number(this.activatedRoute.snapshot.queryParamMap.get('lastLossEventId'));
        this.opLossId = Number(this.activatedRoute.snapshot.queryParamMap.get('opId'));
        this.view = this.activatedRoute.snapshot.queryParamMap.get('view');
        if (this.view) {
        }
    }

    ngOnInit(): void {
        if (!this.opLossManagementService.lastLossStep1Data) {
            this.alertService.onError('داده‌ی زیانی موجود نیست.');
            this.router.navigate(['/op-risk/management/loss']);
            return;
        }

        this.creatForm();
        if (this.view === 'true') {
            this.form.disable();
            this.getSteps(this.opLossId);
            this.getOPLoseDetail(this.opLossId);
        } else {
            this.getDriverDetail();
            this.getRelatedRisk();
        }
    }

    creatForm(): void {
        this.form = this.fb.group({
            description: ['', ''],
            drivers: [[], []],
            lossEventDate: ['', ''],
            profileFinishingDate: ['', ''],
            lossEventDiscoveryDate: ['', ''],
            checkStartingDate: ['', ''],
            checkFinishingDate: ['', ''],
            recoveries: [[], []],
            recoveriesAmount: ['', ''],
            directLosses: [[], []],
            directLossesAmount: ['', ''],
            inDirectLosses: [[], []],
            inDirectLossesAmount: ['', ''],
            relatedOPRisk: ['', ''],
            life: ['', []],
        });
    }

    getDriverDetail(): void {
        this.opRiskManagementService.getOpRiskDetail(this.lastLossEventId).subscribe((response) => {
            this.driverArray = response.drivers;
            this.form.get('drivers').setValue(this.driverArray.map((el) => el.treeNode.id));
            this.recoveriesArray = response.recoveries;
            this.form.get('recoveries').setValue(this.recoveriesArray.map((el) => el.treeNode.id));
            this.directLossesArray = response.directLosses;
            this.form.get('directLosses').setValue(this.directLossesArray.map((el) => el.treeNode.id));
            this.inDirectLossesArray = response.inDirectLosses;
            this.form.get('inDirectLosses').setValue(this.inDirectLossesArray.map((el) => el.treeNode.id));
        });
    }

    getRelatedRisk(): void {
        this.opLossManagementService.getRelatedRisk(this.lastLossEventId).subscribe((response) => {
            response.map((el) => {
                el.disabled = true;
            });
            this.relatedRiskArray = response;
        });
    }

    createOpLossDetail(isRelated: boolean): void {
        const data = {
            isRelatedRisk: isRelated,
            opLoss: this.opLossId,
            description: '',
            drivers: [],
            lossEventDate: '',
            profileFinishingDate: '',
            lossEventDiscoveryDate: '',
            checkStartingDate: '',
            checkFinishingDate: '',
            recoveries: [],
            recoveriesAmount: '',
            directLosses: [],
            directLossesAmount: '',
            inDirectLosses: [],
            inDirectLossesAmount: '',
        };
        if (isRelated === true) {
            data['relatedOPRisk'] = this.form.value.relatedOPRisk;
            this.relatedRiskArray.map((el) => {
                if (el.id === this.selected) {
                    el.disabled = true;
                }
            });
        }
        data.description = this.form.value.description;
        data.drivers = this.form.value.drivers;
        data.lossEventDate = this.form.value.lossEventDate;
        data.profileFinishingDate = this.form.value.profileFinishingDate;
        data.lossEventDiscoveryDate = this.form.value.lossEventDiscoveryDate;
        data.checkStartingDate = this.form.value.checkStartingDate;
        data.checkFinishingDate = this.form.value.checkFinishingDate;

        if (this.form.value.recoveries) {
            data.recoveries = this.form.value.recoveries;
        } else {
            data.recoveries = [];
        }

        data.recoveriesAmount = this.form.value.recoveriesAmount;

        if (this.form.value.directLosses) {
            data.directLosses = this.form.value.directLosses;
        } else {
            data.directLosses = [];
        }
        data.directLossesAmount = this.form.value.directLossesAmount;

        if (this.form.value.inDirectLosses) {
            data.inDirectLosses = this.form.value.inDirectLosses;
        } else {
            data.inDirectLosses = [];
        }

        data.inDirectLossesAmount = this.form.value.inDirectLossesAmount;
        if (!this.mainSaved && isRelated) {
            this.alertService.onError('ریسک اصلی را ذخیره نکرده اید. ابتدا ریسک اصلی را ذخیره کنید');
        } else {
            const createDetail = (stepOne: any) =>
                this.opLossManagementService.createOpRiskLoseDetail(stepOne).subscribe((response) => {
                    this.created = true;
                    this.alertService.onSuccess('جزئیات با موفقیت ذخیره شد');
                    this.form.disable();
                    if (!isRelated) {
                        this.mainSaved = true;
                        this.relatedRiskArray.map((el) => {
                            el.disabled = false;
                        });
                    }
                });
            if (!this.opLossId) {
                this.opLossManagementService.createOpRiskLose(this.opLossManagementService.lastLossStep1Data).subscribe((lossCreationData) => {
                    data.opLoss = lossCreationData.id;
                    this.opLossId = lossCreationData.id;
                    createDetail(data);
                });
                return;
            }

            data.opLoss = this.opLossId;
            createDetail(data);
        }
    }

    calculateDate(): void {
        const data =
            (new Date(this.form.value.profileFinishingDate).getTime() - new Date(this.form.value.lossEventDate).getTime()) / (1000 * 3600 * 24);
        this.form.get('life').setValue(data);
    }

    showAddRelatedRisk(title, id): void {
        this.selected = id;
        this.form.enable();
        this.addRelatedRisk = true;
        this.title = `ریسک ها مرتبط - ${title}`;
        this.form.reset();
        this.form.get('relatedOPRisk').setValue(id);
    }

    viewRelatedRisk(data): void {
        this.selected = data.id;
        this.form.disable();
        this.form.reset();
        this.addRelatedRisk = true;
        const title = data?.relatedOPRisk?.title ? data.relatedOPRisk.title : 'ریسک اصلی';
        this.title = `${title}`;
        this.form.patchValue(data);
        this.calculateDate();

        if (data.drivers) {
            this.form.get('drivers').setValue(data.drivers.map((data) => data.treeNode.id));
        } else {
            this.form.get('drivers').setValue([]);
        }

        if (data.recoveries) {
            this.form.get('recoveries').setValue(data.recoveries.map((data) => data.treeNode.id));
        } else {
            this.form.get('recoveries').setValue([]);
        }

        if (data.directLosses) {
            this.form.get('directLosses').setValue(data.directLosses.map((data) => data.treeNode.id));
        } else {
            this.form.get('directLosses').setValue([]);
        }

        if (data.inDirectLossesArray) {
            this.form.get('inDirectLosses').setValue(data.inDirectLossesArray.map((data) => data.treeNode.id));
        } else {
            this.form.get('inDirectLosses').setValue([]);
        }

        // this.form.get('drivers').setValue(data.drivers.map((el) => el.treeNode.id));
        // this.form.get('recoveries').setValue(data.recoveries.map((el) => el.treeNode.id));
        // this.form.get('directLosses').setValue(data.directLosses.map((el) => el.treeNode.id));
        // this.form.get('inDirectLosses').setValue(data.inDirectLosses.map((el) => el.treeNode.id));
    }

    getSteps(opLoseId): void {
        this.opLossManagementService.getOPLoseSteps(opLoseId).subscribe((response) => {
            for (let i = 0; i < 3; i++) {
                this.steps.push({
                    action: 'در انتظار تایید',
                    createdAt: null,
                    fromStep: null,
                    id: null,
                    rejectReason: null,
                    userId: null,
                    username: null,
                });
            }
            for (let i = 0; i < response.length; i++) {
                if (response[i].action == 'submit') {
                    response[i].action = 'ثبت شده';
                }
                if (response[i].action == 'accept') {
                    response[i].action = 'تایید شده';
                }
                if (response[i].action == 'reject') {
                    response[i].action = 'رد شده';
                }
                this.stepIndex = response[i].toStep;
                response[i].createdAt = new Date(response[i].createdAt).toLocaleDateString('fa-Ir', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                this.steps[i] = response[i];
            }
        });
    }

    getOPLoseDetail(opLoseId): void {
        this.opLossManagementService.getOPLoseDetail(opLoseId).subscribe((response) => {
            this.data = response;
            if (this.data.details && this.data.details.length > 0) {
                this.selected = this.data.details[0].id;
            }
            this.data.details.map((el) => {
                el.lossEventDate = new Date(el.lossEventDate);
                el.profileFinishingDate = new Date(el.profileFinishingDate);
                el.lossEventDiscoveryDate = new Date(el.lossEventDiscoveryDate);
                el.checkStartingDate = new Date(el.checkStartingDate);
                el.checkFinishingDate = new Date(el.checkFinishingDate);
                this.form.patchValue(el);
                this.driverArray = el.drivers;
                if (el.drivers) {
                    this.form.get('drivers').setValue(el.drivers?.map((el) => el.treeNode.id));
                } else {
                    this.form.get('drivers').setValue([]);
                }

                this.recoveriesArray = el.recoveries;
                if (el.recoveries) {
                    this.form.get('recoveries').setValue(el.recoveries?.map((el) => el.treeNode.id));
                } else {
                    this.form.get('recoveries').setValue([]);
                }

                this.directLossesArray = el.directLosses;
                if (el.directLosses) {
                    this.form.get('directLosses').setValue(el.directLosses?.map((el) => el.treeNode.id));
                } else {
                    this.form.get('directLosses').setValue([]);
                }

                this.inDirectLossesArray = el.inDirectLosses;
                this.form.get('inDirectLosses').setValue(el.inDirectLossesArray?.map((el) => el.treeNode.id));
                if (el.inDirectLossesArray) {
                    this.form.get('inDirectLosses').setValue(el.inDirectLossesArray?.map((el) => el.treeNode.id));
                } else {
                    this.form.get('inDirectLosses').setValue([]);
                }
                this.calculateDate();
            });
        });
    }
}
