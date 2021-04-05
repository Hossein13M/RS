/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateIssuerDto } from '../models/create-issuer-dto';
import { IssuerDto } from '../models/issuer-dto';
import { IssuerResponseDto } from '../models/issuer-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class IssuerService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation issuerControllerGetIssuer
     */
    static readonly IssuerControllerGetIssuerPath = '/api/v1/issuer/{issuerId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerControllerGetIssuer()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerControllerGetIssuer$Response(params: { issuerId: number }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerService.IssuerControllerGetIssuerPath, 'get');
        if (params) {
            rb.path('issuerId', params.issuerId, {});
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
                    return r as StrictHttpResponse<IssuerDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `issuerControllerGetIssuer$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerControllerGetIssuer(params: { issuerId: number }): Observable<IssuerDto> {
        return this.issuerControllerGetIssuer$Response(params).pipe(map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto));
    }

    /**
     * Path part for operation issuerControllerDeleteIssuer
     */
    static readonly IssuerControllerDeleteIssuerPath = '/api/v1/issuer/{issuerId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerControllerDeleteIssuer()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerControllerDeleteIssuer$Response(params: { issuerId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerService.IssuerControllerDeleteIssuerPath, 'delete');
        if (params) {
            rb.path('issuerId', params.issuerId, {});
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
     * To access the full response (for headers, for example), `issuerControllerDeleteIssuer$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerControllerDeleteIssuer(params: { issuerId: number }): Observable<void> {
        return this.issuerControllerDeleteIssuer$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation issuerControllerGetIssuers
     */
    static readonly IssuerControllerGetIssuersPath = '/api/v1/issuer';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerControllerGetIssuers()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerControllerGetIssuers$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<IssuerResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerService.IssuerControllerGetIssuersPath, 'get');
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
                    return r as StrictHttpResponse<IssuerResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `issuerControllerGetIssuers$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerControllerGetIssuers(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<IssuerResponseDto> {
        return this.issuerControllerGetIssuers$Response(params).pipe(map((r: StrictHttpResponse<IssuerResponseDto>) => r.body as IssuerResponseDto));
    }

    /**
     * Path part for operation issuerControllerUpdateIssuer
     */
    static readonly IssuerControllerUpdateIssuerPath = '/api/v1/issuer';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerControllerUpdateIssuer()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerControllerUpdateIssuer$Response(params: { body: IssuerDto }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerService.IssuerControllerUpdateIssuerPath, 'put');
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
                    return r as StrictHttpResponse<IssuerDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `issuerControllerUpdateIssuer$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerControllerUpdateIssuer(params: { body: IssuerDto }): Observable<IssuerDto> {
        return this.issuerControllerUpdateIssuer$Response(params).pipe(map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto));
    }

    /**
     * Path part for operation issuerControllerCreateIssuer
     */
    static readonly IssuerControllerCreateIssuerPath = '/api/v1/issuer';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerControllerCreateIssuer()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerControllerCreateIssuer$Response(params: { body: CreateIssuerDto }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerService.IssuerControllerCreateIssuerPath, 'post');
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
                    return r as StrictHttpResponse<IssuerDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `issuerControllerCreateIssuer$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerControllerCreateIssuer(params: { body: CreateIssuerDto }): Observable<IssuerDto> {
        return this.issuerControllerCreateIssuer$Response(params).pipe(map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto));
    }
}
