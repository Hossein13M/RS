/* tslint:disable */
import { FundFrequenceDto } from './fund-frequence-dto';
import { FundRoleDto } from './fund-role-dto';
import { FundTypeDto } from './fund-type-dto';

export interface ResponseFundDto {
    /**
     * Company Registeration Organization Register code
     */
    CRORegisterCode?: number;

    /**
     * Stock Exchange organization Register code
     */
    SEORgisterCode?: number;
    activityStartDate?: string;
    auditor?: FundRoleDto;
    benefitGuarantor?: FundRoleDto;
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
    frequence?: FundFrequenceDto;
    fundType?: FundTypeDto;

    /**
     * General ledger code
     */
    glCode?: number;
    id: number;
    imageObjectName?: string;
    imageUrl?: string;
    investmentManagement?: FundRoleDto;
    liquidityGuarantor?: FundRoleDto;
    marketers?: Array<FundRoleDto>;
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
    registerManagements?: Array<FundRoleDto>;
    startDateOfpublicOffering?: string;
    symbol?: string;
    taxDueDay?: number;
    taxDueMonth?: number;
    truster?: FundRoleDto;
    underwritings?: Array<FundRoleDto>;
    unitFaceValue?: number;
    volMinDailyDeal?: number;
    website?: string;
}
