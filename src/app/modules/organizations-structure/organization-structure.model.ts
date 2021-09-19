export interface OrganizationStructureModel {
    code: number;
    dbHost: string;
    dbName: string;
    dbPort: string;
    dbUsername: string;
    id: number;
    isActive: boolean;
    logo: string;
    name: string;
    positionNumber?: number;
}

export interface Role {
    deletedAt: null | string;
    id: number;
    name: string;
    organization: null | number;
}

export interface OrganizationRole<T> extends Role {
    children: Array<T>;
}

export interface Unit {
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
    id: number;
}

export interface OrganizationUnit<T> extends Unit {
    children: Array<T>;
}
