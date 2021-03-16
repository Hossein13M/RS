import { SecuritiesHoldingFeesInfo } from './securities-holding-fee-info';

export interface SecuritiesInfo {
    sellDate: string;
    realSellDate: string;
    type: number;
    symbol: number;
    name: number;
    counts: number;
    sellPricePerUnit: number;
    repurchaseDate: string;
    realRepurchaseDate: string;
    repurchasePricePerUnit: number;
    maturityDate: string;
    issure: number;
    holdingPeriod: number;
    interestRate: number;
    interestPayingFreq: number;
    holdingFeesInfo: Array<SecuritiesHoldingFeesInfo>;
    tradingMarketName: string;
    issuePermision: string;
}
