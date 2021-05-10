export interface TableElement {
    bourseAccount: string;
    volume: number;
    vwap: number;
    asset: string;
    brokerName: string;
    vwapUpdateDate: string;
}

export interface TradeBook {
    details: Array<TradeBookDetails>;
    organization: string;
    totalAssets: string;
}

export interface TradeBookDetails {
    asset: string;
    bourseAccount: string;
    brokerName: string;
    btt: string;
    organizationType: string;
    pamCode: string;
    ticker: string;
    type: number;
    volume: string;
    vwap: string;
    vwapAdjusted: any;
    vwapAdjustedUpdateDate: any;
    vwapUpdateDate: string;
    dateFa?: any;
}

export interface TradeDateServerResponse {
    API: string;
    btt: string;
    btu: string;
    comments: string;
    commission: string;
    id: number;
    inventory: string;
    plt: string;
    plu: string;
    price: string;
    tradeLocation: string;
    tradeType: string;
    transactionDate: string;
    value: string;
    volume: string;
}

export interface TradeBookData {
    organization: string;
    ticker: string;
    pamCode: string;
    date: string;
}
