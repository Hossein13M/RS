export interface Flow {
    name: string;
    id: number | string;
    bpmnConfiguration: any;
    contractTypes: Array<any>;
    isManual: boolean;
}
