/* tslint:disable */
export interface CreateFlowInstanceDto {
    code?: string;
    customerId: number;
    customerName: string;
    documentType: '1' | '2' | '3';
    flowId: string;
    parentId?: string;
    title: string;
}
