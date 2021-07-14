import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'app/services/alert.service';
import { FlowsService } from 'app/services/App/flow/flow.service';
import { finalize } from 'rxjs/operators';
import { json2xml, xml2json } from 'xml-js';
import { OperatorManagementService } from '../../../../services/App/user/operator-management.service';
import { EndStateSettingDialogComponent } from '../form-builder/end-state-setting-dialog/end-state-setting-dialog.component';
import { FormBuilderComponent } from '../form-builder/form-builder.component';
import { InjectionNames, Modeler, OriginalPaletteProvider, OriginalPropertiesProvider, PropertiesPanelModule } from './bpmn-js/bpmn-js';
import customTranslate from './customTranslate/customTranslate.js';
import CustomPaletteProvider2 from './props-provider/CustomPaletteProvider2.js';
import CustomPropertiesProvider2 from './props-provider/CustomPropsProvider2.js';

const customModdle = {
    name: 'customModdle',
    uri: 'http://example.com/custom-moddle',
    prefix: 'custom',
    xml: { tagAlias: 'lowerCase' },
    associations: [],
    types: [{ name: 'ExtUserTask', extends: ['bpmn:UserTask'], properties: [{ name: 'worklist', isAttr: true, type: 'String' }] }],
};

@Component({
    selector: 'BpmnComponent',
    templateUrl: './bpmn.component.html',
    styleUrls: ['./bpmn.component.scss'],
})
export class BpmnComponent implements OnInit {
    private operatorsList: any;

    flowForm: FormGroup;
    waiting = false;

    modeler;
    eventBus;
    flowID;
    public customTranslate = { translate: ['value', customTranslate] };
    flowCategories;

    initialBpmn: string = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
     xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
     xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
     targetNamespace="http://bpmn.io/schema/bpmn" id="Definitions_1">
      <bpmn:process id="Process_1" isExecutable="false">
        <bpmn:startEvent id="StartEvent_1"/>
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
            <dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;

    constructor(
        public dialog: MatDialog,
        private flowService: FlowsService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private snackBar: AlertService,
        private operatorService: OperatorManagementService
    ) {
        this.flowService.getFlowCategories().subscribe((res) => (this.flowCategories = res));
    }

    ngOnInit(): void {
        this.operatorService.getOperators('').subscribe((operators) => (this.operatorsList = operators?.items));

        this.flowForm = this._formBuilder.group({ flowName: ['', [Validators.required]], flowCategory: ['', Validators.required] });

        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.flowService.getFlow(params['id']).subscribe((res) => {
                    this.flowID = res._id;
                    this.flowForm.setValue({ flowName: res.name, flowCategory: res.category._id });
                    this.initialBpmn = json2xml(JSON.stringify(res.attributes), { compact: true });
                    this.load();
                });
            }
        });

        this.modeler = new Modeler({
            container: '#canvas',
            width: '100%',
            height: '600px',
            additionalModules: [
                PropertiesPanelModule,
                // Translation
                this.customTranslate,
                // Re-use original bpmn-properties-module, see CustomPropsProvider
                { [InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]] },
                { [InjectionNames.propertiesProvider]: ['type', CustomPropertiesProvider2] },

                // Re-use original palette, see CustomPaletteProvider
                { [InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider] },
                { [InjectionNames.paletteProvider]: ['type', CustomPaletteProvider2] },
            ],
            propertiesPanel: { parent: '#properties' },
            moddleExtension: { custom: customModdle },
        });
        this.load();
        this.eventBus = this.modeler.get('eventBus');
        this.eventBus.on('element.dblclick', this.clickListener.bind(this));
    }

    handleError(err: any): void {
        if (err) {
            console.warn('Ups, error: ', err);
        }
    }

    clickListener(event): void {
        this.elementColorManagement();
        if (event.element.type === 'bpmn:Task') {
            if (event.element.businessObject.name) {
                this.openDialog(event.element.businessObject.name, event.element.id);
            } else {
                this.snackBar.onError('ابتدا یک نام انتخاب کنید');
            }
        }

        if (event.element.type === 'bpmn:EndEvent') {
            event.element.businessObject.name = 'نهایی';
            this.dialog.open(EndStateSettingDialogComponent, {
                data: { flowId: this.flowID, stateName: event.element.businessObject.name, stateId: event.element.id, operators: this.operatorsList },
                panelClass: 'dialog-w40',
            });
        }
    }

    async addFlow(): Promise<any> {
        this.waiting = true;
        this.modeler.saveXML(async (err: any, xml: any) => {
            const flowExport = JSON.parse(xml2json(xml, { compact: true }));

            if (!flowExport || !flowExport['bpmn:definitions']) {
                this.snackBar.onError('روندی برای ثبت وجود ندارد.');
                this.waiting = false;
                return;
            }

            // Check End Conditions
            const endEvents = flowExport['bpmn:definitions']['bpmn:process']['bpmn:endEvent'];

            if (!endEvents) {
                this.snackBar.onError('مرحله‌ی پایانی‌ای برای روندنما موجود نیست.');
                this.waiting = false;
                return;
            }

            if (typeof endEvents[Symbol.iterator] === 'function') {
                this.snackBar.onError('روندنما نمی‌تواند بیش از یک پایان داشته باشد.');
                this.waiting = false;
                return;
            }

            if (!endEvents?._attributes.name) {
                this.snackBar.onError('مرحله‌ی پایانی‌ نمی‌تواند بدون نام باشد.');
                this.waiting = false;
                return;
            }

            const checkEndAccessPromise = new Promise((resolve) => {
                this.flowService.getFlowForm(endEvents?._attributes.id, this.flowID).subscribe(
                    (flowDetail) => {
                        if (flowDetail?.accessRights?.length > 0) {
                            resolve(true);
                        }
                        resolve(false);
                    },
                    () => resolve(false)
                );
            });

            const res = await checkEndAccessPromise;
            if (!res) {
                this.snackBar.onError('مرحله‌ی پایانی‌ نمی‌تواند بدون دسترسی باشد.');
                this.waiting = false;
                return;
            }

            if (!endEvents?._attributes.name) {
                this.snackBar.onError('مرحله‌ی پایانی‌ نمی‌تواند بدون نام باشد.');
                this.waiting = false;
                return;
            }

            // Check Minimum Number Of Conditions
            const bpmnPlane = flowExport['bpmn:definitions']['bpmndi:BPMNDiagram']['bpmndi:BPMNPlane'];
            if (!bpmnPlane || !bpmnPlane['bpmndi:BPMNShape']) {
                this.snackBar.onError('روندنما نمی‌تواند بدون مرحله باشد.');
                this.waiting = false;
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
                this.snackBar.onError('روندنما نمی‌تواند کمتر از ۲ مرحله باشد.');
                this.waiting = false;
                return;
            }

            if (this.flowID) {
                this.flowService
                    .editFlow(
                        this.flowID,
                        this.flowForm.controls['flowName'].value,
                        this.flowForm.controls['flowCategory'].value,
                        JSON.parse(xml2json(xml, { compact: true }))
                    )
                    .pipe(finalize(() => (this.waiting = false)))
                    .subscribe(() => {});
            } else {
                this.flowService
                    .addNewFlow(
                        this.flowForm.controls['flowName'].value,
                        this.flowForm.controls['flowCategory'].value,
                        JSON.parse(xml2json(xml, { compact: true }))
                    )
                    .pipe(finalize(() => (this.waiting = false)))
                    .subscribe(() => {});
            }
        });
    }

    load(): void {
        this.modeler.importXML(this.initialBpmn, this.handleError);
        new Promise<null>(async () => {
            while (true) {
                await new Promise((r) => setTimeout(r, 1000));

                if (document.getElementById('camunda-id')) {
                    try {
                        document.getElementById('camunda-id')['readOnly'] = true;
                        this.elementColorManagement();
                        break;
                    } catch (e) {
                        break;
                    }
                }
            }
        }).then();
    }

    elementColorManagement(): void {
        const modeling = this.modeler.get('modeling');
        const elementRegistry = this.modeler.get('elementRegistry');
        elementRegistry.forEach((y) => {
            switch (y.type) {
                case 'bpmn:StartEvent':
                    modeling.setColor(y, { stroke: 'green', fill: 'rgba(50,255,105,0.4)' });
                    break;
                case 'bpmn:EndEvent':
                    modeling.setColor(y, { stroke: 'red', fill: 'rgba(255,77,165,0.4)' });
                    break;
                case 'bpmn:Task':
                    modeling.setColor(y, { stroke: '#0069ff', fill: '#fff' });
                    break;
                case 'bpmn:SequenceFlow':
                    modeling.setColor(y, { stroke: 'black', fill: 'rgba(0,0,0,0.4)' });
                    break;
                case 'bpmn:ExclusiveGateway':
                    modeling.setColor(y, { stroke: 'orange', fill: 'rgba(255,200,26,0.4)' });
                    break;
                case 'bpmn:ParallelGateway':
                    modeling.setColor(y, { stroke: 'orange', fill: 'rgba(255,200,26,0.4)' });
                    break;
                case 'bpmn:ServiceTask':
                    modeling.setColor(y, { stroke: 'purple', fill: 'rgba(255,148,221,0.4)' });
                    break;
            }
        });
    }

    save(): void {
        this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));
    }

    openDialog(name, id): void {
        this.dialog.open(FormBuilderComponent, {
            panelClass: 'dialog-p-0',
            data: { flowId: this.flowID, stateName: name, stateId: id, operators: this.operatorsList },
        });
    }
}
