import { AgSection } from 'ag-form-builder/lib/models/agSection.model';

export interface ElectionUsers {
    userId: null;
    username: string;
    isDefault: boolean;
}

export interface CardboardAction {
    contractId: string;
    currentStepId: string;
    action: 'confirm' | 'reject';
}

export interface CardboardInfo {
    steps: Array<{ id: string; name: string }>;
    form: FormButton | FinalForm;
    status: 'in progress' | 'pause' | string;
}

export type FinalForm = { name: string; sections: Array<AgSection> };

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

export type stepType = 'تایید' | 'رد' | 'بازگشایی' | 'متوقف' | 'ایجاد کد' | 'شروع' | 'پایان';

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
    action?: string;
    status: stepType;
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

export interface ContractCardboard {
    isActive: true;
    _id: string;
    organization: number;
    name: string;
    customer: {
        id: number;
        name: string;
    };
    category: number;
    initializerUser: {
        id: number;
        name: string;
    };
    contractType: string;
    flow: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    status: 'pause' | 'final' | 'in progress';
}

export interface ContractCardboardTableData {
    isActive: true;
    _id: string;
    name: string;
    code: string;
    createdAt: string;
    initializerUser: string;
    customer: string;
    status: 'pause' | 'final' | 'in progress';
}
