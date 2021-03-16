/* tslint:disable */
export interface GetFileHistoryResponseDto {
    _id: string;
    date: string;
    entityId: string;
    fileName: string;
    objectName: string;
    type: 'FLOW' | 'FLOW INSTANCE';
}
