/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFlowInstanceDto } from '../models/create-flow-instance-dto';
import { FindFlowInstanceResponseDto } from '../models/find-flow-instance-response-dto';
import { GetContractsProgressReportResponseDto } from '../models/get-contracts-progress-report-response-dto';
import { UpdateFlowInstanceDto } from '../models/update-flow-instance-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FlowInstanceService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowInstanceControllerGetFlowInstance
     */
    static readonly FlowInstanceControllerGetFlowInstancePath = '/api/v1/flow-instance';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceControllerGetFlowInstance()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceControllerGetFlowInstance$Response(params?: {
        code?: string;
        title?: string;
        customerName?: string;
        date?: Date;
        id?: string;
        flowName?: string;
        flowId?: string;
        initializerPartyId?: string;
    }): Observable<StrictHttpResponse<Array<FindFlowInstanceResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceService.FlowInstanceControllerGetFlowInstancePath, 'get');
        if (params) {
            rb.query('code', params.code, {});
            rb.query('title', params.title, {});
            rb.query('customerName', params.customerName, {});
            rb.query('date', params.date, {});
            rb.query('id', params.id, {});
            rb.query('flowName', params.flowName, {});
            rb.query('flowId', params.flowId, {});
            rb.query('initializerPartyId', params.initializerPartyId, {});
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
                    return r as StrictHttpResponse<Array<FindFlowInstanceResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceControllerGetFlowInstance$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceControllerGetFlowInstance(params?: {
        code?: string;
        title?: string;
        customerName?: string;
        date?: Date;
        id?: string;
        flowName?: string;
        flowId?: string;
        initializerPartyId?: string;
    }): Observable<Array<FindFlowInstanceResponseDto>> {
        return this.flowInstanceControllerGetFlowInstance$Response(params).pipe(
            map((r: StrictHttpResponse<Array<FindFlowInstanceResponseDto>>) => r.body as Array<FindFlowInstanceResponseDto>)
        );
    }

    /**
     * Path part for operation flowInstanceControllerCreateFlowInstance
     */
    static readonly FlowInstanceControllerCreateFlowInstancePath = '/api/v1/flow-instance';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceControllerCreateFlowInstance()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceControllerCreateFlowInstance$Response(params: {
        body: CreateFlowInstanceDto;
    }): Observable<StrictHttpResponse<FindFlowInstanceResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceService.FlowInstanceControllerCreateFlowInstancePath, 'post');
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
                    return r as StrictHttpResponse<FindFlowInstanceResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceControllerCreateFlowInstance$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceControllerCreateFlowInstance(params: { body: CreateFlowInstanceDto }): Observable<FindFlowInstanceResponseDto> {
        return this.flowInstanceControllerCreateFlowInstance$Response(params).pipe(
            map((r: StrictHttpResponse<FindFlowInstanceResponseDto>) => r.body as FindFlowInstanceResponseDto)
        );
    }

    /**
     * Path part for operation flowInstanceControllerDeleteFlowInstance
     */
    static readonly FlowInstanceControllerDeleteFlowInstancePath = '/api/v1/flow-instance';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceControllerDeleteFlowInstance()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceControllerDeleteFlowInstance$Response(params: { id: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceService.FlowInstanceControllerDeleteFlowInstancePath, 'delete');
        if (params) {
            rb.query('id', params.id, {});
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
     * To access the full response (for headers, for example), `flowInstanceControllerDeleteFlowInstance$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceControllerDeleteFlowInstance(params: { id: string }): Observable<void> {
        return this.flowInstanceControllerDeleteFlowInstance$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation flowInstanceControllerUpdateFlowInstance
     */
    static readonly FlowInstanceControllerUpdateFlowInstancePath = '/api/v1/flow-instance/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceControllerUpdateFlowInstance()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceControllerUpdateFlowInstance$Response(params: {
        id: string;
        body: UpdateFlowInstanceDto;
    }): Observable<StrictHttpResponse<FindFlowInstanceResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceService.FlowInstanceControllerUpdateFlowInstancePath, 'put');
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
                    return r as StrictHttpResponse<FindFlowInstanceResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceControllerUpdateFlowInstance$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowInstanceControllerUpdateFlowInstance(params: { id: string; body: UpdateFlowInstanceDto }): Observable<FindFlowInstanceResponseDto> {
        return this.flowInstanceControllerUpdateFlowInstance$Response(params).pipe(
            map((r: StrictHttpResponse<FindFlowInstanceResponseDto>) => r.body as FindFlowInstanceResponseDto)
        );
    }

    /**
     * Path part for operation flowInstanceControllerGetContractsProgressReport
     */
    static readonly FlowInstanceControllerGetContractsProgressReportPath = '/api/v1/flow-instance/progress-report';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowInstanceControllerGetContractsProgressReport()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceControllerGetContractsProgressReport$Response(params?: {}): Observable<StrictHttpResponse<GetContractsProgressReportResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowInstanceService.FlowInstanceControllerGetContractsProgressReportPath, 'get');
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
                    return r as StrictHttpResponse<GetContractsProgressReportResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowInstanceControllerGetContractsProgressReport$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowInstanceControllerGetContractsProgressReport(params?: {}): Observable<GetContractsProgressReportResponseDto> {
        return this.flowInstanceControllerGetContractsProgressReport$Response(params).pipe(
            map((r: StrictHttpResponse<GetContractsProgressReportResponseDto>) => r.body as GetContractsProgressReportResponseDto)
        );
    }
}
