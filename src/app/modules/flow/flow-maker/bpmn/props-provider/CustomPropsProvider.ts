import { IPropertiesProvider } from '../bpmn-js/bpmn-js';

export class CustomPropsProvider implements IPropertiesProvider {
    static $inject = ['translate', 'bpmnPropertiesProvider'];

    // Note that names of arguments must match injected modules, see InjectionNames.
    constructor(private translate, private bpmnPropertiesProvider) {}

    getTabs(element): any {
        const properties = this.bpmnPropertiesProvider.getTabs(element);
        const deleteThisItem = properties[0].groups[0].entries.find((item) => item.id == 'process-is-executable');
        const index = properties[0].groups[0].entries.indexOf(deleteThisItem);
        if (index > -1) {
            properties[0].groups[0].entries.splice(index, 1);
        }
        // properties[0].groups[0].entries.splice(-1,1);
        return properties;
        //   .concat({
        //     id: 'custom',
        //     label: this.translate('Custom'),
        //     groups: [
        //       {
        //         id: 'customText',
        //         label: this.translate('customText'),
        //         entries: [
        //           EntryFactory.textBox({
        //             id: 'custom',
        //             label: this.translate('customText'),
        //             modelProperty: 'customText'
        //           }),
        //         ]
        //       }
        //     ]
        //   });
    }
}
