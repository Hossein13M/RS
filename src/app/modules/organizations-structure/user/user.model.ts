export interface UserRole {
    organizationId: number;
    organizationCode: number;
    personnelCode: string;
    units: Array<number>;
    roles: Array<number>;
}

export interface AccessRole {
    id: number;
    name: string;
    isActive: boolean;
    deletedAt: Date | null;
}

export interface TokenUser {
    exp: number;
    firstname: string;
    lastname: string;
    iat: number;
    services: string;
    status: string;
    userId: number;
    userRoles: Array<{ organizationCode: number; organizationId: number; personnelCode: number; roles: Array<number>; units: Array<number> }>;
}

export interface User {
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    nationalCode: string;
    organizationStructures: Array<OrganizationStructures>;
    birthDate: string;
    id: number;
    status: string;
    userRoles: Array<UserRole>;
}

export interface OrganizationStructures {
    organizationCode: number;
    organizationId: number;
    personnelCode: string;
    roles: Array<number>;
    units: Array<number>;
    userRole: number;
}

export interface Organization {
    name: string;
    dbHost: string;
    dbPort: string;
    dbUsername: string;
    dbPassword: string;
    dbName: string;
    logo: string;
    id: number;
    code: number;
}

export interface Units {
    id: number;
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
    children: Array<Units>;
    mappings: Array<{ childId: number; id: number; name: string }>;
}

export interface Roles {
    id: number;
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
}

export interface BackendData {
    firstname: string;
    lastname: string;
    nationalCode: string;
    birthDate: Date | string;
    email: string;
    phoneNumber: string;
    organizationStructures: Array<UserRoles>;
    id?: number;
}

export interface UserRoles {
    organizationId: number;
    organizationCode: number;
    personnelCode: string;
    userRole: number;
    units: Array<number>;
    roles: Array<number>;
}
