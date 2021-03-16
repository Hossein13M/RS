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
export class IssuerGoalService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation issuerGoalControllerGetIssuerGoal
     */
    static readonly IssuerGoalControllerGetIssuerGoalPath = '/api/v1/issuer-goal/{issuerGoalId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerGoalControllerGetIssuerGoal()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerGoalControllerGetIssuerGoal$Response(params: { issuerGoalId: number }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerGoalService.IssuerGoalControllerGetIssuerGoalPath, 'get');
        if (params) {
            rb.path('issuerGoalId', params.issuerGoalId, {});
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
     * To access the full response (for headers, for example), `issuerGoalControllerGetIssuerGoal$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerGoalControllerGetIssuerGoal(params: { issuerGoalId: number }): Observable<IssuerDto> {
        return this.issuerGoalControllerGetIssuerGoal$Response(params).pipe(map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto));
    }

    /**
     * Path part for operation issuerGoalControllerDeleteIssuerGoal
     */
    static readonly IssuerGoalControllerDeleteIssuerGoalPath = '/api/v1/issuer-goal/{issuerGoalId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerGoalControllerDeleteIssuerGoal()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerGoalControllerDeleteIssuerGoal$Response(params: { issuerGoalId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerGoalService.IssuerGoalControllerDeleteIssuerGoalPath, 'delete');
        if (params) {
            rb.path('issuerGoalId', params.issuerGoalId, {});
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
     * To access the full response (for headers, for example), `issuerGoalControllerDeleteIssuerGoal$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerGoalControllerDeleteIssuerGoal(params: { issuerGoalId: number }): Observable<void> {
        return this.issuerGoalControllerDeleteIssuerGoal$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation issuerGoalControllerGetIssuersGoal
     */
    static readonly IssuerGoalControllerGetIssuersGoalPath = '/api/v1/issuer-goal';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerGoalControllerGetIssuersGoal()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerGoalControllerGetIssuersGoal$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<IssuerResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerGoalService.IssuerGoalControllerGetIssuersGoalPath, 'get');
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
     * To access the full response (for headers, for example), `issuerGoalControllerGetIssuersGoal$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    issuerGoalControllerGetIssuersGoal(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code
         */
        searchKeyword?: any;
    }): Observable<IssuerResponseDto> {
        return this.issuerGoalControllerGetIssuersGoal$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerResponseDto>) => r.body as IssuerResponseDto)
        );
    }

    /**
     * Path part for operation issuerGoalControllerUpdateIssuerGoal
     */
    static readonly IssuerGoalControllerUpdateIssuerGoalPath = '/api/v1/issuer-goal';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerGoalControllerUpdateIssuerGoal()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerGoalControllerUpdateIssuerGoal$Response(params: { body: IssuerDto }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerGoalService.IssuerGoalControllerUpdateIssuerGoalPath, 'put');
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
     * To access the full response (for headers, for example), `issuerGoalControllerUpdateIssuerGoal$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerGoalControllerUpdateIssuerGoal(params: { body: IssuerDto }): Observable<IssuerDto> {
        return this.issuerGoalControllerUpdateIssuerGoal$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto)
        );
    }

    /**
     * Path part for operation issuerGoalControllerCreateIssuerGoal
     */
    static readonly IssuerGoalControllerCreateIssuerGoalPath = '/api/v1/issuer-goal';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `issuerGoalControllerCreateIssuerGoal()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerGoalControllerCreateIssuerGoal$Response(params: { body: CreateIssuerDto }): Observable<StrictHttpResponse<IssuerDto>> {
        const rb = new RequestBuilder(this.rootUrl, IssuerGoalService.IssuerGoalControllerCreateIssuerGoalPath, 'post');
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
     * To access the full response (for headers, for example), `issuerGoalControllerCreateIssuerGoal$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    issuerGoalControllerCreateIssuerGoal(params: { body: CreateIssuerDto }): Observable<IssuerDto> {
        return this.issuerGoalControllerCreateIssuerGoal$Response(params).pipe(
            map((r: StrictHttpResponse<IssuerDto>) => r.body as IssuerDto)
        );
    }
}
