export interface Operators {
    flowUsers: Array<{ firstName: string; id: number; lastName: string; userId: number }>;
    id: number;
    step: number;
}

export interface SelectedOperators {
    flowUsers: Array<{ firstName: string; id: number; lastName: string; userId: number }>;
    id: number;
    step: number;
}

export interface Operator {
    createdAt: string | null;
    email: string | null;
    firstName: string | null;
    fullName: string | null;
    id: number | null;
    lastName: string | null;
    mobileNumber: string | null;
    partyId: string | null;
    personnelCode: number | null;
    userId: string | null;
    userName: string | null;
}
