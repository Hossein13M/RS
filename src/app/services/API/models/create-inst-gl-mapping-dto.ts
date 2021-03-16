/* tslint:disable */
export interface CreateInstGlMappingDto {
    glCode: number;
    status: 'active' | 'deleted';
    symbol: string;
    ticker: string;
}
