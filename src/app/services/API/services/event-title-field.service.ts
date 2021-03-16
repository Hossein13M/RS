/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventTitleFieldDto } from '../models/create-event-title-field-dto';
import { FindEventTitleFieldDto } from '../models/find-event-title-field-dto';
import { GetEventTitleFieldDto } from '../models/get-event-title-field-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventTitleFieldService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventTitleFieldControllerCreateEventTitleField
     */
    static readonly EventTitleFieldControllerCreateEventTitleFieldPath = '/api/v1/event-title-field';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleFieldControllerCreateEventTitleField()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventTitleFieldControllerCreateEventTitleField$Response(params: {
        body: CreateEventTitleFieldDto;
    }): Observable<StrictHttpResponse<GetEventTitleFieldDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleFieldService.EventTitleFieldControllerCreateEventTitleFieldPath, 'post');
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
                    return r as StrictHttpResponse<GetEventTitleFieldDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventTitleFieldControllerCreateEventTitleField$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventTitleFieldControllerCreateEventTitleField(params: { body: CreateEventTitleFieldDto }): Observable<GetEventTitleFieldDto> {
        return this.eventTitleFieldControllerCreateEventTitleField$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventTitleFieldDto>) => r.body as GetEventTitleFieldDto)
        );
    }

    /**
     * Path part for operation eventTitleFieldControllerGetEventTitleFields
     */
    static readonly EventTitleFieldControllerGetEventTitleFieldsPath = '/api/v1/event-title-field/{eventTitleId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleFieldControllerGetEventTitleFields()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleFieldControllerGetEventTitleFields$Response(params: {
        eventTitleId: number;
    }): Observable<StrictHttpResponse<FindEventTitleFieldDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleFieldService.EventTitleFieldControllerGetEventTitleFieldsPath, 'get');
        if (params) {
            rb.path('eventTitleId', params.eventTitleId, {});
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
                    return r as StrictHttpResponse<FindEventTitleFieldDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventTitleFieldControllerGetEventTitleFields$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleFieldControllerGetEventTitleFields(params: { eventTitleId: number }): Observable<FindEventTitleFieldDto> {
        return this.eventTitleFieldControllerGetEventTitleFields$Response(params).pipe(
            map((r: StrictHttpResponse<FindEventTitleFieldDto>) => r.body as FindEventTitleFieldDto)
        );
    }

    /**
     * Path part for operation eventTitleFieldControllerDeleteEventTitleField
     */
    static readonly EventTitleFieldControllerDeleteEventTitleFieldPath = '/api/v1/event-title-field/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleFieldControllerDeleteEventTitleField()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleFieldControllerDeleteEventTitleField$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleFieldService.EventTitleFieldControllerDeleteEventTitleFieldPath, 'delete');
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
     * To access the full response (for headers, for example), `eventTitleFieldControllerDeleteEventTitleField$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleFieldControllerDeleteEventTitleField(params: { id: number }): Observable<void> {
        return this.eventTitleFieldControllerDeleteEventTitleField$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }
}
