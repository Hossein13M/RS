export interface User {
    firstname: string;
    lastname: string;
    email: string;
    personnelCode: string;
    username: string;
    password: string;
    phoneNumber: string;
    organization: Array<string>;
    organizationRole: Array<string>;
    nationalCode: string;
    birthDate: string;
    id: number;
    status: string;
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

export interface OrganizationUnits {
    id: number;
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
    children: Array<OrganizationUnits>;
    mapping: Array<any>;
}

export interface OrganizationRoles {
    id: number;
    name: string;
    parent: number;
    organization: number;
    deletedAt: string;
    children: Array<OrganizationUnits>;
    mapping: Array<any>;
}
