export interface Compliance {
    id: number;
    code: number;
    title: string;
}

export interface ComplianceFund {
    id: number;
    up: number;
    down: number;
    fundName: string;
    complianceName: string;
}
