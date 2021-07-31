import { Component } from '@angular/core';
import { defaultBpmn } from '../default.bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn';
import BpmnModeler from 'bpmn-js/lib/Modeler';

@Component({
    selector: 'app-bpmn-diagram',
    templateUrl: './bpmn-diagram.component.html',
    styleUrls: ['./bpmn-diagram.component.scss'],
})
export class BpmnDiagramComponent {
    private modeler;

    public saveName = '';

    constructor() {}

    ngOnInit() {
        this.initBpmn();
    }

    initBpmn() {
        this.modeler = new BpmnModeler({
            container: '#js-canvas',
            propertiesPanel: {
                parent: '#js-properties-panel',
            },
            additionalModules: [propertiesProvider, propertiesPanelModule],
        });
        this.createDiagram();
    }

    createDiagram() {
        this.importDiagram();
    }

    importDiagram() {
        this.modeler.importXML(defaultBpmn, function (err) {
            if (err) {
                console.error(err);
            }
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
}
