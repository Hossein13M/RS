export interface Baskets {
    id: number;
    title: string;
}

export interface Category {
    id: number;
    title: string;
}

export interface Fund {
    code: number;
    id: number;
    name: string;
    nationalId: string;
}

export interface SearchParams {
    tamadonAssets: boolean;
    fundNationalCodes: any;
    date: any;
    listedAssets: boolean;
    nonlistedAssets: boolean;
    bondsAssets: boolean;
    stocksAssets: boolean;
    fundsAssets: boolean;
}

export interface AumData {
    etf: { data: any; state: string };
    bond: { data: any; state: string };
    nlBond: { data: any; state: string };
    stocks: { data: any; state: string };
    nlStocks: { data: any; state: string };
    funds: { data: any; state: string };
    nlFunds: { data: any; state: string };
    deposit: { data: any; state: string };
}
