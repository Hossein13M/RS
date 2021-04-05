/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BourseIssueDateDto } from '../models/bourse-issue-date-dto';
import { BourseIssueDateResponseDto } from '../models/bourse-issue-date-response-dto';
import { CreateBourseIssueDateDto } from '../models/create-bourse-issue-date-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class BourseIssueDateService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation bourseIssueDateControllerGetBourseIssueDate
     */
    static readonly BourseIssueDateControllerGetBourseIssueDatePath = '/api/v1/bourse-issue-date/{bourseIssueDateId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseIssueDateControllerGetBourseIssueDate()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseIssueDateControllerGetBourseIssueDate$Response(params: { bourseIssueDateId: number }): Observable<StrictHttpResponse<BourseIssueDateDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseIssueDateService.BourseIssueDateControllerGetBourseIssueDatePath, 'get');
        if (params) {
            rb.path('bourseIssueDateId', params.bourseIssueDateId, {});
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
                    return r as StrictHttpResponse<BourseIssueDateDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseIssueDateControllerGetBourseIssueDate$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseIssueDateControllerGetBourseIssueDate(params: { bourseIssueDateId: number }): Observable<BourseIssueDateDto> {
        return this.bourseIssueDateControllerGetBourseIssueDate$Response(params).pipe(
            map((r: StrictHttpResponse<BourseIssueDateDto>) => r.body as BourseIssueDateDto)
        );
    }

    /**
     * Path part for operation bourseIssueDateControllerDeleteBourseIssueDate
     */
    static readonly BourseIssueDateControllerDeleteBourseIssueDatePath = '/api/v1/bourse-issue-date/{bourseIssueDateId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseIssueDateControllerDeleteBourseIssueDate()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseIssueDateControllerDeleteBourseIssueDate$Response(params: { bourseIssueDateId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BourseIssueDateService.BourseIssueDateControllerDeleteBourseIssueDatePath, 'delete');
        if (params) {
            rb.path('bourseIssueDateId', params.bourseIssueDateId, {});
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
     * To access the full response (for headers, for example), `bourseIssueDateControllerDeleteBourseIssueDate$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseIssueDateControllerDeleteBourseIssueDate(params: { bourseIssueDateId: number }): Observable<void> {
        return this.bourseIssueDateControllerDeleteBourseIssueDate$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation bourseIssueDateControllerGetBourseIssueDates
     */
    static readonly BourseIssueDateControllerGetBourseIssueDatesPath = '/api/v1/bourse-issue-date';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseIssueDateControllerGetBourseIssueDates()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseIssueDateControllerGetBourseIssueDates$Response(params?: {
        limit?: number;
        skip?: number;
        bourseId?: any;
    }): Observable<StrictHttpResponse<BourseIssueDateResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseIssueDateService.BourseIssueDateControllerGetBourseIssueDatesPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('bourseId', params.bourseId, {});
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
                    return r as StrictHttpResponse<BourseIssueDateResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseIssueDateControllerGetBourseIssueDates$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseIssueDateControllerGetBourseIssueDates(params?: { limit?: number; skip?: number; bourseId?: any }): Observable<BourseIssueDateResponseDto> {
        return this.bourseIssueDateControllerGetBourseIssueDates$Response(params).pipe(
            map((r: StrictHttpResponse<BourseIssueDateResponseDto>) => r.body as BourseIssueDateResponseDto)
        );
    }

    /**
     * Path part for operation bourseIssueDateControllerUpdateBourseIssueDate
     */
    static readonly BourseIssueDateControllerUpdateBourseIssueDatePath = '/api/v1/bourse-issue-date';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseIssueDateControllerUpdateBourseIssueDate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseIssueDateControllerUpdateBourseIssueDate$Response(params: {
        body: BourseIssueDateDto;
    }): Observable<StrictHttpResponse<BourseIssueDateDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseIssueDateService.BourseIssueDateControllerUpdateBourseIssueDatePath, 'put');
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
                    return r as StrictHttpResponse<BourseIssueDateDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseIssueDateControllerUpdateBourseIssueDate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseIssueDateControllerUpdateBourseIssueDate(params: { body: BourseIssueDateDto }): Observable<BourseIssueDateDto> {
        return this.bourseIssueDateControllerUpdateBourseIssueDate$Response(params).pipe(
            map((r: StrictHttpResponse<BourseIssueDateDto>) => r.body as BourseIssueDateDto)
        );
    }

    /**
     * Path part for operation bourseIssueDateControllerCreateBourseIssueDate
     */
    static readonly BourseIssueDateControllerCreateBourseIssueDatePath = '/api/v1/bourse-issue-date';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseIssueDateControllerCreateBourseIssueDate()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseIssueDateControllerCreateBourseIssueDate$Response(params: {
        body: CreateBourseIssueDateDto;
    }): Observable<StrictHttpResponse<BourseIssueDateDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseIssueDateService.BourseIssueDateControllerCreateBourseIssueDatePath, 'post');
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
                    return r as StrictHttpResponse<BourseIssueDateDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseIssueDateControllerCreateBourseIssueDate$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseIssueDateControllerCreateBourseIssueDate(params: { body: CreateBourseIssueDateDto }): Observable<BourseIssueDateDto> {
        return this.bourseIssueDateControllerCreateBourseIssueDate$Response(params).pipe(
            map((r: StrictHttpResponse<BourseIssueDateDto>) => r.body as BourseIssueDateDto)
        );
    }
}
