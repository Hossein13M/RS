/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFundNavUserTransactionDto } from '../models/create-fund-nav-user-transaction-dto';
import { GetEstimatedPriceResponseDto } from '../models/get-estimated-price-response-dto';
import { GetFundBankAccountsResponseDto } from '../models/get-fund-bank-accounts-response-dto';
import { GetFundNavUserTransactionTypesDto } from '../models/get-fund-nav-user-transaction-types-dto';
import { GetFundTickersResponseDto } from '../models/get-fund-tickers-response-dto';
import { GetSellNonBourseInstrumentsResponseDto } from '../models/get-sell-non-bourse-instruments-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FundNavUserTransactionService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation fundNavUserTransactionControllerCreateFundNavTransaction
     */
    static readonly FundNavUserTransactionControllerCreateFundNavTransactionPath = '/api/v1/fund-nav-user-transaction';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavUserTransactionControllerCreateFundNavTransaction()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundNavUserTransactionControllerCreateFundNavTransaction$Response(params: {
        body: CreateFundNavUserTransactionDto;
    }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            FundNavUserTransactionService.FundNavUserTransactionControllerCreateFundNavTransactionPath,
            'post'
        );
        if (params) {
            rb.body(params.body, 'application/json');
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
     * To access the full response (for headers, for example), `fundNavUserTransactionControllerCreateFundNavTransaction$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundNavUserTransactionControllerCreateFundNavTransaction(params: { body: CreateFundNavUserTransactionDto }): Observable<void> {
        return this.fundNavUserTransactionControllerCreateFundNavTransaction$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation fundNavUserTransactionControllerGetFundNavUserTransactionTypes
     */
    static readonly FundNavUserTransactionControllerGetFundNavUserTransactionTypesPath = '/api/v1/fund-nav-user-transaction/types';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavUserTransactionControllerGetFundNavUserTransactionTypes()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetFundNavUserTransactionTypes$Response(params?: {}): Observable<
        StrictHttpResponse<Array<GetFundNavUserTransactionTypesDto>>
    > {
        const rb = new RequestBuilder(
            this.rootUrl,
            FundNavUserTransactionService.FundNavUserTransactionControllerGetFundNavUserTransactionTypesPath,
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
                    return r as StrictHttpResponse<Array<GetFundNavUserTransactionTypesDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundNavUserTransactionControllerGetFundNavUserTransactionTypes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetFundNavUserTransactionTypes(params?: {}): Observable<Array<GetFundNavUserTransactionTypesDto>> {
        return this.fundNavUserTransactionControllerGetFundNavUserTransactionTypes$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFundNavUserTransactionTypesDto>>) => r.body as Array<GetFundNavUserTransactionTypesDto>)
        );
    }

    /**
     * Path part for operation fundNavUserTransactionControllerGetFundTickers
     */
    static readonly FundNavUserTransactionControllerGetFundTickersPath = '/api/v1/fund-nav-user-transaction/tickers';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavUserTransactionControllerGetFundTickers()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetFundTickers$Response(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;

        /**
         * 1 &#x3D;&gt; Buy , 2 &#x3D;&gt; Sell
         */
        transactionType: '1' | '2';
        searchKey?: string;
        ticker?: string;
    }): Observable<StrictHttpResponse<Array<GetFundTickersResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FundNavUserTransactionService.FundNavUserTransactionControllerGetFundTickersPath, 'get');
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
            rb.query('date', params.date, {});
            rb.query('transactionType', params.transactionType, {});
            rb.query('searchKey', params.searchKey, {});
            rb.query('ticker', params.ticker, {});
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
                    return r as StrictHttpResponse<Array<GetFundTickersResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundNavUserTransactionControllerGetFundTickers$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetFundTickers(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;

        /**
         * 1 &#x3D;&gt; Buy , 2 &#x3D;&gt; Sell
         */
        transactionType: '1' | '2';
        searchKey?: string;
        ticker?: string;
    }): Observable<Array<GetFundTickersResponseDto>> {
        return this.fundNavUserTransactionControllerGetFundTickers$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFundTickersResponseDto>>) => r.body as Array<GetFundTickersResponseDto>)
        );
    }

    /**
     * Path part for operation fundNavUserTransactionControllerGetFundBankAccounts
     */
    static readonly FundNavUserTransactionControllerGetFundBankAccountsPath = '/api/v1/fund-nav-user-transaction/bank-accounts';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavUserTransactionControllerGetFundBankAccounts()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetFundBankAccounts$Response(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;

        /**
         * search keyword on bank name or account type name or account number
         */
        searchKey?: string;
        accountNumber?: string;
    }): Observable<StrictHttpResponse<Array<GetFundBankAccountsResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FundNavUserTransactionService.FundNavUserTransactionControllerGetFundBankAccountsPath, 'get');
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
            rb.query('date', params.date, {});
            rb.query('searchKey', params.searchKey, {});
            rb.query('accountNumber', params.accountNumber, {});
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
                    return r as StrictHttpResponse<Array<GetFundBankAccountsResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundNavUserTransactionControllerGetFundBankAccounts$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetFundBankAccounts(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;

        /**
         * search keyword on bank name or account type name or account number
         */
        searchKey?: string;
        accountNumber?: string;
    }): Observable<Array<GetFundBankAccountsResponseDto>> {
        return this.fundNavUserTransactionControllerGetFundBankAccounts$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFundBankAccountsResponseDto>>) => r.body as Array<GetFundBankAccountsResponseDto>)
        );
    }

    /**
     * Path part for operation fundNavUserTransactionControllerGetNonBourseInstruments
     */
    static readonly FundNavUserTransactionControllerGetNonBourseInstrumentsPath = '/api/v1/fund-nav-user-transaction/non-bourse-instruments';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavUserTransactionControllerGetNonBourseInstruments()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetNonBourseInstruments$Response(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;

        /**
         * 3 &#x3D;&gt; Buy , 4 &#x3D;&gt; Sell
         */
        transactionType: '3' | '4';
        searchKey?: string;
    }): Observable<StrictHttpResponse<Array<GetSellNonBourseInstrumentsResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FundNavUserTransactionService.FundNavUserTransactionControllerGetNonBourseInstrumentsPath, 'get');
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
            rb.query('date', params.date, {});
            rb.query('transactionType', params.transactionType, {});
            rb.query('searchKey', params.searchKey, {});
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
                    return r as StrictHttpResponse<Array<GetSellNonBourseInstrumentsResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundNavUserTransactionControllerGetNonBourseInstruments$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetNonBourseInstruments(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;

        /**
         * 3 &#x3D;&gt; Buy , 4 &#x3D;&gt; Sell
         */
        transactionType: '3' | '4';
        searchKey?: string;
    }): Observable<Array<GetSellNonBourseInstrumentsResponseDto>> {
        return this.fundNavUserTransactionControllerGetNonBourseInstruments$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetSellNonBourseInstrumentsResponseDto>>) => r.body as Array<GetSellNonBourseInstrumentsResponseDto>)
        );
    }

    /**
     * Path part for operation fundNavUserTransactionControllerGetEstimatedPriceInstruments
     */
    static readonly FundNavUserTransactionControllerGetEstimatedPriceInstrumentsPath =
        '/api/v1/fund-nav-user-transaction/estimated-price-instruments';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundNavUserTransactionControllerGetEstimatedPriceInstruments()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetEstimatedPriceInstruments$Response(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;
        searchKey?: string;
        ISIN?: string;
    }): Observable<StrictHttpResponse<Array<GetEstimatedPriceResponseDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            FundNavUserTransactionService.FundNavUserTransactionControllerGetEstimatedPriceInstrumentsPath,
            'get'
        );
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
            rb.query('date', params.date, {});
            rb.query('searchKey', params.searchKey, {});
            rb.query('ISIN', params.ISIN, {});
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
                    return r as StrictHttpResponse<Array<GetEstimatedPriceResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundNavUserTransactionControllerGetEstimatedPriceInstruments$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundNavUserTransactionControllerGetEstimatedPriceInstruments(params: {
        fundNationalCode: string;

        /**
         * Default value is Date of now. Example: 2020-05-23
         */
        date?: Date;
        searchKey?: string;
        ISIN?: string;
    }): Observable<Array<GetEstimatedPriceResponseDto>> {
        return this.fundNavUserTransactionControllerGetEstimatedPriceInstruments$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetEstimatedPriceResponseDto>>) => r.body as Array<GetEstimatedPriceResponseDto>)
        );
    }
}
