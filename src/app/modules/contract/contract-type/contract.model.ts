export interface ContractType {
    authorizedUsers: Array<any>;
    units: Array<{ unit: number; roles: Array<number> }>;
    roles: Array<number>;
    users: Array<number>;
    isActive: boolean;
    _id: string;
    name: string;
    form: string;
    organization: number;
    createdAt: string;
    updatedAt: string;
}

export interface RolesListBasedOnUnit {
    unit: number;
    roles: Array<number>;
}

export interface ContractForm {
    createdAt: string;
    isActive: boolean;
    name: string;
    organization: number;
    sections: Array<any>;
    updatedAt: string;
    _id: string;
}
