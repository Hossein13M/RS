'use strict';

var inherits = require('inherits');

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');

var processProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps'),
    eventProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps'),
    linkProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps'),
    documentationProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps'),
    idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps'),
    nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps'),
    executableProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ExecutableProps');

function createGeneralTabGroups(element, canvas, bpmnFactory, elementRegistry, translate) {
    var generalGroup = {
        id: 'general',
        label: translate('General'),
        entries: [],
    };
    // idProps(generalGroup, element, translate);
    nameProps(generalGroup, element, bpmnFactory, canvas, translate);
    // processProps(generalGroup, element, translate);
    // executableProps(generalGroup, element, translate);

    var detailsGroup = {
        id: 'details',
        label: translate('Details'),
        entries: [],
    };
    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

    // var documentationGroup = {
    //     id: 'documentation',
    //     label: translate('Documentation'),
    //     entries: []
    // };
    //
    // documentationProps(documentationGroup, element, bpmnFactory, translate);

    return [
        generalGroup,
        detailsGroup,
        // documentationGroup
    ];
}

function CustomPropertiesProvider2(eventBus, canvas, bpmnFactory, elementRegistry, translate) {
    PropertiesActivator.call(this, eventBus);

    this.getTabs = function (element) {
        var generalTab = {
            id: 'general',
            label: translate('General'),
            groups: createGeneralTabGroups(element, canvas, bpmnFactory, elementRegistry, translate),
        };

        return [generalTab];
    };
}

CustomPropertiesProvider2.$inject = ['eventBus', 'canvas', 'bpmnFactory', 'elementRegistry', 'translate'];

inherits(CustomPropertiesProvider2, PropertiesActivator);

module.exports = CustomPropertiesProvider2;
