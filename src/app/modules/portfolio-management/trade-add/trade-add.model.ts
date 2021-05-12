export interface Ticker {
    id: number;
    isInBourse: boolean;
    name: string;
    status: string;
    ticker: string;
}

export interface TradeOrganization {
    API: string;
    branch: any;
    branchId: any;
    brokerId: number;
    btt: string;
    btu: string;
    comments: string;
    commission: string;
    date: string;
    domainId: number;
    id: number;
    inventory: string;
    nationalCode: string;
    organizationType: string;
    pamCode: string;
    plt: string;
    plu: string;
    price: string;
    sum: any;
    symbol: string;
    ticker: string;
    tradeLocation: string;
    tradeType: string;
    transactionDate: string;
    uniqueId: string;
    value: string;
    valuePerUnit: string;
    valueWithoutCommission: any;
    volume: string;
}
