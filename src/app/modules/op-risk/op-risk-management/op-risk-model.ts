export class OpRiskModel {
    flow: number;
    title: string;
    organizationCharts: [number];
    owners: [number];
    processes: [number];
    businessLines: [number];
    products: [number];
    levels: [number];
    averageIncomeType: string;
    averageIncome: number;
    parents: [number];
    drivers: [number];
    driversDescription: string;
    control: string;
    controlDetails: [
        {
            type: string;
            description: string;
            value: number;
            classifications: [number];
        }
    ];
    recoveries: [number];
    recoveriesDescription: string;
    recoveriesAvg: number;
    directLosses: [number];
    directLossesDescription: string;
    directLossesAvg: number;
    inDirectLosses: [number];
    inDirectLossesDescription: string;
    inDirectLossesAvg: number;
    isDraft: boolean;
    id: number;
}

export interface Flow {
    data: Array<FlowResponse>;
    state: string;
}

export interface FlowResponse {
    id: number;
    isActive: symbol;
    name: string;
    stepsCount: number;
}

export interface RiskStepInfo {
    action: string;
    createdAt: string;
    fromStep: number;
    id: number;
    rejectReason: null;
    toStep: number;
    userId: number;
    username: string;
}

export interface OperationRiskDetails {
    averageIncome: number;
    averageIncomeType: string;
    businessLines: Array<{ id: number; treeNode: TreeNode }>;
    control: string;
    controlDetails: Array<{ type: string; description: string; value: number; classifications: Array<number> }>;
    createdAt: string;
    directLosses: Array<{ id: number; treeNode: TreeNode }>;
    directLossesAvg: string;
    directLossesDescription: string;
    drivers: Array<{ id: number; treeNode: TreeNode }>;
    driversDescription: string;
    flow: Flow;
    id: number;
    inDirectLosses: Array<{ id: number; treeNode: TreeNode }>;
    inDirectLossesAvg: string;
    inDirectLossesDescription: string;
    isDraft: boolean;
    levels: Array<{ id: number; treeNode: TreeNode }>;
    organizationCharts: Array<{ id: number; opRisk: number; treeNode: TreeNode }>;
    owners: Array<{ id: number; treeNode: TreeNode }>;
    parents: Array<{ id: number; treeNode: OperationRiskParentDetails }>;
    processes: [];
    products: Array<{ id: number; treeNode: TreeNode }>;
    recoveries: Array<{ id: number; treeNode: TreeNode }>;
    recoveriesAvg: string;
    recoveriesDescription: string;
    status: string;
    title: string;
    userId: number;
}

export interface TreeNode {
    deletedAt: any;
    icon: string;
    id: number;
    titleEN: any;
    titleFA: string;
}

export interface OperationRiskParentDetails {
    averageIncome: number;
    averageIncomeType: string;
    control: string;
    createdAt: string;
    directLossesAvg: string;
    directLossesDescription: string;
    driversDescription: string;
    id: number;
    inDirectLossesAvg: string;
    inDirectLossesDescription: string;
    isDraft: false;
    recoveriesAvg: string;
    recoveriesDescription: string;
    status: string;
    title: string;
    userId: number;
}

export interface Flow {
    id: number;
    isActive: boolean;
    name: string;
    stepsCount: number;
    flowSteps: Array<{ id: number; step: number; flowUsers: Array<FlowUser> }>;
}

export interface FlowUser {
    id: number;
    userId: number;
}
