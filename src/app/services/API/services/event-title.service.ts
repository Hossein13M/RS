/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventTitleDto } from '../models/create-event-title-dto';
import { GetEventTitleDto } from '../models/get-event-title-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class EventTitleService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventTitleControllerGetEventTitles
     */
    static readonly EventTitleControllerGetEventTitlesPath = '/api/v1/event-title';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleControllerGetEventTitles()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleControllerGetEventTitles$Response(params?: {
        eventLevelId?: number;
        id?: number;
    }): Observable<StrictHttpResponse<Array<GetEventTitleDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleService.EventTitleControllerGetEventTitlesPath, 'get');
        if (params) {
            rb.query('eventLevelId', params.eventLevelId, {});
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
                    return r as StrictHttpResponse<Array<GetEventTitleDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventTitleControllerGetEventTitles$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleControllerGetEventTitles(params?: { eventLevelId?: number; id?: number }): Observable<Array<GetEventTitleDto>> {
        return this.eventTitleControllerGetEventTitles$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetEventTitleDto>>) => r.body as Array<GetEventTitleDto>)
        );
    }

    /**
     * Path part for operation eventTitleControllerCreateEventTitle
     */
    static readonly EventTitleControllerCreateEventTitlePath = '/api/v1/event-title';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleControllerCreateEventTitle()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventTitleControllerCreateEventTitle$Response(params: { body: CreateEventTitleDto }): Observable<StrictHttpResponse<GetEventTitleDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleService.EventTitleControllerCreateEventTitlePath, 'post');
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
                    return r as StrictHttpResponse<GetEventTitleDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventTitleControllerCreateEventTitle$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventTitleControllerCreateEventTitle(params: { body: CreateEventTitleDto }): Observable<GetEventTitleDto> {
        return this.eventTitleControllerCreateEventTitle$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventTitleDto>) => r.body as GetEventTitleDto)
        );
    }

    /**
     * Path part for operation eventTitleControllerUpdateEventTitle
     */
    static readonly EventTitleControllerUpdateEventTitlePath = '/api/v1/event-title/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleControllerUpdateEventTitle()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventTitleControllerUpdateEventTitle$Response(params: {
        id: number;
        body: CreateEventTitleDto;
    }): Observable<StrictHttpResponse<GetEventTitleDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleService.EventTitleControllerUpdateEventTitlePath, 'put');
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
                    return r as StrictHttpResponse<GetEventTitleDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventTitleControllerUpdateEventTitle$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventTitleControllerUpdateEventTitle(params: { id: number; body: CreateEventTitleDto }): Observable<GetEventTitleDto> {
        return this.eventTitleControllerUpdateEventTitle$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventTitleDto>) => r.body as GetEventTitleDto)
        );
    }

    /**
     * Path part for operation eventTitleControllerDeleteEventTitle
     */
    static readonly EventTitleControllerDeleteEventTitlePath = '/api/v1/event-title/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventTitleControllerDeleteEventTitle()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleControllerDeleteEventTitle$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventTitleService.EventTitleControllerDeleteEventTitlePath, 'delete');
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
     * To access the full response (for headers, for example), `eventTitleControllerDeleteEventTitle$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventTitleControllerDeleteEventTitle(params: { id: number }): Observable<void> {
        return this.eventTitleControllerDeleteEventTitle$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
