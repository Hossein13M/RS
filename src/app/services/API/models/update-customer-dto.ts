/* tslint:disable */
export interface UpdateCustomerDto {
    glCode?: number;
    id: number;
    name?: string;
    nationalId?: string;
    type?: 'legal' | 'real';
}
