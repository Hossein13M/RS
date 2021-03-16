/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventReminderDto } from '../models/create-event-reminder-dto';
import { CreateEventReminderResponseDto } from '../models/create-event-reminder-response-dto';
import { UpdateEventReminderDto } from '../models/update-event-reminder-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventReminderService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventReminderControllerFindEventReminder
     */
    static readonly EventReminderControllerFindEventReminderPath = '/api/v1/event-reminder';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventReminderControllerFindEventReminder()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventReminderControllerFindEventReminder$Response(params?: {
        eventId?: number;
        id?: number;
    }): Observable<StrictHttpResponse<Array<CreateEventReminderResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventReminderService.EventReminderControllerFindEventReminderPath, 'get');
        if (params) {
            rb.query('eventId', params.eventId, {});
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
                    return r as StrictHttpResponse<Array<CreateEventReminderResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventReminderControllerFindEventReminder$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventReminderControllerFindEventReminder(params?: {
        eventId?: number;
        id?: number;
    }): Observable<Array<CreateEventReminderResponseDto>> {
        return this.eventReminderControllerFindEventReminder$Response(params).pipe(
            map((r: StrictHttpResponse<Array<CreateEventReminderResponseDto>>) => r.body as Array<CreateEventReminderResponseDto>)
        );
    }

    /**
     * Path part for operation eventReminderControllerCreateEventReminder
     */
    static readonly EventReminderControllerCreateEventReminderPath = '/api/v1/event-reminder';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventReminderControllerCreateEventReminder()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventReminderControllerCreateEventReminder$Response(params: {
        body: CreateEventReminderDto;
    }): Observable<StrictHttpResponse<CreateEventReminderResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventReminderService.EventReminderControllerCreateEventReminderPath, 'post');
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
                    return r as StrictHttpResponse<CreateEventReminderResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventReminderControllerCreateEventReminder$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventReminderControllerCreateEventReminder(params: { body: CreateEventReminderDto }): Observable<CreateEventReminderResponseDto> {
        return this.eventReminderControllerCreateEventReminder$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventReminderResponseDto>) => r.body as CreateEventReminderResponseDto)
        );
    }

    /**
     * Path part for operation eventReminderControllerUpdateEventReminder
     */
    static readonly EventReminderControllerUpdateEventReminderPath = '/api/v1/event-reminder/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventReminderControllerUpdateEventReminder()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventReminderControllerUpdateEventReminder$Response(params: {
        id: number;
        body: UpdateEventReminderDto;
    }): Observable<StrictHttpResponse<CreateEventReminderResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventReminderService.EventReminderControllerUpdateEventReminderPath, 'put');
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
                    return r as StrictHttpResponse<CreateEventReminderResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventReminderControllerUpdateEventReminder$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventReminderControllerUpdateEventReminder(params: {
        id: number;
        body: UpdateEventReminderDto;
    }): Observable<CreateEventReminderResponseDto> {
        return this.eventReminderControllerUpdateEventReminder$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventReminderResponseDto>) => r.body as CreateEventReminderResponseDto)
        );
    }

    /**
     * Path part for operation eventReminderControllerDeleteEventReminder
     */
    static readonly EventReminderControllerDeleteEventReminderPath = '/api/v1/event-reminder/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventReminderControllerDeleteEventReminder()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventReminderControllerDeleteEventReminder$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventReminderService.EventReminderControllerDeleteEventReminderPath, 'delete');
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
     * To access the full response (for headers, for example), `eventReminderControllerDeleteEventReminder$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventReminderControllerDeleteEventReminder(params: { id: number }): Observable<void> {
        return this.eventReminderControllerDeleteEventReminder$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
