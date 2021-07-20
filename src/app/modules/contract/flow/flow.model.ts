export interface Flow {
    name: string;
    isManual: boolean;
    organization: number;
    _id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    bpmnConfiguration: any;
    contractTypes: Array<string>;
}
