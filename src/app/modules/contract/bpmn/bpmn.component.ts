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

    //
    importError?: Error;
    diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

    constructor(private activatedRoute: ActivatedRoute, private flowService: FlowService) {}

    ngOnInit(): void {
        this.getFlowIdFromURL();
    }

    private getFlowIdFromURL(): void {
        this.flowId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getFlowDetails();
    }

    private getFlowDetails(): void {
        this.flowService.getSingleFlowDetails({ organization: this.organizationCode, id: this.flowId }).subscribe((response) => {
            this.flowDetails = response;
            this.stateType = StateType.PRESENT;
        });
    }

    public saveBPMN(): void {
        console.log('kir');
    }

    public handleImported(event) {
        console.log(event);
        const { type, error, warnings } = event;

        if (type === 'success') {
            console.log(`Rendered diagram (%s warnings)`, warnings.length);
        }

        if (type === 'error') {
            console.error('Failed to render diagram', error);
        }

        this.importError = error;
    }
}
