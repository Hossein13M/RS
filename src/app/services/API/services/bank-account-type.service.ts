/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BankAccountTypeDto } from '../models/bank-account-type-dto';
import { CreateBankAccountTypeDto } from '../models/create-bank-account-type-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class BankAccountTypeService extends BaseService {
    /**
     * Path part for operation bankAccountTypeControllerGetBankAccountType
     */
    static readonly BankAccountTypeControllerGetBankAccountTypePath = '/api/v1/bank-account-type/{bankAccountTypeId}';
    /**
     * Path part for operation bankAccountTypeControllerDeleteBankAccountType
     */
    static readonly BankAccountTypeControllerDeleteBankAccountTypePath = '/api/v1/bank-account-type/{bankAccountTypeId}';
    /**
     * Path part for operation bankAccountTypeControllerGetBankAccountTypes
     */
    static readonly BankAccountTypeControllerGetBankAccountTypesPath = '/api/v1/bank-account-type';
    /**
     * Path part for operation bankAccountTypeControllerUpdateBankAccountType
     */
    static readonly BankAccountTypeControllerUpdateBankAccountTypePath = '/api/v1/bank-account-type';
    /**
     * Path part for operation bankAccountTypeControllerCreateBankAccountType
     */
    static readonly BankAccountTypeControllerCreateBankAccountTypePath = '/api/v1/bank-account-type';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankAccountTypeControllerGetBankAccountType()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankAccountTypeControllerGetBankAccountType$Response(params: { bankAccountTypeId: number }): Observable<StrictHttpResponse<BankAccountTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankAccountTypeService.BankAccountTypeControllerGetBankAccountTypePath, 'get');
        if (params) {
            rb.path('bankAccountTypeId', params.bankAccountTypeId, {});
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
                    return r as StrictHttpResponse<BankAccountTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankAccountTypeControllerGetBankAccountType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankAccountTypeControllerGetBankAccountType(params: { bankAccountTypeId: number }): Observable<BankAccountTypeDto> {
        return this.bankAccountTypeControllerGetBankAccountType$Response(params).pipe(
            map((r: StrictHttpResponse<BankAccountTypeDto>) => r.body as BankAccountTypeDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankAccountTypeControllerDeleteBankAccountType()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankAccountTypeControllerDeleteBankAccountType$Response(params: { bankAccountTypeId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BankAccountTypeService.BankAccountTypeControllerDeleteBankAccountTypePath, 'delete');
        if (params) {
            rb.path('bankAccountTypeId', params.bankAccountTypeId, {});
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
     * To access the full response (for headers, for example), `bankAccountTypeControllerDeleteBankAccountType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankAccountTypeControllerDeleteBankAccountType(params: { bankAccountTypeId: number }): Observable<void> {
        return this.bankAccountTypeControllerDeleteBankAccountType$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankAccountTypeControllerGetBankAccountTypes()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankAccountTypeControllerGetBankAccountTypes$Response(params?: {
        /**
         * searchKeyword is matched name
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<Array<BankAccountTypeDto>>> {
        const rb = new RequestBuilder(this.rootUrl, BankAccountTypeService.BankAccountTypeControllerGetBankAccountTypesPath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<Array<BankAccountTypeDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankAccountTypeControllerGetBankAccountTypes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bankAccountTypeControllerGetBankAccountTypes(params?: {
        /**
         * searchKeyword is matched name
         */
        searchKeyword?: any;
    }): Observable<Array<BankAccountTypeDto>> {
        return this.bankAccountTypeControllerGetBankAccountTypes$Response(params).pipe(
            map((r: StrictHttpResponse<Array<BankAccountTypeDto>>) => r.body as Array<BankAccountTypeDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankAccountTypeControllerUpdateBankAccountType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankAccountTypeControllerUpdateBankAccountType$Response(params: { body: BankAccountTypeDto }): Observable<StrictHttpResponse<BankAccountTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankAccountTypeService.BankAccountTypeControllerUpdateBankAccountTypePath, 'put');
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
                    return r as StrictHttpResponse<BankAccountTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankAccountTypeControllerUpdateBankAccountType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankAccountTypeControllerUpdateBankAccountType(params: { body: BankAccountTypeDto }): Observable<BankAccountTypeDto> {
        return this.bankAccountTypeControllerUpdateBankAccountType$Response(params).pipe(
            map((r: StrictHttpResponse<BankAccountTypeDto>) => r.body as BankAccountTypeDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bankAccountTypeControllerCreateBankAccountType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankAccountTypeControllerCreateBankAccountType$Response(params: { body: CreateBankAccountTypeDto }): Observable<StrictHttpResponse<BankAccountTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, BankAccountTypeService.BankAccountTypeControllerCreateBankAccountTypePath, 'post');
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
                    return r as StrictHttpResponse<BankAccountTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bankAccountTypeControllerCreateBankAccountType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bankAccountTypeControllerCreateBankAccountType(params: { body: CreateBankAccountTypeDto }): Observable<BankAccountTypeDto> {
        return this.bankAccountTypeControllerCreateBankAccountType$Response(params).pipe(
            map((r: StrictHttpResponse<BankAccountTypeDto>) => r.body as BankAccountTypeDto)
        );
    }
}
