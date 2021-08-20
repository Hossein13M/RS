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
