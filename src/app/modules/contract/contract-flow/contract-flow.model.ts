export interface Flow {
    name: string;
    isManual: boolean;
    organization: number;
    id?: string;
    _id?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    bpmnConfiguration: any; // this property is JSONized version of XML that BPMN Library creates
    contractTypes: Array<string>;
    states: Array<string>;
}
