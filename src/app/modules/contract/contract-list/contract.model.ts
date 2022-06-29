export interface Contract {
    category: number;
    code: string;
    contractType: ContractType;
    readonly createdAt?: Date;
    customer: Customer;
    flow: string;
    initializerUser?: InitializerUser;
    curentStep: string;
    isActive?: boolean;
    name: string;
    organization: number;
    parentId?: string;
    readonly updatedAt?: Date;
    readonly _id?: string;
}

export interface ContractTableList {
    code: string;
    contractType: string;
    createdAt: Date;
    customer: string;
    initializerUser: string;
    curentStep: string;
    isActive: boolean;
    name: string;
    updatedAt: Date;
    _id: string;
}

export interface Customer {
    name: string;
    nationalId: string;
    glCode: number;
    type: 'legal' | 'real';
    id: number;
}

export interface ContractType {
    name: string;
    _id: string;
}

export interface Customer {
    id: number;
    name: string;
}

export interface InitializerUser {
    id: number;
    name: string;
}
