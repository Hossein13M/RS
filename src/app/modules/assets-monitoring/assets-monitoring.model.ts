export interface Instrument {
    ticker: string;
    symbol: string;
}

export interface InstrumentSearchParams {
    basket: Array<string>;
    date: string;
}

export interface AssetsTable {
    ticker: string;
    symbol: string;
    code: number | string;
    type: string;
    fundNationalCode: string;
    volume: number | string;
    lastUpdateDate: string;
    maturityDate: string;
    tradeLocation: string;
    price: string;
    value: number | string;
    percentOfTotalAssets: number | string;
}

export interface TrendChart {
    date: string;
    totalVolume: number;
}

export interface PieChart {
    children: Array<{ name: string; value: string }>;
    name: string;
    value: number;
}

export interface AssetMonitoring {
    tableOfAssets: Array<AssetsTable>;
    totalVolume: number;
    totalValue: number;
    trendChart: Array<TrendChart>;
    pieChart: Array<PieChart>;
}
