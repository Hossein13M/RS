/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFlowHistoryDto } from '../models/create-flow-history-dto';
import { GetFlowHistoryDto } from '../models/get-flow-history-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FlowHistoryService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowHistoryControllerCreateFlow
     */
    static readonly FlowHistoryControllerCreateFlowPath = '/api/v1/flow-history';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowHistoryControllerCreateFlow()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowHistoryControllerCreateFlow$Response(params: { body: CreateFlowHistoryDto }): Observable<StrictHttpResponse<GetFlowHistoryDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowHistoryService.FlowHistoryControllerCreateFlowPath, 'post');
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
                    return r as StrictHttpResponse<GetFlowHistoryDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowHistoryControllerCreateFlow$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowHistoryControllerCreateFlow(params: { body: CreateFlowHistoryDto }): Observable<GetFlowHistoryDto> {
        return this.flowHistoryControllerCreateFlow$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowHistoryDto>) => r.body as GetFlowHistoryDto)
        );
    }

    /**
     * Path part for operation flowHistoryControllerGetFlow
     */
    static readonly FlowHistoryControllerGetFlowPath = '/api/v1/flow-history/{flowInstanceId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowHistoryControllerGetFlow()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowHistoryControllerGetFlow$Response(params: { flowInstanceId: string }): Observable<StrictHttpResponse<Array<GetFlowHistoryDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowHistoryService.FlowHistoryControllerGetFlowPath, 'get');
        if (params) {
            rb.path('flowInstanceId', params.flowInstanceId, {});
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
                    return r as StrictHttpResponse<Array<GetFlowHistoryDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowHistoryControllerGetFlow$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowHistoryControllerGetFlow(params: { flowInstanceId: string }): Observable<Array<GetFlowHistoryDto>> {
        return this.flowHistoryControllerGetFlow$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFlowHistoryDto>>) => r.body as Array<GetFlowHistoryDto>)
        );
    }
}
