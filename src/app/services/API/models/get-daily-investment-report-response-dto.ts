/* tslint:disable */
import { GetDailyInvestmentReportResponseItemsDto } from './get-daily-investment-report-response-items-dto';
export interface GetDailyInvestmentReportResponseDto {
    items: Array<GetDailyInvestmentReportResponseItemsDto>;
    limit: number;
    skip: number;
    total: number;
}
