export const initialBpmn = {
    _declaration: { _attributes: { version: '1.0', encoding: 'UTF-8' } },
    'bpmn:definitions': {
        _attributes: {
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xmlns:bpmn': 'http://www.omg.org/spec/BPMN/20100524/MODEL',
            'xmlns:bpmndi': 'http://www.omg.org/spec/BPMN/20100524/DI',
            'xmlns:dc': 'http://www.omg.org/spec/DD/20100524/DC',
            'xmlns:bioc': 'http://bpmn.io/schema/bpmn/biocolor/1.0',
            'xmlns:di': 'http://www.omg.org/spec/DD/20100524/DI',
            id: 'Definitions_1',
            targetNamespace: 'http://bpmn.io/schema/bpmn',
        },
        'bpmn:process': {
            _attributes: { id: 'Process_1', name: 'نهایی', isExecutable: 'false' },
            'bpmn:startEvent': { _attributes: { id: 'StartEvent_1' }, 'bpmn:outgoing': { _text: 'SequenceFlow_0xegl7w' } },
            'bpmn:task': [
                {
                    _attributes: { id: 'Task_18fvqrd' , name: 'مرحله‌ی ۱' },
                    'bpmn:incoming': { _text: 'SequenceFlow_0xegl7w' },
                    'bpmn:outgoing': { _text: 'SequenceFlow_0ubjkgy' },
                },
                {
                    _attributes: { id: 'Task_0jo4nui', name: 'مرحله‌ی ۲' },
                    'bpmn:incoming': { _text: 'SequenceFlow_0ubjkgy' },
                    'bpmn:outgoing': { _text: 'SequenceFlow_0th1ip9' },
                },
            ],
            'bpmn:sequenceFlow': [
                { _attributes: { id: 'SequenceFlow_0xegl7w', sourceRef: 'StartEvent_1', targetRef: 'Task_18fvqrd' } },
                { _attributes: { id: 'SequenceFlow_0ubjkgy', sourceRef: 'Task_18fvqrd', targetRef: 'Task_0jo4nui' } },
                { _attributes: { id: 'SequenceFlow_0th1ip9', sourceRef: 'Task_0jo4nui', targetRef: 'EndEvent_1grrchx' } },
            ],
            'bpmn:endEvent': { _attributes: { id: 'EndEvent_1grrchx', name: 'نهایی' }, 'bpmn:incoming': { _text: 'SequenceFlow_0th1ip9' } },
        },
        'bpmndi:BPMNDiagram': {
            _attributes: { id: 'BPMNDiagram_1' },
            'bpmndi:BPMNPlane': {
                _attributes: { id: 'BPMNPlane_1', bpmnElement: 'Process_1' },
                'bpmndi:BPMNShape': [
                    {
                        _attributes: {
                            id: '_BPMNShape_StartEvent_2',
                            bpmnElement: 'StartEvent_1',
                            'bioc:stroke': 'green',
                            'bioc:fill': 'rgba(50,255,105,0.4)',
                        },
                        'dc:Bounds': { _attributes: { x: '173', y: '102', width: '36', height: '36' } },
                    },
                    {
                        _attributes: { id: 'Task_18fvqrd_di', bpmnElement: 'Task_18fvqrd', 'bioc:stroke': '#0069ff', 'bioc:fill': '#fff' },
                        'dc:Bounds': { _attributes: { x: '259', y: '80', width: '100', height: '80' } },
                    },
                    {
                        _attributes: { id: 'Task_0jo4nui_di', bpmnElement: 'Task_0jo4nui', 'bioc:stroke': '#0069ff', 'bioc:fill': '#fff' },
                        'dc:Bounds': { _attributes: { x: '409', y: '80', width: '100', height: '80' } },
                    },
                    {
                        _attributes: {
                            id: 'EndEvent_1grrchx_di',
                            bpmnElement: 'EndEvent_1grrchx',
                            'bioc:stroke': 'red',
                            'bioc:fill': 'rgba(255,77,165,0.4)',
                        },
                        'dc:Bounds': { _attributes: { x: '559', y: '102', width: '36', height: '36' } },
                        'bpmndi:BPMNLabel': { 'dc:Bounds': { _attributes: { x: '561', y: '145', width: '33', height: '14' } } },
                    },
                ],
                'bpmndi:BPMNEdge': [
                    {
                        _attributes: {
                            id: 'SequenceFlow_0xegl7w_di',
                            bpmnElement: 'SequenceFlow_0xegl7w',
                            'bioc:stroke': 'black',
                            'bioc:fill': 'rgba(0,0,0,0.4)',
                        },
                        'di:waypoint': [{ _attributes: { x: '209', y: '120' } }, { _attributes: { x: '259', y: '120' } }],
                    },
                    {
                        _attributes: {
                            id: 'SequenceFlow_0ubjkgy_di',
                            bpmnElement: 'SequenceFlow_0ubjkgy',
                            'bioc:stroke': 'black',
                            'bioc:fill': 'rgba(0,0,0,0.4)',
                        },
                        'di:waypoint': [{ _attributes: { x: '359', y: '120' } }, { _attributes: { x: '409', y: '120' } }],
                    },
                    {
                        _attributes: {
                            id: 'SequenceFlow_0th1ip9_di',
                            bpmnElement: 'SequenceFlow_0th1ip9',
                            'bioc:stroke': 'black',
                            'bioc:fill': 'rgba(0,0,0,0.4)',
                        },
                        'di:waypoint': [{ _attributes: { x: '509', y: '120' } }, { _attributes: { x: '559', y: '120' } }],
                    },
                ],
            },
        },
    },
};