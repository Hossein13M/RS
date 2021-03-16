/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BankDto } from '../models/bank-dto';
import { BankResponseDto } from '../models/bank-response-dto';
import { CreateBankDto } from '../models/create-bank-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class BankService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation bankControllerGetBank
     */
    static readonly BankControllerGetBankPath = '/api/v1/bank/{bankId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankControllerGetBank()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankControllerGetBank$Response(params: { bankId: number }): Observable<StrictHttpResponse<BankDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankService.BankControllerGetBankPath, 'get');
        if (params) {
            rb.path('bankId', params.bankId, {});
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
                    return r as StrictHttpResponse<BankDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankControllerGetBank$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankControllerGetBank(params: { bankId: number }): Observable<BankDto> {
        return this.bankControllerGetBank$Response(params).pipe(map((r: StrictHttpResponse<BankDto>) => r.body as BankDto));
    }

    /**
     * Path part for operation bankControllerDeleteBank
     */
    static readonly BankControllerDeleteBankPath = '/api/v1/bank/{bankId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankControllerDeleteBank()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankControllerDeleteBank$Response(params: { bankId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BankService.BankControllerDeleteBankPath, 'delete');
        if (params) {
            rb.path('bankId', params.bankId, {});
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
     * To access the full response (for headers, for example), `bankControllerDeleteBank$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankControllerDeleteBank(params: { bankId: number }): Observable<void> {
        return this.bankControllerDeleteBank$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation bankControllerGetBanks
     */
    static readonly BankControllerGetBanksPath = '/api/v1/bank';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankControllerGetBanks()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankControllerGetBanks$Response(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<BankResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankService.BankControllerGetBanksPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('searchKeyword', params.searchKeyword, {});
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
                    return r as StrictHttpResponse<BankResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankControllerGetBanks$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankControllerGetBanks(params?: { limit?: number; skip?: number; searchKeyword?: any }): Observable<BankResponseDto> {
        return this.bankControllerGetBanks$Response(params).pipe(
            map((r: StrictHttpResponse<BankResponseDto>) => r.body as BankResponseDto)
        );
    }

    /**
     * Path part for operation bankControllerUpdateBank
     */
    static readonly BankControllerUpdateBankPath = '/api/v1/bank';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankControllerUpdateBank()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankControllerUpdateBank$Response(params: { body: BankDto }): Observable<StrictHttpResponse<BankDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankService.BankControllerUpdateBankPath, 'put');
        if (params) {
            rb.body(params.body, 'application/json');
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
                    return r as StrictHttpResponse<BankDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankControllerUpdateBank$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankControllerUpdateBank(params: { body: BankDto }): Observable<BankDto> {
        return this.bankControllerUpdateBank$Response(params).pipe(map((r: StrictHttpResponse<BankDto>) => r.body as BankDto));
    }

    /**
     * Path part for operation bankControllerCreateBank
     */
    static readonly BankControllerCreateBankPath = '/api/v1/bank';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankControllerCreateBank()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankControllerCreateBank$Response(params: { body: CreateBankDto }): Observable<StrictHttpResponse<BankDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankService.BankControllerCreateBankPath, 'post');
        if (params) {
            rb.body(params.body, 'application/json');
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
                    return r as StrictHttpResponse<BankDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankControllerCreateBank$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankControllerCreateBank(params: { body: CreateBankDto }): Observable<BankDto> {
        return this.bankControllerCreateBank$Response(params).pipe(map((r: StrictHttpResponse<BankDto>) => r.body as BankDto));
    }
}
