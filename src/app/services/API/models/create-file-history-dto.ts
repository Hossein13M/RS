/* tslint:disable */
export interface CreateFileHistoryDto {
    entityId: string;
    fileName: string;
    objectName: string;
    type: 'FLOW' | 'FLOW INSTANCE';
}
