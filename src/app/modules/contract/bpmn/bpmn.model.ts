export interface BpmnStepTool {
    type: string;
    name: string;
    icon?: string;
    imageLink?: string;
    disabled: boolean;
}
export interface BPMNButtonForm {
    name: string;
    type: buttonType;
    isDefaultButton: boolean;
}

export type buttonType = 'upload' | 'download' | 'accept' | 'reject' | 'code';

export interface BpmnData {
    step: string;
    flow: string;
    isNewStep: boolean;
    name: string;
    attributes: Array<{ isDefaultButton: boolean; name: string; type: buttonType }>;
    accessRights: {
        units?: {
            unit: number;
            roles: Array<number>;
        };
        users?: Array<{ userId: number; isDefault: boolean }>;
        initializer: boolean;
    };
    _id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    authorizedUsers?: Array<number>;
}
