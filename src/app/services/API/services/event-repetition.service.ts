/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventRepetitionResponseDto } from '../models/create-event-repetition-response-dto';
import { UpdateEventRepetitionDto } from '../models/update-event-repetition-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventRepetitionService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventRepetitionControllerGetEventRepetitions
     */
    static readonly EventRepetitionControllerGetEventRepetitionsPath = '/api/v1/event-repetition';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventRepetitionControllerGetEventRepetitions()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventRepetitionControllerGetEventRepetitions$Response(params?: {
        eventId?: number;
        id?: number;
        entityId?: number;
        dueDate?: Date;
        fromDate?: Date;
        toDate?: Date;
        isDone?: boolean;
    }): Observable<StrictHttpResponse<Array<CreateEventRepetitionResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventRepetitionService.EventRepetitionControllerGetEventRepetitionsPath, 'get');
        if (params) {
            rb.query('eventId', params.eventId, {});
            rb.query('id', params.id, {});
            rb.query('entityId', params.entityId, {});
            rb.query('dueDate', params.dueDate, {});
            rb.query('fromDate', params.fromDate, {});
            rb.query('toDate', params.toDate, {});
            rb.query('isDone', params.isDone, {});
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
                    return r as StrictHttpResponse<Array<CreateEventRepetitionResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventRepetitionControllerGetEventRepetitions$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventRepetitionControllerGetEventRepetitions(params?: {
        eventId?: number;
        id?: number;
        entityId?: number;
        dueDate?: Date;
        fromDate?: Date;
        toDate?: Date;
        isDone?: boolean;
    }): Observable<Array<CreateEventRepetitionResponseDto>> {
        return this.eventRepetitionControllerGetEventRepetitions$Response(params).pipe(
            map((r: StrictHttpResponse<Array<CreateEventRepetitionResponseDto>>) => r.body as Array<CreateEventRepetitionResponseDto>)
        );
    }

    /**
     * Path part for operation eventRepetitionControllerUpdateEventRepetition
     */
    static readonly EventRepetitionControllerUpdateEventRepetitionPath = '/api/v1/event-repetition/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventRepetitionControllerUpdateEventRepetition()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventRepetitionControllerUpdateEventRepetition$Response(params: {
        id: number;
        body: UpdateEventRepetitionDto;
    }): Observable<StrictHttpResponse<CreateEventRepetitionResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventRepetitionService.EventRepetitionControllerUpdateEventRepetitionPath, 'put');
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
                    return r as StrictHttpResponse<CreateEventRepetitionResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventRepetitionControllerUpdateEventRepetition$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventRepetitionControllerUpdateEventRepetition(params: {
        id: number;
        body: UpdateEventRepetitionDto;
    }): Observable<CreateEventRepetitionResponseDto> {
        return this.eventRepetitionControllerUpdateEventRepetition$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventRepetitionResponseDto>) => r.body as CreateEventRepetitionResponseDto)
        );
    }
}
