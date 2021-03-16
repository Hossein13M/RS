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
    isDraft: Boolean;
    id: number;
}
