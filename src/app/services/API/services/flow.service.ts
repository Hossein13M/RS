/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFlowDto } from '../models/create-flow-dto';
import { CreateFlowResponseDto } from '../models/create-flow-response-dto';
import { GetFlowResponseDto } from '../models/get-flow-response-dto';
import { UpdateFlowDto } from '../models/update-flow-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FlowService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowControllerGetFlow
     */
    static readonly FlowControllerGetFlowPath = '/api/v1/flow';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowControllerGetFlow()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowControllerGetFlow$Response(params?: {
        name?: string;
        id?: string;
        category?: string;
    }): Observable<StrictHttpResponse<Array<GetFlowResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowService.FlowControllerGetFlowPath, 'get');
        if (params) {
            rb.query('name', params.name, {});
            rb.query('id', params.id, {});
            rb.query('category', params.category, {});
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
                    return r as StrictHttpResponse<Array<GetFlowResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowControllerGetFlow$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowControllerGetFlow(params?: { name?: string; id?: string; category?: string }): Observable<Array<GetFlowResponseDto>> {
        return this.flowControllerGetFlow$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFlowResponseDto>>) => r.body as Array<GetFlowResponseDto>)
        );
    }

    /**
     * Path part for operation flowControllerCreateFlow
     */
    static readonly FlowControllerCreateFlowPath = '/api/v1/flow';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowControllerCreateFlow()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowControllerCreateFlow$Response(params: { body: CreateFlowDto }): Observable<StrictHttpResponse<CreateFlowResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowService.FlowControllerCreateFlowPath, 'post');
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
                    return r as StrictHttpResponse<CreateFlowResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowControllerCreateFlow$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowControllerCreateFlow(params: { body: CreateFlowDto }): Observable<CreateFlowResponseDto> {
        return this.flowControllerCreateFlow$Response(params).pipe(
            map((r: StrictHttpResponse<CreateFlowResponseDto>) => r.body as CreateFlowResponseDto)
        );
    }

    /**
     * Path part for operation flowControllerUpdateFlow
     */
    static readonly FlowControllerUpdateFlowPath = '/api/v1/flow/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowControllerUpdateFlow()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowControllerUpdateFlow$Response(params: { id: string; body: UpdateFlowDto }): Observable<StrictHttpResponse<GetFlowResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowService.FlowControllerUpdateFlowPath, 'put');
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
                    return r as StrictHttpResponse<GetFlowResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowControllerUpdateFlow$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowControllerUpdateFlow(params: { id: string; body: UpdateFlowDto }): Observable<GetFlowResponseDto> {
        return this.flowControllerUpdateFlow$Response(params).pipe(map((r: StrictHttpResponse<GetFlowResponseDto>) => r.body as GetFlowResponseDto));
    }

    /**
     * Path part for operation flowControllerDeleteFlow
     */
    static readonly FlowControllerDeleteFlowPath = '/api/v1/flow/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowControllerDeleteFlow()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowControllerDeleteFlow$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, FlowService.FlowControllerDeleteFlowPath, 'delete');
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
     * To access the full response (for headers, for example), `flowControllerDeleteFlow$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowControllerDeleteFlow(params: { id: string }): Observable<void> {
        return this.flowControllerDeleteFlow$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
