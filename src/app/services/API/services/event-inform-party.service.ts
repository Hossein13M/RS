/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventInformPartyDto } from '../models/create-event-inform-party-dto';
import { CreateEventInformPartyResponseDto } from '../models/create-event-inform-party-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class EventInformPartyService extends BaseService {
    /**
     * Path part for operation eventInformPartyControllerFindEventInformParty
     */
    static readonly EventInformPartyControllerFindEventInformPartyPath = '/api/v1/event-inform-party';
    /**
     * Path part for operation eventInformPartyControllerCreateEventInformParty
     */
    static readonly EventInformPartyControllerCreateEventInformPartyPath = '/api/v1/event-inform-party';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventInformPartyControllerFindEventInformParty()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventInformPartyControllerFindEventInformParty$Response(params?: {
        eventId?: number;
        id?: number;
    }): Observable<StrictHttpResponse<Array<CreateEventInformPartyResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventInformPartyService.EventInformPartyControllerFindEventInformPartyPath, 'get');
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
                    return r as StrictHttpResponse<Array<CreateEventInformPartyResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventInformPartyControllerFindEventInformParty$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventInformPartyControllerFindEventInformParty(params?: { eventId?: number; id?: number }): Observable<Array<CreateEventInformPartyResponseDto>> {
        return this.eventInformPartyControllerFindEventInformParty$Response(params).pipe(
            map((r: StrictHttpResponse<Array<CreateEventInformPartyResponseDto>>) => r.body as Array<CreateEventInformPartyResponseDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventInformPartyControllerCreateEventInformParty()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventInformPartyControllerCreateEventInformParty$Response(params: {
        body: CreateEventInformPartyDto;
    }): Observable<StrictHttpResponse<Array<CreateEventInformPartyResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventInformPartyService.EventInformPartyControllerCreateEventInformPartyPath, 'post');
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
                    return r as StrictHttpResponse<Array<CreateEventInformPartyResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventInformPartyControllerCreateEventInformParty$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventInformPartyControllerCreateEventInformParty(params: { body: CreateEventInformPartyDto }): Observable<Array<CreateEventInformPartyResponseDto>> {
        return this.eventInformPartyControllerCreateEventInformParty$Response(params).pipe(
            map((r: StrictHttpResponse<Array<CreateEventInformPartyResponseDto>>) => r.body as Array<CreateEventInformPartyResponseDto>)
        );
    }
}
