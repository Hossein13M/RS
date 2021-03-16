/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventLevelDto } from '../models/create-event-level-dto';
import { GetEventLevelDto } from '../models/get-event-level-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventLevelService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventLevelControllerGetEventLevels
     */
    static readonly EventLevelControllerGetEventLevelsPath = '/api/v1/event-level';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventLevelControllerGetEventLevels()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventLevelControllerGetEventLevels$Response(params?: { id?: number }): Observable<StrictHttpResponse<Array<GetEventLevelDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventLevelService.EventLevelControllerGetEventLevelsPath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<Array<GetEventLevelDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventLevelControllerGetEventLevels$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventLevelControllerGetEventLevels(params?: { id?: number }): Observable<Array<GetEventLevelDto>> {
        return this.eventLevelControllerGetEventLevels$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetEventLevelDto>>) => r.body as Array<GetEventLevelDto>)
        );
    }

    /**
     * Path part for operation eventLevelControllerCreateEventLevel
     */
    static readonly EventLevelControllerCreateEventLevelPath = '/api/v1/event-level';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventLevelControllerCreateEventLevel()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventLevelControllerCreateEventLevel$Response(params: { body: CreateEventLevelDto }): Observable<StrictHttpResponse<GetEventLevelDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventLevelService.EventLevelControllerCreateEventLevelPath, 'post');
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
                    return r as StrictHttpResponse<GetEventLevelDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventLevelControllerCreateEventLevel$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventLevelControllerCreateEventLevel(params: { body: CreateEventLevelDto }): Observable<GetEventLevelDto> {
        return this.eventLevelControllerCreateEventLevel$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventLevelDto>) => r.body as GetEventLevelDto)
        );
    }

    /**
     * Path part for operation eventLevelControllerUpdateEventLevel
     */
    static readonly EventLevelControllerUpdateEventLevelPath = '/api/v1/event-level/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventLevelControllerUpdateEventLevel()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventLevelControllerUpdateEventLevel$Response(params: {
        id: number;
        body: CreateEventLevelDto;
    }): Observable<StrictHttpResponse<GetEventLevelDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventLevelService.EventLevelControllerUpdateEventLevelPath, 'put');
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
                    return r as StrictHttpResponse<GetEventLevelDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventLevelControllerUpdateEventLevel$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventLevelControllerUpdateEventLevel(params: { id: number; body: CreateEventLevelDto }): Observable<GetEventLevelDto> {
        return this.eventLevelControllerUpdateEventLevel$Response(params).pipe(
            map((r: StrictHttpResponse<GetEventLevelDto>) => r.body as GetEventLevelDto)
        );
    }

    /**
     * Path part for operation eventLevelControllerDeleteEventLevel
     */
    static readonly EventLevelControllerDeleteEventLevelPath = '/api/v1/event-level/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventLevelControllerDeleteEventLevel()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventLevelControllerDeleteEventLevel$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventLevelService.EventLevelControllerDeleteEventLevelPath, 'delete');
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
     * To access the full response (for headers, for example), `eventLevelControllerDeleteEventLevel$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventLevelControllerDeleteEventLevel(params: { id: number }): Observable<void> {
        return this.eventLevelControllerDeleteEventLevel$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
