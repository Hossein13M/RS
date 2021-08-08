import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '#services/alert.service';
import { json2xml, xml2json } from 'xml-js';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { StateType } from '#shared/state-type.enum';
import propertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { FlowService } from '../flow/flow.service';
import { Flow } from '../flow/flow.model';
import { BpmnDialogComponent } from './bpmn-dialog/bpmn-dialog.component';

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

    //BPMN Diagram
    private modeler;
    public saveName = '';
    private eventBus: any;

    constructor(private activatedRoute: ActivatedRoute, private flowService: FlowService, private dialog: MatDialog, private alertService: AlertService) {}

    ngOnInit(): void {
        this.flowId = this.activatedRoute.snapshot.paramMap.get('id');
        this.getFlowDetails();
    }

    private getFlowDetails(): void {
        const pagination: { limit: number; skip: number } = { limit: 100, skip: 0 };
        this.flowService.getSingleFlowDetails({ organization: this.organizationCode, id: this.flowId, ...pagination }).subscribe((response) => {
            this.flowDetails = response.items[0];
            this.stateType = StateType.PRESENT;
            //implement BPMN Diagram and Modeler
            this.initBpmn();
            this.eventBus = this.modeler.get('eventBus');
            this.eventBus.on('element.dblclick', this.clickListener.bind(this));
        });
    }

    public saveBPMN(): void {
        this.modeler.saveXML(async (err: any, xml: any) => {
            const bpmnConfiguration = JSON.parse(xml2json(xml, { compact: true }));

            if (!bpmnConfiguration || !bpmnConfiguration['bpmn:definitions']) {
                this.alertService.onError('روندی برای افزودن نیست!.');
                return;
            }

            // Check End Conditions
            const endEvents = bpmnConfiguration['bpmn:definitions']['bpmn:process']['bpmn:endEvent'];

            if (!endEvents) {
                this.alertService.onError('گام پایانی‌ای برای روندنما موجود نیست.');
                return;
            }

            if (typeof endEvents[Symbol.iterator] === 'function') {
                this.alertService.onError('روندنما نمی‌تواند بیش از یک پایان داشته باشد.');
                return;
            }

            if (!endEvents?._attributes.name) {
                this.alertService.onError('گام پایانی‌ نمی‌تواند بدون نام باشد.');
                return;
            }

            // Check Minimum Number Of Conditions
            const bpmnPlane = bpmnConfiguration['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane'];
            if (!bpmnPlane || !bpmnPlane['bpmndi:BPMNShape']) {
                this.alertService.onError('روندنما نمی‌تواند بدون گام باشد.');
                return;
            }

            const bpmnShapes = bpmnPlane['bpmndi:BPMNShape'];
            const numberOfTasks = bpmnShapes.filter((el) => {
                if (!el || !el._attributes || !el._attributes.bpmnElement) {
                    return false;
                }
                if (String(el._attributes.bpmnElement).startsWith('Task')) {
                    return true;
                }
            }).length;

            if (numberOfTasks < 2) {
                this.alertService.onError('روندنما نمی‌تواند کمتر از ۲ گام باشد.');
                return;
            }

            this.flowDetails.bpmnConfiguration = JSON.parse(xml2json(xml, { compact: true }));
            this.flowDetails.id = this.flowDetails._id;
            delete this.flowDetails._id;
            this.submitData(this.flowDetails);
        });
    }

    private submitData(info) {
        this.flowService.saveBpmnConfiguration(info).subscribe((response) => console.log(response));
    }

    // BPMN Diagram

    initBpmn() {
        this.modeler = new BpmnModeler({
            container: '#js-canvas',
            // propertiesPanel: {
            //     parent: '#js-properties-panel',
            // },
            additionalModules: [propertiesProvider],
        });
        this.importDiagram();
    }

    importDiagram() {
        const bpmnConfiguration = this.convertJsonToXML();
        this.modeler.importXML(bpmnConfiguration, function (err) {
            if (err) {
                console.error(err);
            }
            // noinspection JSPotentiallyInvalidUsageOfClassThis
            // this.modeler.get('js-canvas').zoom('fit-viewport');
        });
    }

    saveDiagram(e) {
        this.modeler.saveXML({ format: true }, (err, xml) => {
            if (err) {
                console.error(err);
            } else {
                this.setEncoded(xml, 'bpmn.xml');
            }
        });
        e.preventDefault();
        e.stopPropagation();
    }

    saveSVG(e) {
        this.modeler.saveSVG((err, svg) => {
            if (err) {
                console.error(err);
            } else {
                this.setEncoded(svg, 'bpmn.svg');
            }
        });
        e.preventDefault();
        e.stopPropagation();
    }

    setEncoded(data, name) {
        if (data) this.saveName = name;
    }

    private convertJsonToXML(): string {
        return json2xml(JSON.stringify(this.flowDetails.bpmnConfiguration), { compact: true });
    }

    public clickListener(event): void {
        if (event.element.type === 'bpmn:Task') {
            if (event.element.businessObject.name) {
                this.openDialog(event.element.businessObject.name, event.element.id);
            } else this.alertService.onError('نخست یک نام برگزینید');
        }

        if (event.element.type === 'bpmn:EndEvent') event.element.businessObject.name = 'پایانی';
    }

    private openDialog(name, id): void {
        this.dialog.open(BpmnDialogComponent, {
            width: '1500px',
            height: '900px',
            panelClass: 'dialog-p-0',
            data: { flowId: this.activatedRoute.snapshot.params.id, stateName: name, stateId: id },
        });
    }
}
