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
export class IssueLicenseService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation issueLicenseControllerGetIssueLicense
     */
    static readonly IssueLicenseControllerGetIssueLicensePath = '/api/v1/issue-license/{issueLicenseId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issueLicenseControllerGetIssueLicense()` instead.
     *
     * This method doesn't expect any request body.
     */
    issueLicenseControllerGetIssueLicense$Response(params: { issueLicenseId: number }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssueLicenseService.IssueLicenseControllerGetIssueLicensePath, 'get');
        if (params) {
            rb.path('issueLicenseId', params.issueLicenseId, {});
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
     * To access the full response (for headers, for example), `issueLicenseControllerGetIssueLicense$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issueLicenseControllerGetIssueLicense(params: { issueLicenseId: number }): Observable<IssuerDto> {
        return this.issueLicenseControllerGetIssueLicense$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto)
        );
    }

    /**
     * Path part for operation issueLicenseControllerDeleteIssueLicense
     */
    static readonly IssueLicenseControllerDeleteIssueLicensePath = '/api/v1/issue-license/{issueLicenseId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issueLicenseControllerDeleteIssueLicense()` instead.
     *
     * This method doesn't expect any request body.
     */
    issueLicenseControllerDeleteIssueLicense$Response(params: { issueLicenseId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, IssueLicenseService.IssueLicenseControllerDeleteIssueLicensePath, 'delete');
        if (params) {
            rb.path('issueLicenseId', params.issueLicenseId, {});
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
     * To access the full response (for headers, for example), `issueLicenseControllerDeleteIssueLicense$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issueLicenseControllerDeleteIssueLicense(params: { issueLicenseId: number }): Observable<void> {
        return this.issueLicenseControllerDeleteIssueLicense$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation issueLicenseControllerGetIssueLicenses
     */
    static readonly IssueLicenseControllerGetIssueLicensesPath = '/api/v1/issue-license';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issueLicenseControllerGetIssueLicenses()` instead.
     *
     * This method doesn't expect any request body.
     */
    issueLicenseControllerGetIssueLicenses$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<IssuerResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssueLicenseService.IssueLicenseControllerGetIssueLicensesPath, 'get');
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
     * To access the full response (for headers, for example), `issueLicenseControllerGetIssueLicenses$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issueLicenseControllerGetIssueLicenses(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<IssuerResponseDto> {
        return this.issueLicenseControllerGetIssueLicenses$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerResponseDto>) => r.body as IssuerResponseDto)
        );
    }

    /**
     * Path part for operation issueLicenseControllerUpdateIssueLicense
     */
    static readonly IssueLicenseControllerUpdateIssueLicensePath = '/api/v1/issue-license';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issueLicenseControllerUpdateIssueLicense()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issueLicenseControllerUpdateIssueLicense$Response(params: { body: IssuerDto }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssueLicenseService.IssueLicenseControllerUpdateIssueLicensePath, 'put');
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
     * To access the full response (for headers, for example), `issueLicenseControllerUpdateIssueLicense$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issueLicenseControllerUpdateIssueLicense(params: { body: IssuerDto }): Observable<IssuerDto> {
        return this.issueLicenseControllerUpdateIssueLicense$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto)
        );
    }

    /**
     * Path part for operation issueLicenseControllerCreateIssueLicense
     */
    static readonly IssueLicenseControllerCreateIssueLicensePath = '/api/v1/issue-license';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issueLicenseControllerCreateIssueLicense()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issueLicenseControllerCreateIssueLicense$Response(params: { body: CreateIssuerDto }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssueLicenseService.IssueLicenseControllerCreateIssueLicensePath, 'post');
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
     * To access the full response (for headers, for example), `issueLicenseControllerCreateIssueLicense$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issueLicenseControllerCreateIssueLicense(params: { body: CreateIssuerDto }): Observable<IssuerDto> {
        return this.issueLicenseControllerCreateIssueLicense$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto)
        );
    }
}
