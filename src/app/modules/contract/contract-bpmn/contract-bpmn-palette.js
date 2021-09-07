import { assign } from 'min-dash';
import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';

/**
 * A palette provider for BPMN 2.0 elements.
 */
export function CustomPaletteProvider(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
    this._palette = palette;
    this._create = create;
    this._elementFactory = elementFactory;
    this._globalConnect = globalConnect;
    this._translate = translate;

    palette.registerProvider(this);
}

PaletteProvider.$inject = ['palette', 'create', 'elementFactory', 'spaceTool', 'lassoTool', 'handTool', 'globalConnect', 'translate'];

PaletteProvider.prototype.getPaletteEntries = function () {
    var actions = {},
        create = this._create,
        elementFactory = this._elementFactory,
        spaceTool = this._spaceTool,
        lassoTool = this._lassoTool,
        handTool = this._handTool,
        globalConnect = this._globalConnect,
        translate = this._translate;

    function createAction(type, group, className, title, options) {
        function createListener(event) {
            var shape = elementFactory.createShape(assign({ type: type }, options));

            if (options) {
                var di = getDi(shape);
                di.isExpanded = options.isExpanded;
            }

            create.start(event, shape);
        }

        var shortType = type.replace(/^bpmn:/, '');

        return {
            group: group,
            className: className,
            title: title || translate('Create {type}', { type: shortType }),
            action: {
                dragstart: createListener,
                click: createListener,
            },
        };
    }

    assign(actions, {
        'hand-tool': {
            group: 'tools',
            className: 'bpmn-icon-hand-tool',
            title: translate('Activate the hand tool'),
            action: {
                click: function (event) {
                    handTool.activateHand(event);
                },
            },
        },
        'lasso-tool': {
            group: 'tools',
            className: 'bpmn-icon-lasso-tool',
            title: translate('Activate the lasso tool'),
            action: {
                click: function (event) {
                    lassoTool.activateSelection(event);
                },
            },
        },
        'space-tool': {
            group: 'tools',
            className: 'bpmn-icon-space-tool',
            title: translate('Activate the create/remove space tool'),
            action: {
                click: function (event) {
                    spaceTool.activateSelection(event);
                },
            },
        },
        'global-connect-tool': {
            group: 'tools',
            className: 'bpmn-icon-connection-multi',
            title: translate('Activate the global connect tool'),
            action: {
                click: function (event) {
                    globalConnect.start(event);
                },
            },
        },
        'tool-separator': {
            group: 'tools',
            separator: true,
        },
        'create.start-event': createAction('bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none', translate('Create StartEvent')),
        'create.end-event': createAction('bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none', translate('Create EndEvent')),
        'create.exclusive-gateway': createAction('bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-none', translate('Create Gateway')),
        'create.task': createAction('bpmn:Task', 'activity', 'bpmn-icon-task', translate('Create Task')),
    });

    return actions;
};
