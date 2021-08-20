export interface ElectionUsers {
    userId: null;
    isDefault: boolean;
}

export interface CardboardAction {
    contract: string;
    step: string;
    action: 'accept' | 'reject';
}

export interface CardboardInfo {
    steps: Array<{ id: string; name: string }>;
    form: FormButton;
    status: 'in progress' | 'pause' | string;
}

export type FormButton = Array<{ isDefaultButton: boolean; name: string; type: ContractFormButtonTypes }>;

export type ContractFormButtonTypes = 'upload' | 'download' | 'accept' | 'reject' | 'code';

export interface ContractNote {
    contract: string;
    note: string;
    step: {
        id: string;
        name: string;
    };
    user: {
        id: number;
        name: string;
    };
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface NoteAdd {
    contract: string;
    note: string;
    step: {
        id: string;
        name: string;
    };
}

export interface ContractHistory {
    fromStep: {
        id: string;
        name: string;
    };
    toStep: {
        id: string;
        name: string;
    };
    user: {
        id: number;
        name: string;
    };
    action: string;
    contract: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContractHistoryTableData {
    fromStep: string;
    toStep: string;
    user: string;
    action: string;
    updatedAt: Date;
}
