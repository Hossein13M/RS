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
