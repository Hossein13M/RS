export interface Login {
    username: string;
    password: string;
}

export interface Token {
    accessToken: string;
}

export interface User {
    userId: number;
    firstname: string;
    lastname: string;
    status: Status;
    exp: number;
    iat: number;
}

export enum Status {
    unauthorized = 'Unauthorized',
    active = 'Active',
    inactive = 'Inactive',
    blocked = 'Blocked',
}
