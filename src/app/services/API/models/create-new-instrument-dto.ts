/* tslint:disable */
export interface CreateNewInstrumentDto {
    boardId?: number;
    isActive: boolean;
    isInBourse: boolean;
    marketId?: number;
    name: string;
    nameEn?: string;
    symbol?: string;
    symbolEn?: string;
    ticker: string;
    type: number;
}
