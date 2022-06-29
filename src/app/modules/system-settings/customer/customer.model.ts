export interface Customer {
    name: string;
    nationalId: string;
    glCode: number;
    type: CustomerType;
    id?: number;
}

export type CustomerType = 'legal' | 'real';
