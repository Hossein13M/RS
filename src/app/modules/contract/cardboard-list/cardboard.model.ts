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
    form: any;
    status: string;
}
