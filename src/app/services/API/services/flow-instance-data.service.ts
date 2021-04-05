/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFlowInstanceDataDto } from '../models/create-flow-instance-data-dto';
import { CreateFlowInstanceDataResponseDto } from '../models/create-flow-instance-data-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FlowInstanceDataService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowInstanceDataControllerGetFlowInstanceData
     */
    static readonly FlowInstanceDataControllerGetFlowInstanceDataPath = '/api/v1/flow-instance-data';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceDataControllerGetFlowInstanceData()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceDataControllerGetFlowInstanceData$Response(params: {
        flowInstanceId: string;
        formId: string;
    }): Observable<StrictHttpResponse<CreateFlowInstanceDataResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceDataService.FlowInstanceDataControllerGetFlowInstanceDataPath, 'get');
        if (params) {
            rb.query('flowInstanceId', params.flowInstanceId, {});
            rb.query('formId', params.formId, {});
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
                    return r as StrictHttpResponse<CreateFlowInstanceDataResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceDataControllerGetFlowInstanceData$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceDataControllerGetFlowInstanceData(params: { flowInstanceId: string; formId: string }): Observable<CreateFlowInstanceDataResponseDto> {
        return this.flowInstanceDataControllerGetFlowInstanceData$Response(params).pipe(
            map((r: StrictHttpResponse<CreateFlowInstanceDataResponseDto>) => r.body as CreateFlowInstanceDataResponseDto)
        );
    }

    /**
     * Path part for operation flowInstanceDataControllerUpdateFlowInstanceData
     */
    static readonly FlowInstanceDataControllerUpdateFlowInstanceDataPath = '/api/v1/flow-instance-data';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceDataControllerUpdateFlowInstanceData()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceDataControllerUpdateFlowInstanceData$Response(params: {
        body: CreateFlowInstanceDataDto;
    }): Observable<StrictHttpResponse<CreateFlowInstanceDataResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceDataService.FlowInstanceDataControllerUpdateFlowInstanceDataPath, 'put');
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
                    return r as StrictHttpResponse<CreateFlowInstanceDataResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceDataControllerUpdateFlowInstanceData$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceDataControllerUpdateFlowInstanceData(params: { body: CreateFlowInstanceDataDto }): Observable<CreateFlowInstanceDataResponseDto> {
        return this.flowInstanceDataControllerUpdateFlowInstanceData$Response(params).pipe(
            map((r: StrictHttpResponse<CreateFlowInstanceDataResponseDto>) => r.body as CreateFlowInstanceDataResponseDto)
        );
    }

    /**
     * Path part for operation flowInstanceDataControllerCreateFlowInstanceData
     */
    static readonly FlowInstanceDataControllerCreateFlowInstanceDataPath = '/api/v1/flow-instance-data';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceDataControllerCreateFlowInstanceData()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceDataControllerCreateFlowInstanceData$Response(params: {
        body: CreateFlowInstanceDataDto;
    }): Observable<StrictHttpResponse<CreateFlowInstanceDataResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceDataService.FlowInstanceDataControllerCreateFlowInstanceDataPath, 'post');
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
                    return r as StrictHttpResponse<CreateFlowInstanceDataResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceDataControllerCreateFlowInstanceData$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceDataControllerCreateFlowInstanceData(params: { body: CreateFlowInstanceDataDto }): Observable<CreateFlowInstanceDataResponseDto> {
        return this.flowInstanceDataControllerCreateFlowInstanceData$Response(params).pipe(
            map((r: StrictHttpResponse<CreateFlowInstanceDataResponseDto>) => r.body as CreateFlowInstanceDataResponseDto)
        );
    }
}
