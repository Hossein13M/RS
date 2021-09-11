import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { json2xml, xml2json } from 'xml-js';
import { AlertService } from '#services/alert.service';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { StateType } from '#shared/state-type.enum';
import { ContractFlowService } from '../contract-flow/contract-flow.service';
import { Flow } from '../contract-flow/contract-flow.model';
import { ContractBpmnDialogComponent } from './contract-bpmn-dialog/contract-bpmn-dialog.component';
import { CustomPaletteProvider } from './contract-bpmn-palette.js';

@Component({
    selector: 'app-contract-bpmn',
    templateUrl: './contract-bpmn.component.html',
    styleUrls: ['./contract-bpmn.component.scss'],
})
export class ContractBpmnComponent implements OnInit {
    public stateType: StateType = StateType.INIT;
    private flowId: string;
    public flowDetails: Flow;
    private organizationCode: number = UtilityFunctions.getActiveOrganizationInfo('code');

    //BPMN Diagram
    private modeler;
    public saveName = '';
    private eventBus: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private flowService: ContractFlowService,
        private dialog: MatDialog,
        private alertService: AlertService,
        private router: Router
    ) {}

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

            const startEvents = bpmnConfiguration['bpmn:definitions']['bpmn:process']['bpmn:startEvent'];

            if (!startEvents) {
                this.alertService.onError('گام آغازینی برای روندنما موجود نیست.');
                return;
            }

            // Check End Conditions
            const endEvents = bpmnConfiguration['bpmn:definitions']['bpmn:process']['bpmn:endEvent'];

            if (!endEvents) {
                this.alertService.onError('گام پایانی‌ای برای روندنما موجود نیست.');
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

            const tasks = bpmnConfiguration['bpmn:definitions']['bpmn:process']['bpmn:task'];

            tasks.map((task) => {
                if (!task._attributes.name) {
                    this.alertService.onError('همه‌ی گام‌های روندنما بایستی دارای نام باشند.');
                    return;
                } else if (!task['bpmn:incoming'] || !task['bpmn:outgoing']) {
                    this.alertService.onError('روندنما نادرست است. همه‌ی گام‌ها بایستی با هم وصل باشند.');
                    return;
                }
            });

            const checkValidationResult: boolean = this.checkSequenceFlowValidations(bpmnConfiguration);
            if (!checkValidationResult) return;

            this.flowDetails.bpmnConfiguration = JSON.parse(xml2json(xml, { compact: true }));
            if (this.flowDetails._id) this.flowDetails.id = this.flowDetails._id;
            delete this.flowDetails._id;
            this.submitData(this.flowDetails);
        });
    }

    private submitData(info) {
        this.flowService.saveBpmnConfiguration(info).subscribe(
            () => this.router.navigate([`/contract/flow`]).finally(() => this.alertService.onSuccess('این BPMN به جریان افزوده شد.')),
            (error) => (error.status !== 500 ? this.alertService.onError(error.error.errors[0].messageFA) : this.alertService.onError('خطای سرور'))
        );
    }

    private checkSequenceFlowValidations(bpmnProcess: any): boolean {
        const endEvents = bpmnProcess['bpmn:definitions']['bpmn:process']['bpmn:endEvent'];
        const startEvents = bpmnProcess['bpmn:definitions']['bpmn:process']['bpmn:startEvent'];
        const tasks = bpmnProcess['bpmn:definitions']['bpmn:process']['bpmn:task'];

        if (Array.isArray(startEvents) && startEvents.length > 1) {
            this.alertService.onError('روندنما نمی‌تواند بیش از یک آغاز داشته باشد');
            return false;
        } else if (Array.isArray(endEvents) && endEvents.length > 1) {
            this.alertService.onError('روندنما نمی‌تواند بیش از یک پایان داشته باشد');
            return false;
        } else if (Array.isArray(tasks) && tasks.length < 2) {
            this.alertService.onError('روندنما نمی‌تواند کم‌تر از دو گام داشته باشد');
            return false;
        } else return true;
    }

    // BPMN Diagram

    initBpmn() {
        this.modeler = new BpmnModeler({
            container: '#js-canvas',
            additionalModules: [CustomPaletteProvider],
        });
        this.importDiagram();
    }

    importDiagram() {
        const bpmnConfiguration = this.convertJsonToXML();
        this.modeler.importXML(bpmnConfiguration, function (err) {
            if (err) console.error(err);

            // noinspection JSPotentiallyInvalidUsageOfClassThis
            // this.modeler.get('js-canvas').zoom('fit-viewport');
        });
    }

    saveDiagram(e) {
        this.modeler.saveXML({ format: true }, (err, xml) => {
            err ? console.error(err) : this.setEncoded(xml, 'bpmn.xml');
        });
        e.preventDefault();
        e.stopPropagation();
    }

    saveSVG(e) {
        this.modeler.saveSVG((err, svg) => {
            err ? console.error(err) : this.setEncoded(svg, 'bpmn.svg');
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
        if (event.element.type === 'bpmn:Task' || event.element.type === 'bpmn:EndEvent') {
            event.element.businessObject.name
                ? this.openDialog(event.element.businessObject.name, event.element.id, event.element.type === 'bpmn:Task')
                : this.alertService.onInfo('نخست یک نام برگزینید');
        }
    }

    private openDialog(stateName, stateId, isStateTypeTask: boolean): void {
        this.modeler.saveXML(async (err: any, xml: any) => {
            const bpmnProcesses = JSON.parse(xml2json(xml, { compact: true }))['bpmn:definitions']['bpmn:process'];
            if (Array.isArray(bpmnProcesses['bpmn:endEvent'])) {
                this.alertService.onError('شما نمیتوانید دو پایان داشته باشید');
                return;
            }

            this.dialog.open(ContractBpmnDialogComponent, {
                width: '1500px',
                height: isStateTypeTask ? '900px' : '500px',
                panelClass: 'dialog-p-0',
                data: { flowId: this.activatedRoute.snapshot.params.id, stateName, stateId, isStateTypeTask, bpmnProcesses },
            });
        });
    }
}
