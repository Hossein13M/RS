/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventFieldValueDto } from '../models/create-event-field-value-dto';
import { GetEventFieldValueDto } from '../models/get-event-field-value-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventFieldValueService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventFieldValueControllerGetEventFields
     */
    static readonly EventFieldValueControllerGetEventFieldsPath = '/api/v1/event-field-value';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventFieldValueControllerGetEventFields()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventFieldValueControllerGetEventFields$Response(params: {
        eventId: number;
        eventTitleFieldId: number;
    }): Observable<StrictHttpResponse<GetEventFieldValueDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventFieldValueService.EventFieldValueControllerGetEventFieldsPath, 'get');
        if (params) {
            rb.query('eventId', params.eventId, {});
            rb.query('eventTitleFieldId', params.eventTitleFieldId, {});
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
                    return r as StrictHttpResponse<GetEventFieldValueDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventFieldValueControllerGetEventFields$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventFieldValueControllerGetEventFields(params: { eventId: number; eventTitleFieldId: number }): Observable<GetEventFieldValueDto> {
        return this.eventFieldValueControllerGetEventFields$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventFieldValueDto>) => r.body as GetEventFieldValueDto)
        );
    }

    /**
     * Path part for operation eventFieldValueControllerCreateEventField
     */
    static readonly EventFieldValueControllerCreateEventFieldPath = '/api/v1/event-field-value';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventFieldValueControllerCreateEventField()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventFieldValueControllerCreateEventField$Response(params: {
        body: CreateEventFieldValueDto;
    }): Observable<StrictHttpResponse<GetEventFieldValueDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventFieldValueService.EventFieldValueControllerCreateEventFieldPath, 'post');
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
                    return r as StrictHttpResponse<GetEventFieldValueDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventFieldValueControllerCreateEventField$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventFieldValueControllerCreateEventField(params: { body: CreateEventFieldValueDto }): Observable<GetEventFieldValueDto> {
        return this.eventFieldValueControllerCreateEventField$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventFieldValueDto>) => r.body as GetEventFieldValueDto)
        );
    }
}
