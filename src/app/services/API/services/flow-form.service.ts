/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { GetFlowFormDto } from '../models/get-flow-form-dto';
import { UpdateFlowFormDto } from '../models/update-flow-form-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FlowFormService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowFormControllerGetFlowForm
     */
    static readonly FlowFormControllerGetFlowFormPath = '/api/v1/flow-form';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFormControllerGetFlowForm()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFormControllerGetFlowForm$Response(params: {
        formId: string;
        flowId: string;
    }): Observable<StrictHttpResponse<Array<GetFlowFormDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFormService.FlowFormControllerGetFlowFormPath, 'get');
        if (params) {
            rb.query('formId', params.formId, {});
            rb.query('flowId', params.flowId, {});
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
                    return r as StrictHttpResponse<Array<GetFlowFormDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFormControllerGetFlowForm$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowFormControllerGetFlowForm(params: { formId: string; flowId: string }): Observable<Array<GetFlowFormDto>> {
        return this.flowFormControllerGetFlowForm$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFlowFormDto>>) => r.body as Array<GetFlowFormDto>)
        );
    }

    /**
     * Path part for operation flowFormControllerUpdateFlowForm
     */
    static readonly FlowFormControllerUpdateFlowFormPath = '/api/v1/flow-form';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowFormControllerUpdateFlowForm()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowFormControllerUpdateFlowForm$Response(params: { body: UpdateFlowFormDto }): Observable<StrictHttpResponse<GetFlowFormDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowFormService.FlowFormControllerUpdateFlowFormPath, 'put');
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
                    return r as StrictHttpResponse<GetFlowFormDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowFormControllerUpdateFlowForm$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowFormControllerUpdateFlowForm(params: { body: UpdateFlowFormDto }): Observable<GetFlowFormDto> {
        return this.flowFormControllerUpdateFlowForm$Response(params).pipe(
            map((r: StrictHttpResponse<GetFlowFormDto>) => r.body as GetFlowFormDto)
        );
    }
}
