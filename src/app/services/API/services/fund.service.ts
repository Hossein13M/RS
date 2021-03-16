/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFundDto } from '../models/create-fund-dto';
import { FundListResponseDto } from '../models/fund-list-response-dto';
import { GetObjectNameResponseDto } from '../models/get-object-name-response-dto';
import { ResponseFundDto } from '../models/response-fund-dto';
import { UpdateFundDto } from '../models/update-fund-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FundService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation fundControllerGetObjectName
     */
    static readonly FundControllerGetObjectNamePath = '/api/v1/fund/image-name';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundControllerGetObjectName()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundControllerGetObjectName$Response(params: { fileName: string }): Observable<StrictHttpResponse<GetObjectNameResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundService.FundControllerGetObjectNamePath, 'get');
        if (params) {
            rb.query('fileName', params.fileName, {});
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
                    return r as StrictHttpResponse<GetObjectNameResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundControllerGetObjectName$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundControllerGetObjectName(params: { fileName: string }): Observable<GetObjectNameResponseDto> {
        return this.fundControllerGetObjectName$Response(params).pipe(
            map((r: StrictHttpResponse<GetObjectNameResponseDto>) => r.body as GetObjectNameResponseDto)
        );
    }

    /**
     * Path part for operation fundControllerGetFund
     */
    static readonly FundControllerGetFundPath = '/api/v1/fund/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundControllerGetFund()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundControllerGetFund$Response(params: { id: number }): Observable<StrictHttpResponse<ResponseFundDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundService.FundControllerGetFundPath, 'get');
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
                    return r as StrictHttpResponse<ResponseFundDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundControllerGetFund$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundControllerGetFund(params: { id: number }): Observable<ResponseFundDto> {
        return this.fundControllerGetFund$Response(params).pipe(map((r: StrictHttpResponse<ResponseFundDto>) => r.body as ResponseFundDto));
    }

    /**
     * Path part for operation fundControllerGetFunds
     */
    static readonly FundControllerGetFundsPath = '/api/v1/fund';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundControllerGetFunds()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundControllerGetFunds$Response(params?: {
        limit?: number;
        skip?: number;
        details?: boolean;
        etf?: boolean;
        fundType?: number;
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<FundListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundService.FundControllerGetFundsPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('details', params.details, {});
            rb.query('etf', params.etf, {});
            rb.query('fundType', params.fundType, {});
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
                    return r as StrictHttpResponse<FundListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundControllerGetFunds$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundControllerGetFunds(params?: {
        limit?: number;
        skip?: number;
        details?: boolean;
        etf?: boolean;
        fundType?: number;
        searchKeyword?: any;
    }): Observable<FundListResponseDto> {
        return this.fundControllerGetFunds$Response(params).pipe(
            map((r: StrictHttpResponse<FundListResponseDto>) => r.body as FundListResponseDto)
        );
    }

    /**
     * Path part for operation fundControllerUpdateFund
     */
    static readonly FundControllerUpdateFundPath = '/api/v1/fund';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundControllerUpdateFund()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundControllerUpdateFund$Response(params: { body: UpdateFundDto }): Observable<StrictHttpResponse<ResponseFundDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundService.FundControllerUpdateFundPath, 'put');
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
                    return r as StrictHttpResponse<ResponseFundDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundControllerUpdateFund$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundControllerUpdateFund(params: { body: UpdateFundDto }): Observable<ResponseFundDto> {
        return this.fundControllerUpdateFund$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseFundDto>) => r.body as ResponseFundDto)
        );
    }

    /**
     * Path part for operation fundControllerCreateFund
     */
    static readonly FundControllerCreateFundPath = '/api/v1/fund';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundControllerCreateFund()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundControllerCreateFund$Response(params: { body: CreateFundDto }): Observable<StrictHttpResponse<ResponseFundDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundService.FundControllerCreateFundPath, 'post');
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
                    return r as StrictHttpResponse<ResponseFundDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundControllerCreateFund$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundControllerCreateFund(params: { body: CreateFundDto }): Observable<ResponseFundDto> {
        return this.fundControllerCreateFund$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseFundDto>) => r.body as ResponseFundDto)
        );
    }
}
