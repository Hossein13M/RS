import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { AlertService } from '#shared/alert.service';
import { OpRiskFlowService } from '../../op-risk-flow/op-risk-flow.service';
import { OpLossManagementService } from '../op-loss-management.service';

@Component({
    selector: 'app-op-loss-add',
    templateUrl: './op-loss-add.component.html',
    styleUrls: ['./op-loss-add.component.scss'],
    animations: [fuseAnimations],
})
export class OpLossAddComponent implements OnInit {
    title: string;
    data: any;
    form: FormGroup;
    organizationStructures: [];
    process: [];
    lastLossEvents: [];
    flow: [];

    constructor(
        private opRiskFlowService: OpRiskFlowService,
        private opLossManagementService: OpLossManagementService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.snapshot.queryParamMap.get('opLossId') ? (this.title = 'نمایش جزئیات زیان') : (this.title = 'افزودن زیان');
        if (this.opLossManagementService.lastLossStep1Data) {
            this.data = this.opLossManagementService.lastLossStep1Data;
        }
        this.createForm();
        this.getOrganizationStructure();
        this.getFlows();
    }

    getOrganizationStructure(): void {
        this.opLossManagementService.getOrganizationsStructure().subscribe((response) => (this.organizationStructures = response));
    }

    getProcess(organizationStructures): void {
        this.opLossManagementService.specificationModel.searchKeyword = { organizationCharts: organizationStructures };
        this.form.value.process = [];
        this.opLossManagementService.getProcess().subscribe((response) => (this.process = response));
    }

    getLastLossEvents(processId): void {
        this.opLossManagementService.specificationModel.searchKeyword = { organizationCharts: this.form.value.organizationStructures, processes: processId };
        this.form.value.lastLossEventId = [];
        this.opLossManagementService.getLastLossEvents().subscribe((response) => (this.lastLossEvents = response));
    }

    getFlows(): void {
        this.opRiskFlowService.getOpFlows().subscribe((response) => (this.flow = response.items));
    }

    createOpLose(): void {
        const data = { flow: 0, lastLossEventId: 0, profileName: '', counterParty: '' };
        data.flow = this.form.value.flow;
        data.lastLossEventId = this.form.value.lastLossEventId;
        data.profileName = this.form.value.profileName;
        data.counterParty = this.form.value.counterParty;
        this.opLossManagementService.lastLossStep1Data = data;
        this.router.navigate(['/op-risk/management/loss/detail'], { queryParams: { lastLossEventId: this.form.value.lastLossEventId } }).finally();
    }

    createForm(): void {
        this.form = this.fb.group({
            organizationStructures: [this.data ? this.data.organizationStructures : ''],
            process: [this.data ? this.data.process : ''],
            lastLossEventId: [this.data ? this.data.lastLossEventId : ''],
            profileName: [this.data ? this.data.profileName : ''],
            counterParty: [this.data ? this.data.counterParty : ''],
            flow: [this.data ? this.data.flow : ''],
        });

        this.form.get('organizationStructures').valueChanges.subscribe((newData) => this.getProcess(newData));

        this.form.get('process').valueChanges.subscribe((newData) => this.getLastLossEvents(newData));
    }
}
