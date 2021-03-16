/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFlowCategoryDto } from '../models/create-flow-category-dto';
import { GetFlowCategoryDto } from '../models/get-flow-category-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FlowCategoryService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowCategoryControllerGetFlowCategory
     */
    static readonly FlowCategoryControllerGetFlowCategoryPath = '/api/v1/flow-category';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowCategoryControllerGetFlowCategory()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowCategoryControllerGetFlowCategory$Response(params?: {
        name?: string;
        id?: string;
    }): Observable<StrictHttpResponse<Array<GetFlowCategoryDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowCategoryService.FlowCategoryControllerGetFlowCategoryPath, 'get');
        if (params) {
            rb.query('name', params.name, {});
            rb.query('id', params.id, {});
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
                    return r as StrictHttpResponse<Array<GetFlowCategoryDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowCategoryControllerGetFlowCategory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowCategoryControllerGetFlowCategory(params?: { name?: string; id?: string }): Observable<Array<GetFlowCategoryDto>> {
        return this.flowCategoryControllerGetFlowCategory$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFlowCategoryDto>>) => r.body as Array<GetFlowCategoryDto>)
        );
    }

    /**
     * Path part for operation flowCategoryControllerCreateFlowCategory
     */
    static readonly FlowCategoryControllerCreateFlowCategoryPath = '/api/v1/flow-category';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowCategoryControllerCreateFlowCategory()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowCategoryControllerCreateFlowCategory$Response(params: {
        body: CreateFlowCategoryDto;
    }): Observable<StrictHttpResponse<GetFlowCategoryDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowCategoryService.FlowCategoryControllerCreateFlowCategoryPath, 'post');
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
                    return r as StrictHttpResponse<GetFlowCategoryDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowCategoryControllerCreateFlowCategory$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowCategoryControllerCreateFlowCategory(params: { body: CreateFlowCategoryDto }): Observable<GetFlowCategoryDto> {
        return this.flowCategoryControllerCreateFlowCategory$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowCategoryDto>) => r.body as GetFlowCategoryDto)
        );
    }

    /**
     * Path part for operation flowCategoryControllerUpdateFlowCategory
     */
    static readonly FlowCategoryControllerUpdateFlowCategoryPath = '/api/v1/flow-category/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowCategoryControllerUpdateFlowCategory()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowCategoryControllerUpdateFlowCategory$Response(params: {
        id: string;
        body: CreateFlowCategoryDto;
    }): Observable<StrictHttpResponse<GetFlowCategoryDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowCategoryService.FlowCategoryControllerUpdateFlowCategoryPath, 'put');
        if (params) {
            rb.path('id', params.id, {});

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
                    return r as StrictHttpResponse<GetFlowCategoryDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowCategoryControllerUpdateFlowCategory$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowCategoryControllerUpdateFlowCategory(params: { id: string; body: CreateFlowCategoryDto }): Observable<GetFlowCategoryDto> {
        return this.flowCategoryControllerUpdateFlowCategory$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowCategoryDto>) => r.body as GetFlowCategoryDto)
        );
    }

    /**
     * Path part for operation flowCategoryControllerDeleteFlowCategory
     */
    static readonly FlowCategoryControllerDeleteFlowCategoryPath = '/api/v1/flow-category/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowCategoryControllerDeleteFlowCategory()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowCategoryControllerDeleteFlowCategory$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, FlowCategoryService.FlowCategoryControllerDeleteFlowCategoryPath, 'delete');
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
     * To access the full response (for headers, for example), `flowCategoryControllerDeleteFlowCategory$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowCategoryControllerDeleteFlowCategory(params: { id: string }): Observable<void> {
        return this.flowCategoryControllerDeleteFlowCategory$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
