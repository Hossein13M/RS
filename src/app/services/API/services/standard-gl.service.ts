/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateStandardGlDto } from '../models/create-standard-gl-dto';
import { StandardGlResponseDto } from '../models/standard-gl-response-dto';
import { StandardGlWithChildDto } from '../models/standard-gl-with-child-dto';
import { StandardGlWithIdDto } from '../models/standard-gl-with-id-dto';
import { StandardGlWithParentDto } from '../models/standard-gl-with-parent-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class StandardGlService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation standardGlControllerGetStandardGlTree
     */
    static readonly StandardGlControllerGetStandardGlTreePath = '/api/v1/standard-gl/tree';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `standardGlControllerGetStandardGlTree()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerGetStandardGlTree$Response(params?: {}): Observable<StrictHttpResponse<Array<StandardGlWithChildDto>>> {
        const rb = new RequestBuilder(this.rootUrl, StandardGlService.StandardGlControllerGetStandardGlTreePath, 'get');
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
                    return r as StrictHttpResponse<Array<StandardGlWithChildDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `standardGlControllerGetStandardGlTree$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerGetStandardGlTree(params?: {}): Observable<Array<StandardGlWithChildDto>> {
        return this.standardGlControllerGetStandardGlTree$Response(params).pipe(
            map((r: StrictHttpResponse<Array<StandardGlWithChildDto>>) => r.body as Array<StandardGlWithChildDto>)
        );
    }

    /**
     * Path part for operation standardGlControllerGetStandardGl
     */
    static readonly StandardGlControllerGetStandardGlPath = '/api/v1/standard-gl/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `standardGlControllerGetStandardGl()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerGetStandardGl$Response(params: { id: number }): Observable<StrictHttpResponse<StandardGlWithChildDto>> {
        const rb = new RequestBuilder(this.rootUrl, StandardGlService.StandardGlControllerGetStandardGlPath, 'get');
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
                    return r as StrictHttpResponse<StandardGlWithChildDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `standardGlControllerGetStandardGl$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerGetStandardGl(params: { id: number }): Observable<StandardGlWithChildDto> {
        return this.standardGlControllerGetStandardGl$Response(params).pipe(
            map((r: StrictHttpResponse<StandardGlWithChildDto>) => r.body as StandardGlWithChildDto)
        );
    }

    /**
     * Path part for operation standardGlControllerDeleteStandardGl
     */
    static readonly StandardGlControllerDeleteStandardGlPath = '/api/v1/standard-gl/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `standardGlControllerDeleteStandardGl()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerDeleteStandardGl$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, StandardGlService.StandardGlControllerDeleteStandardGlPath, 'delete');
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
     * To access the full response (for headers, for example), `standardGlControllerDeleteStandardGl$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerDeleteStandardGl(params: { id: number }): Observable<void> {
        return this.standardGlControllerDeleteStandardGl$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation standardGlControllerGetStandardsGl
     */
    static readonly StandardGlControllerGetStandardsGlPath = '/api/v1/standard-gl';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `standardGlControllerGetStandardsGl()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerGetStandardsGl$Response(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<StandardGlResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, StandardGlService.StandardGlControllerGetStandardsGlPath, 'get');
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
                    return r as StrictHttpResponse<StandardGlResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `standardGlControllerGetStandardsGl$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    standardGlControllerGetStandardsGl(params?: { limit?: number; skip?: number; searchKeyword?: any }): Observable<StandardGlResponseDto> {
        return this.standardGlControllerGetStandardsGl$Response(params).pipe(
            map((r: StrictHttpResponse<StandardGlResponseDto>) => r.body as StandardGlResponseDto)
        );
    }

    /**
     * Path part for operation standardGlControllerUpdateStandardGl
     */
    static readonly StandardGlControllerUpdateStandardGlPath = '/api/v1/standard-gl';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `standardGlControllerUpdateStandardGl()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    standardGlControllerUpdateStandardGl$Response(params: { body: StandardGlWithIdDto }): Observable<StrictHttpResponse<StandardGlWithParentDto>> {
        const rb = new RequestBuilder(this.rootUrl, StandardGlService.StandardGlControllerUpdateStandardGlPath, 'put');
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
                    return r as StrictHttpResponse<StandardGlWithParentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `standardGlControllerUpdateStandardGl$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    standardGlControllerUpdateStandardGl(params: { body: StandardGlWithIdDto }): Observable<StandardGlWithParentDto> {
        return this.standardGlControllerUpdateStandardGl$Response(params).pipe(
            map((r: StrictHttpResponse<StandardGlWithParentDto>) => r.body as StandardGlWithParentDto)
        );
    }

    /**
     * Path part for operation standardGlControllerCreateStandardGl
     */
    static readonly StandardGlControllerCreateStandardGlPath = '/api/v1/standard-gl';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `standardGlControllerCreateStandardGl()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    standardGlControllerCreateStandardGl$Response(params: { body: CreateStandardGlDto }): Observable<StrictHttpResponse<StandardGlWithParentDto>> {
        const rb = new RequestBuilder(this.rootUrl, StandardGlService.StandardGlControllerCreateStandardGlPath, 'post');
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
                    return r as StrictHttpResponse<StandardGlWithParentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `standardGlControllerCreateStandardGl$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    standardGlControllerCreateStandardGl(params: { body: CreateStandardGlDto }): Observable<StandardGlWithParentDto> {
        return this.standardGlControllerCreateStandardGl$Response(params).pipe(
            map((r: StrictHttpResponse<StandardGlWithParentDto>) => r.body as StandardGlWithParentDto)
        );
    }
}
