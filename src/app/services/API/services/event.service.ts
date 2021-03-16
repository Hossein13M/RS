/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventDto } from '../models/create-event-dto';
import { CreateEventResponseDto } from '../models/create-event-response-dto';
import { GetEventDetailsResponseDto } from '../models/get-event-details-response-dto';
import { GetEventsResponseDto } from '../models/get-events-response-dto';
import { UpdateEventDto } from '../models/update-event-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventControllerGetEvents
     */
    static readonly EventControllerGetEventsPath = '/api/v1/event';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventControllerGetEvents()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventControllerGetEvents$Response(params?: {
        id?: number;
        eventLevelId?: number;
        eventTitleId?: number;
    }): Observable<StrictHttpResponse<Array<GetEventsResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventService.EventControllerGetEventsPath, 'get');
        if (params) {
            rb.query('id', params.id, {});
            rb.query('eventLevelId', params.eventLevelId, {});
            rb.query('eventTitleId', params.eventTitleId, {});
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
                    return r as StrictHttpResponse<Array<GetEventsResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventControllerGetEvents$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventControllerGetEvents(params?: {
        id?: number;
        eventLevelId?: number;
        eventTitleId?: number;
    }): Observable<Array<GetEventsResponseDto>> {
        return this.eventControllerGetEvents$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetEventsResponseDto>>) => r.body as Array<GetEventsResponseDto>)
        );
    }

    /**
     * Path part for operation eventControllerCreateEvent
     */
    static readonly EventControllerCreateEventPath = '/api/v1/event';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventControllerCreateEvent()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventControllerCreateEvent$Response(params: { body: CreateEventDto }): Observable<StrictHttpResponse<CreateEventResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventService.EventControllerCreateEventPath, 'post');
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
                    return r as StrictHttpResponse<CreateEventResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventControllerCreateEvent$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventControllerCreateEvent(params: { body: CreateEventDto }): Observable<CreateEventResponseDto> {
        return this.eventControllerCreateEvent$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventResponseDto>) => r.body as CreateEventResponseDto)
        );
    }

    /**
     * Path part for operation eventControllerUpdateEvent
     */
    static readonly EventControllerUpdateEventPath = '/api/v1/event/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventControllerUpdateEvent()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventControllerUpdateEvent$Response(params: {
        id: number;
        body: UpdateEventDto;
    }): Observable<StrictHttpResponse<CreateEventResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventService.EventControllerUpdateEventPath, 'put');
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
                    return r as StrictHttpResponse<CreateEventResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventControllerUpdateEvent$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventControllerUpdateEvent(params: { id: number; body: UpdateEventDto }): Observable<CreateEventResponseDto> {
        return this.eventControllerUpdateEvent$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventResponseDto>) => r.body as CreateEventResponseDto)
        );
    }

    /**
     * Path part for operation eventControllerDeleteEvent
     */
    static readonly EventControllerDeleteEventPath = '/api/v1/event/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventControllerDeleteEvent()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventControllerDeleteEvent$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventService.EventControllerDeleteEventPath, 'delete');
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
     * To access the full response (for headers, for example), `eventControllerDeleteEvent$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventControllerDeleteEvent(params: { id: number }): Observable<void> {
        return this.eventControllerDeleteEvent$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation eventControllerGetEventDetails
     */
    static readonly EventControllerGetEventDetailsPath = '/api/v1/event/details';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventControllerGetEventDetails()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventControllerGetEventDetails$Response(params: {
        eventLevelId: number;
        eventTitleId: number;
    }): Observable<StrictHttpResponse<GetEventDetailsResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventService.EventControllerGetEventDetailsPath, 'get');
        if (params) {
            rb.query('eventLevelId', params.eventLevelId, {});
            rb.query('eventTitleId', params.eventTitleId, {});
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
                    return r as StrictHttpResponse<GetEventDetailsResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventControllerGetEventDetails$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventControllerGetEventDetails(params: { eventLevelId: number; eventTitleId: number }): Observable<GetEventDetailsResponseDto> {
        return this.eventControllerGetEventDetails$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventDetailsResponseDto>) => r.body as GetEventDetailsResponseDto)
        );
    }
}
