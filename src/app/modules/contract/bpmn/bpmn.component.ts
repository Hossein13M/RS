import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { StateType } from '#shared/state-type.enum';
import { FlowService } from '../flow/flow.service';
import { Flow } from '../flow/flow.model';

@Component({
    selector: 'app-bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss'],
})
export class BpmnComponent implements OnInit {
    public stateType: StateType = StateType.INIT;
    private flowId: string;
    public flowDetails: Flow;
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');

    constructor(private activatedRoute: ActivatedRoute, private flowService: FlowService) {}

    ngOnInit(): void {
        this.flowId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getFlowDetails();
    }

    private getFlowDetails(): void {
        const pagination: { limit: number; skip: number } = { limit: 100, skip: 0 };
        this.flowService.getSingleFlowDetails({ organization: this.organizationCode, id: this.flowId, ...pagination }).subscribe((response) => {
            this.flowDetails = response;
            this.stateType = StateType.PRESENT;
        });
    }

    public saveBPMN(): void {
        console.log('kir');
    }
}
