import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '#shared/alert.service';
import { OpLossManagementService } from '../op-loss-management.service';
import { OpRiskManagementService } from '../op-risk-management.service';

@Component({
    selector: 'app-op-loss-edit',
    templateUrl: './op-loss-edit.component.html',
    styleUrls: ['./op-loss-edit.component.scss'],
})
export class OpLossEditComponent implements OnInit {
    form: FormGroup;
    opLossId: any;
    oplossData: any;
    oplossDetailData: any;

    driverArray: any;
    recoveriesArray: any;
    directLossesArray: any;
    inDirectLossesArray: any;

    constructor(
        private fb: FormBuilder,
        private opLossService: OpLossManagementService,
        private opRiskManagementService: OpRiskManagementService,
        private AlertService: AlertService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.opLossId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.createForm();
        this.getOpLoss();
    }

    getOpLoss(): void {
        this.opLossService.getOPLoseDetail(this.opLossId).subscribe((response) => {
            this.oplossData = response;
            this.oplossDetailData = response.details;
            this.oplossDetailData.forEach((element) => {
                (this.form.controls.details as FormArray).push(
                    this.fb.group({
                        lossEventDate: ['', []],
                        profileFinishingDate: ['', []],
                        lossEventDiscoveryDate: ['', []],
                        checkStartingDate: ['', []],
                        checkFinishingDate: ['', []],
                        recoveriesAmount: ['', []],
                        directLossesAmount: ['', []],
                        inDirectLossesAmount: ['', []],
                        drivers: [[], []],
                        recoveries: [[], []],
                        directLosses: [[], []],
                        inDirectLosses: [[], []],
                        relatedOPRisk: ['', []],
                        description: ['', []],
                    })
                );
            });
            this.form.patchValue(response);
            this.getDriverDetail();
        });
    }

    createForm(): void {
        this.form = this.fb.group({
            id: [this.opLossId, [Validators.required]],
            profileName: ['', [Validators.required]],
            counterParty: ['', [Validators.required]],
            details: this.fb.array([]),
        });
    }

    getDriverDetail() {
        this.opRiskManagementService.getOpRiskDetail(this.oplossData.lastLossEventId.id).subscribe((response) => {
            this.driverArray = response.drivers;
            this.recoveriesArray = response.recoveries;
            this.directLossesArray = response.directLosses;
            this.inDirectLossesArray = response.inDirectLosses;
        });
    }

    update(): void {
        this.opLossService.updateOpLoss(this.form.value).subscribe(() => {
            this.AlertService.onSuccess('زیان با موفقیت به روز رسانی شد');
            this.router.navigate(['/op-risk/management']);
        });
    }
}
