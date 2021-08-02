import { Component } from '@angular/core';
import { defaultBpmn } from '../default.bpmn';
import propertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { MatDialog } from '@angular/material/dialog';
import { BpmnDialogComponent } from '../bpmn-dialog/bpmn-dialog.component';
import { AlertService } from '#services/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bpmn-diagram',
    templateUrl: './bpmn-diagram.component.html',
    styleUrls: ['./bpmn-diagram.component.scss'],
})
export class BpmnDiagramComponent {
    private modeler;
    private flowID: string;
    public saveName = '';
    private eventBus: any;

    constructor(private dialog: MatDialog, private alertService: AlertService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.initBpmn();
        this.flowID = this.activatedRoute.snapshot.queryParamMap.get('id');
        this.eventBus = this.modeler.get('eventBus');
        this.eventBus.on('element.dblclick', this.clickListener.bind(this));
    }

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
        this.modeler.importXML(defaultBpmn, function (err) {
            if (err) {
                console.error(err);
            }
            // noinspection JSPotentiallyInvalidUsageOfClassThis
            this.modeler.get('canvas').zoom('fit-viewport');
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
        if (data) {
            this.saveName = name;
        }
    }

    public clickListener(event): void {
        if (event.element.type === 'bpmn:Task') {
            if (event.element.businessObject.name) {
                this.openDialog(event.element.businessObject.name, event.element.id);
            } else {
                this.alertService.onError('نخست یک نام برگزینید');
            }
        }

        if (event.element.type === 'bpmn:EndEvent') {
            event.element.businessObject.name = 'پایانی';
            this.dialog.open(BpmnDialogComponent, {
                width: '1200px',
                height: '700px',
                panelClass: 'dialog-p-0',
                data: { flowId: this.flowID, stateName: event.element.businessObject.name, stateId: event.element.id },
            });
        }
    }

    private openDialog(name, id): void {
        this.dialog.open(BpmnDialogComponent, {
            width: '1200px',
            height: '700px',
            panelClass: 'dialog-p-0',
            data: { flowId: this.flowID, stateName: name, stateId: id },
        });
    }
}
