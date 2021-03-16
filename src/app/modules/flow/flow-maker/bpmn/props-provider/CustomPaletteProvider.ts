import { IPalette, IPaletteProvider } from '../bpmn-js/bpmn-js';

export class CustomPaletteProvider implements IPaletteProvider {
    static $inject = ['palette', 'originalPaletteProvider', 'elementFactory'];

    private readonly elementFactory: any;

    // Note that names of arguments must match injected modules, see InjectionNames.
    // I don't know why originalPaletteProvider matters but it breaks if it isn't there.
    // I guess since this component is injected, and it requires an instance of originalPaletteProvider,
    // originalPaletteProvider will be new'ed and thus call palette.registerProvider for itself.
    // There probably is a better way.
    constructor(private palette: IPalette, private originalPaletteProvider: IPaletteProvider, elementFactory) {
        palette.registerProvider(this);
        this.elementFactory = elementFactory;
    }

    getPaletteEntries(): any {
        return {
            'hand-tool': this.originalPaletteProvider.getPaletteEntries()['hand-tool'],
        };
        return {
            'create.data-object': {
                group: 'data-object',
                className: 'bpmn-icon-data-object',
                title: 'Create DataObjectReference',
                action: () => {},
            },
            'create.data-store': {
                group: 'data-store',
                title: 'TEST',
                icon: 'create.data-store',
                action: () => {},
            },
            'create.end-event': {
                group: 'event',
                className: 'bpmn-icon-end-event-none',
                title: 'Create EndEvent',
                action: () => {},
            },
            'create.exclusive-gateway': {
                group: 'gateway',
                className: 'bpmn-icon-gateway-none',
                title: 'Create Gateway',
                action: () => {},
            },
            'create.intermediate-event': {
                group: 'event',
                className: 'bpmn-icon-intermediate-event-none',
                title: 'Create Intermediate/Boundary Event',
                action: () => {},
            },
            'create.participant-expanded': {
                group: 'collaboration',
                className: 'bpmn-icon-participant',
                title: 'Create Pool/Participant',
                action: () => {},
            },
            'create.start-event': {
                group: 'event',
                className: 'bpmn-icon-start-event-none',
                title: 'Create StartEvent',
                action: () => {},
            },
            'create.subprocess-expanded': {
                group: 'activity',
                className: 'bpmn-icon-subprocess-expanded',
                title: 'Create expanded SubProcess',
                action: () => {},
            },
            'create.task': {
                group: 'activity',
                className: 'bpmn-icon-task',
                title: 'Create Task',
                action: () => {},
            },
            'global-connect-tool': {
                group: 'tools',
                className: 'bpmn-icon-connection-multi',
                title: 'Activate the global connect tool',
                action: () => {},
            },
            'lasso-tool': {
                group: 'tools',
                className: 'bpmn-icon-lasso-tool',
                title: 'Activate the lasso tool',
                action: () => {},
            },
            'space-tool': {
                group: 'tools',
                className: 'bpmn-icon-space-tool',
                title: 'Activate the create/remove space tool',
                action: () => {},
            },
            'tool-separator': {
                group: 'tools',
                separator: true,
            },
        };
    }
}
