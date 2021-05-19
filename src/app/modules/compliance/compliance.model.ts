export interface ComplianceModel {
    id: number;
    code: number;
    title: string;
}

export interface ComplianceFundModel {
    id: number;
    up: number;
    down: number;
    fundName: string;
    complianceName: string;
}