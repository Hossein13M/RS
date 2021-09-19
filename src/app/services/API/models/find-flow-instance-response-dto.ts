/* tslint:disable */
import { FindFlowInstanceFlowIdDto } from './find-flow-instance-flow-id-dto';

export interface FindFlowInstanceResponseDto {
    _id: string;
    allStates: number;
    code?: string;
    customerId: number;
    customerName: string;
    date: string;
    documentType: '1' | '2' | '3';
    flowId: FindFlowInstanceFlowIdDto;
    isActive: boolean;
    lastChangeStateDate: string;
    parentId?: string;
    progress: number;
    state: string;
    title: string;
}
