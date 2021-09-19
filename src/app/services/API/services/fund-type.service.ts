/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFundTypeDto } from '../models/create-fund-type-dto';
import { FundTypeDto } from '../models/fund-type-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FundTypeService extends BaseService {
    /**
     * Path part for operation fundTypeControllerGetFundType
     */
    static readonly FundTypeControllerGetFundTypePath = '/api/v1/fund-type/{id}';
    /**
     * Path part for operation fundTypeControllerDeleteFundType
     */
    static readonly FundTypeControllerDeleteFundTypePath = '/api/v1/fund-type/{id}';
    /**
     * Path part for operation fundTypeControllerGetFundTypes
     */
    static readonly FundTypeControllerGetFundTypesPath = '/api/v1/fund-type';
    /**
     * Path part for operation fundTypeControllerUpdateFundType
     */
    static readonly FundTypeControllerUpdateFundTypePath = '/api/v1/fund-type';
    /**
     * Path part for operation fundTypeControllerCreateFundType
     */
    static readonly FundTypeControllerCreateFundTypePath = '/api/v1/fund-type';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundTypeControllerGetFundType()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundTypeControllerGetFundType$Response(params: { id: number }): Observable<StrictHttpResponse<FundTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundTypeService.FundTypeControllerGetFundTypePath, 'get');
        if (params) {
            rb.path('id', params.id, {});
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
                    return r as StrictHttpResponse<FundTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundTypeControllerGetFundType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundTypeControllerGetFundType(params: { id: number }): Observable<FundTypeDto> {
        return this.fundTypeControllerGetFundType$Response(params).pipe(map((r: StrictHttpResponse<FundTypeDto>) => r.body as FundTypeDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundTypeControllerDeleteFundType()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundTypeControllerDeleteFundType$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, FundTypeService.FundTypeControllerDeleteFundTypePath, 'delete');
        if (params) {
            rb.path('id', params.id, {});
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
     * To access the full response (for headers, for example), `fundTypeControllerDeleteFundType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundTypeControllerDeleteFundType(params: { id: number }): Observable<void> {
        return this.fundTypeControllerDeleteFundType$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundTypeControllerGetFundTypes()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundTypeControllerGetFundTypes$Response(params?: { searchKeyword?: any }): Observable<StrictHttpResponse<Array<FundTypeDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FundTypeService.FundTypeControllerGetFundTypesPath, 'get');
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
                    return r as StrictHttpResponse<Array<FundTypeDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundTypeControllerGetFundTypes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundTypeControllerGetFundTypes(params?: { searchKeyword?: any }): Observable<Array<FundTypeDto>> {
        return this.fundTypeControllerGetFundTypes$Response(params).pipe(map((r: StrictHttpResponse<Array<FundTypeDto>>) => r.body as Array<FundTypeDto>));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundTypeControllerUpdateFundType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundTypeControllerUpdateFundType$Response(params: { body: FundTypeDto }): Observable<StrictHttpResponse<FundTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundTypeService.FundTypeControllerUpdateFundTypePath, 'put');
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
                    return r as StrictHttpResponse<FundTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundTypeControllerUpdateFundType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundTypeControllerUpdateFundType(params: { body: FundTypeDto }): Observable<FundTypeDto> {
        return this.fundTypeControllerUpdateFundType$Response(params).pipe(map((r: StrictHttpResponse<FundTypeDto>) => r.body as FundTypeDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundTypeControllerCreateFundType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundTypeControllerCreateFundType$Response(params: { body: CreateFundTypeDto }): Observable<StrictHttpResponse<FundTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundTypeService.FundTypeControllerCreateFundTypePath, 'post');
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
                    return r as StrictHttpResponse<FundTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundTypeControllerCreateFundType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundTypeControllerCreateFundType(params: { body: CreateFundTypeDto }): Observable<FundTypeDto> {
        return this.fundTypeControllerCreateFundType$Response(params).pipe(map((r: StrictHttpResponse<FundTypeDto>) => r.body as FundTypeDto));
    }
}
