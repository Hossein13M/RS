export interface Flow {
    name: string;
    isManual: boolean;
    organization: number;
    _id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    bpmnConfiguration: any; // this property is JSONized version of XML that BPMN Library creates
    contractTypes: Array<string>;
}
