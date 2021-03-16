/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { GetDailyInvestmentReportResponseDto } from '../models/get-daily-investment-report-response-dto';
import { GetOrganizationsDto } from '../models/get-organizations-dto';
import { GetTradeDataResponseDto } from '../models/get-trade-data-response-dto';
import { GetTradingBookResponseDto } from '../models/get-trading-book-response-dto';
import { UpdateIpsHistoryResponseDto } from '../models/update-ips-history-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class PortfolioManagementServiceService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation portfolioManagementControllerGetOrganizations
     */
    static readonly PortfolioManagementControllerGetOrganizationsPath = '/api/v1/portfolio-management-service/organizations';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `portfolioManagementControllerGetOrganizations()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerGetOrganizations$Response(params?: {}): Observable<StrictHttpResponse<Array<GetOrganizationsDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            PortfolioManagementServiceService.PortfolioManagementControllerGetOrganizationsPath,
            'get'
        );
        if (params) {
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<Array<GetOrganizationsDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `portfolioManagementControllerGetOrganizations$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerGetOrganizations(params?: {}): Observable<Array<GetOrganizationsDto>> {
        return this.portfolioManagementControllerGetOrganizations$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetOrganizationsDto>>) => r.body as Array<GetOrganizationsDto>)
        );
    }

    /**
     * Path part for operation portfolioManagementControllerGetTradingBook
     */
    static readonly PortfolioManagementControllerGetTradingBookPath = '/api/v1/portfolio-management-service/trading-book';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `portfolioManagementControllerGetTradingBook()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerGetTradingBook$Response(params?: {
        /**
         * Default value is Date of YESTERDAY. Example: 2020-05-23
         */
        date?: Date;
    }): Observable<StrictHttpResponse<Array<GetTradingBookResponseDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            PortfolioManagementServiceService.PortfolioManagementControllerGetTradingBookPath,
            'get'
        );
        if (params) {
            rb.query('date', params.date, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<Array<GetTradingBookResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `portfolioManagementControllerGetTradingBook$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerGetTradingBook(params?: {
        /**
         * Default value is Date of YESTERDAY. Example: 2020-05-23
         */
        date?: Date;
    }): Observable<Array<GetTradingBookResponseDto>> {
        return this.portfolioManagementControllerGetTradingBook$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetTradingBookResponseDto>>) => r.body as Array<GetTradingBookResponseDto>)
        );
    }

    /**
     * Path part for operation portfolioManagementControllerGetTradeData
     */
    static readonly PortfolioManagementControllerGetTradeDataPath = '/api/v1/portfolio-management-service/trade-data';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `portfolioManagementControllerGetTradeData()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerGetTradeData$Response(params: {
        ticker: string;
        pamCode: string;
        organization: 'T' | 'M';

        /**
         * Default value is Date of YESTERDAY. Example: 2020-05-23
         */
        date?: Date;
        limit: number;
        skip: number;
    }): Observable<StrictHttpResponse<GetTradeDataResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, PortfolioManagementServiceService.PortfolioManagementControllerGetTradeDataPath, 'get');
        if (params) {
            rb.query('ticker', params.ticker, {});
            rb.query('pamCode', params.pamCode, {});
            rb.query('organization', params.organization, {});
            rb.query('date', params.date, {});
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<GetTradeDataResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `portfolioManagementControllerGetTradeData$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerGetTradeData(params: {
        ticker: string;
        pamCode: string;
        organization: 'T' | 'M';

        /**
         * Default value is Date of YESTERDAY. Example: 2020-05-23
         */
        date?: Date;
        limit: number;
        skip: number;
    }): Observable<GetTradeDataResponseDto> {
        return this.portfolioManagementControllerGetTradeData$Response(params).pipe(
            map((r: StrictHttpResponse<GetTradeDataResponseDto>) => r.body as GetTradeDataResponseDto)
        );
    }

    /**
     * Path part for operation portfolioManagementControllerSearchTradeData
     */
    static readonly PortfolioManagementControllerSearchTradeDataPath = '/api/v1/portfolio-management-service/search-trade-data';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `portfolioManagementControllerSearchTradeData()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerSearchTradeData$Response(params: {
        organization?: Array<string>;
        tradeType?: Array<string>;

        /**
         * بورسی &#x3D; ۱ ، غیر بورسی &#x3D; ۲ و همه &#x3D; ۳
         */
        tradeLocation?: '1' | '2' | '3';

        /**
         * Example: 2020-05-23
         */
        transactionDateStart?: Date;

        /**
         * Example: 2020-05-23
         */
        transactionDateEnd?: Date;
        volumeStart?: string;
        volumeEnd?: string;
        valueStart?: string;
        valueEnd?: string;
        pltStart?: string;
        pltEnd?: string;
        ticker?: Array<string>;
        limit: number;
        skip: number;
    }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            PortfolioManagementServiceService.PortfolioManagementControllerSearchTradeDataPath,
            'get'
        );
        if (params) {
            rb.query('organization', params.organization, {});
            rb.query('tradeType', params.tradeType, {});
            rb.query('tradeLocation', params.tradeLocation, {});
            rb.query('transactionDateStart', params.transactionDateStart, {});
            rb.query('transactionDateEnd', params.transactionDateEnd, {});
            rb.query('volumeStart', params.volumeStart, {});
            rb.query('volumeEnd', params.volumeEnd, {});
            rb.query('valueStart', params.valueStart, {});
            rb.query('valueEnd', params.valueEnd, {});
            rb.query('pltStart', params.pltStart, {});
            rb.query('pltEnd', params.pltEnd, {});
            rb.query('ticker', params.ticker, {});
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'text',
                    accept: '*/*',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `portfolioManagementControllerSearchTradeData$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerSearchTradeData(params: {
        organization?: Array<string>;
        tradeType?: Array<string>;

        /**
         * بورسی &#x3D; ۱ ، غیر بورسی &#x3D; ۲ و همه &#x3D; ۳
         */
        tradeLocation?: '1' | '2' | '3';

        /**
         * Example: 2020-05-23
         */
        transactionDateStart?: Date;

        /**
         * Example: 2020-05-23
         */
        transactionDateEnd?: Date;
        volumeStart?: string;
        volumeEnd?: string;
        valueStart?: string;
        valueEnd?: string;
        pltStart?: string;
        pltEnd?: string;
        ticker?: Array<string>;
        limit: number;
        skip: number;
    }): Observable<void> {
        return this.portfolioManagementControllerSearchTradeData$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation portfolioManagementControllerDailyInvestmentReport
     */
    static readonly PortfolioManagementControllerDailyInvestmentReportPath = '/api/v1/portfolio-management-service/daily-investment-report';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `portfolioManagementControllerDailyInvestmentReport()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerDailyInvestmentReport$Response(params: {
        /**
         * Example: 2020-05-23. Default value is today
         */
        date?: string;
        limit: number;
        skip: number;
    }): Observable<StrictHttpResponse<Array<GetDailyInvestmentReportResponseDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            PortfolioManagementServiceService.PortfolioManagementControllerDailyInvestmentReportPath,
            'get'
        );
        if (params) {
            rb.query('date', params.date, {});
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<Array<GetDailyInvestmentReportResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `portfolioManagementControllerDailyInvestmentReport$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerDailyInvestmentReport(params: {
        /**
         * Example: 2020-05-23. Default value is today
         */
        date?: string;
        limit: number;
        skip: number;
    }): Observable<Array<GetDailyInvestmentReportResponseDto>> {
        return this.portfolioManagementControllerDailyInvestmentReport$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetDailyInvestmentReportResponseDto>>) => r.body as Array<GetDailyInvestmentReportResponseDto>)
        );
    }

    /**
     * Path part for operation portfolioManagementControllerUpdateIpsHistory
     */
    static readonly PortfolioManagementControllerUpdateIpsHistoryPath = '/api/v1/portfolio-management-service/update-ips-history';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `portfolioManagementControllerUpdateIpsHistory()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerUpdateIpsHistory$Response(params: {
        /**
         * Example: 2020-05-23
         */
        date?: string;
        limit: number;
        skip: number;
    }): Observable<StrictHttpResponse<UpdateIpsHistoryResponseDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            PortfolioManagementServiceService.PortfolioManagementControllerUpdateIpsHistoryPath,
            'get'
        );
        if (params) {
            rb.query('date', params.date, {});
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
        }
        return this.http
            .request(
                rb.build({
                    responseType: 'json',
                    accept: 'application/json',
                })
            )
            .pipe(
                filter((r: any) => r instanceof HttpResponse),
                map((r: HttpResponse<any>) => {
                    return r as StrictHttpResponse<UpdateIpsHistoryResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `portfolioManagementControllerUpdateIpsHistory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    portfolioManagementControllerUpdateIpsHistory(params: {
        /**
         * Example: 2020-05-23
         */
        date?: string;
        limit: number;
        skip: number;
    }): Observable<UpdateIpsHistoryResponseDto> {
        return this.portfolioManagementControllerUpdateIpsHistory$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateIpsHistoryResponseDto>) => r.body as UpdateIpsHistoryResponseDto)
        );
    }
}
