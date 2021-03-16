/* tslint:disable */
export interface CreateFundDto {
    /**
     * Company Registeration Organization Register code
     */
    CRORegisterCode?: number;

    /**
     * Stock Exchange organization Register code
     */
    SEORgisterCode?: number;
    activityStartDate?: string;

    /**
     * auditorId equal fundRoleId
     */
    auditorId?: number;

    /**
     * benefitGuarantorId equal fundRoleId
     */
    benefitGuarantorId?: number;
    benefitGuarantorPercent?: number;
    code: number;
    dayOfPayingProfit?: number;
    domainOfQuotation?: number;
    endDateOfpublicOffering?: string;
    establishingDate?: string;

    /**
     * Exchange-traded fund
     */
    etf?: boolean;
    fiscalMonth?: number;
    forecastProfitPercent?: number;
    frequenceId?: number;
    fundTypeId?: number;

    /**
     * General ledger code
     */
    glCode?: number;
    imageObjectName?: string;

    /**
     * investmentManagementId equal fundRoleId
     */
    investmentManagementId?: number;

    /**
     * liquidityGuarantorId equal fundRoleId
     */
    liquidityGuarantorId?: number;

    /**
     * marketerIds equal fundRoleId
     */
    marketerIds?: Array<number>;
    maxUnitNum?: number;
    minDailyDeal?: number;

    /**
     * minimum Daily Cash Guarantees guarantee
     */
    minDailyGuarantee?: number;
    minOrderQuantity?: number;
    minUnitNum?: number;
    name: string;
    nationalId: string;

    /**
     * number Of Privilege Units Of The Entire Fund
     */
    numberOfPrivilegeUnit?: number;
    perMinDailyDeal?: number;

    /**
     * registerManagementIds equal fundRoleId
     */
    registerManagementIds?: Array<number>;
    startDateOfpublicOffering?: string;
    symbol?: string;
    taxDueDay?: number;
    taxDueMonth?: number;

    /**
     * trusterId equal fundRoleId
     */
    trusterId?: number;

    /**
     * underwritingIds equal fundRoleId
     */
    underwritingIds?: Array<number>;
    unitFaceValue?: number;
    volMinDailyDeal?: number;
    website?: string;
}
