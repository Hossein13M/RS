/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFlowNoteDto } from '../models/create-flow-note-dto';
import { GetFlowNoteDto } from '../models/get-flow-note-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class FlowNoteService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation flowNoteControllerCreateFlowNote
     */
    static readonly FlowNoteControllerCreateFlowNotePath = '/api/v1/flow-note';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowNoteControllerCreateFlowNote()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowNoteControllerCreateFlowNote$Response(params: { body: CreateFlowNoteDto }): Observable<StrictHttpResponse<GetFlowNoteDto>> {
        const rb = new RequestBuilder(this.rootUrl, FlowNoteService.FlowNoteControllerCreateFlowNotePath, 'post');
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
                    return r as StrictHttpResponse<GetFlowNoteDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowNoteControllerCreateFlowNote$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    flowNoteControllerCreateFlowNote(params: { body: CreateFlowNoteDto }): Observable<GetFlowNoteDto> {
        return this.flowNoteControllerCreateFlowNote$Response(params).pipe(map((r: StrictHttpResponse<GetFlowNoteDto>) => r.body as GetFlowNoteDto));
    }

    /**
     * Path part for operation flowNoteControllerGetFlowNote
     */
    static readonly FlowNoteControllerGetFlowNotePath = '/api/v1/flow-note/{flowInstanceId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `flowNoteControllerGetFlowNote()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowNoteControllerGetFlowNote$Response(params: { flowInstanceId: string }): Observable<StrictHttpResponse<Array<GetFlowNoteDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FlowNoteService.FlowNoteControllerGetFlowNotePath, 'get');
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
                    return r as StrictHttpResponse<Array<GetFlowNoteDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `flowNoteControllerGetFlowNote$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    flowNoteControllerGetFlowNote(params: { flowInstanceId: string }): Observable<Array<GetFlowNoteDto>> {
        return this.flowNoteControllerGetFlowNote$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetFlowNoteDto>>) => r.body as Array<GetFlowNoteDto>)
        );
    }
}
