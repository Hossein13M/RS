/* tslint:disable */
export interface CreateMarketDto {
    apiActive?: number;
    bourseCode?: string;
    brokerId: number;
    isBOC?: number;
    nationalId: string;
    organizationType: string;
    pamCode: string;
    password?: string;
    symbolORFundTitle?: string;
    username?: string;
}
