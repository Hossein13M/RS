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
    keyword: string;
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

export interface Form {
    form: string;
    keyword: string;
    name: string;
    organization: number;
    roles?: Array<number> | null;
    units?: [{ unit: number | null; roles: Array<number> | null }] | null;
    users?: Array<number> | null;
}
