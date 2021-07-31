export interface Contract {
    organization: number;
    name: string;
    customer: {
        id: number;
        name: string;
    };
    category: 1;
    code: string;
    parentId: string;
    contractType: string;
    flow: string;
    isActive?: boolean;
    readonly _id?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}

export interface Customer {
    name: string;
    nationalId: string;
    glCode: number;
    type: 'legal' | 'real';
    id: number;
}
