/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventRelationDto } from '../models/create-event-relation-dto';
import { CreateEventRelationResponseDto } from '../models/create-event-relation-response-dto';
import { UpdateEventRelationDto } from '../models/update-event-relation-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class EventRelationService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation eventRelationControllerGetEventRelations
     */
    static readonly EventRelationControllerGetEventRelationsPath = '/api/v1/event-relation';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventRelationControllerGetEventRelations()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventRelationControllerGetEventRelations$Response(params?: {
        id?: number;
        eventId?: number;
    }): Observable<StrictHttpResponse<Array<CreateEventRelationResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventRelationService.EventRelationControllerGetEventRelationsPath, 'get');
        if (params) {
            rb.query('id', params.id, {});
            rb.query('eventId', params.eventId, {});
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
                    return r as StrictHttpResponse<Array<CreateEventRelationResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventRelationControllerGetEventRelations$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventRelationControllerGetEventRelations(params?: {
        id?: number;
        eventId?: number;
    }): Observable<Array<CreateEventRelationResponseDto>> {
        return this.eventRelationControllerGetEventRelations$Response(params).pipe(
            map((r: StrictHttpResponse<Array<CreateEventRelationResponseDto>>) => r.body as Array<CreateEventRelationResponseDto>)
        );
    }

    /**
     * Path part for operation eventRelationControllerCreateEventRelation
     */
    static readonly EventRelationControllerCreateEventRelationPath = '/api/v1/event-relation';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventRelationControllerCreateEventRelation()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventRelationControllerCreateEventRelation$Response(params: {
        body: CreateEventRelationDto;
    }): Observable<StrictHttpResponse<CreateEventRelationResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventRelationService.EventRelationControllerCreateEventRelationPath, 'post');
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
                    return r as StrictHttpResponse<CreateEventRelationResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventRelationControllerCreateEventRelation$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventRelationControllerCreateEventRelation(params: { body: CreateEventRelationDto }): Observable<CreateEventRelationResponseDto> {
        return this.eventRelationControllerCreateEventRelation$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventRelationResponseDto>) => r.body as CreateEventRelationResponseDto)
        );
    }

    /**
     * Path part for operation eventRelationControllerUpdateEventRelation
     */
    static readonly EventRelationControllerUpdateEventRelationPath = '/api/v1/event-relation/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventRelationControllerUpdateEventRelation()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventRelationControllerUpdateEventRelation$Response(params: {
        id: number;
        body: UpdateEventRelationDto;
    }): Observable<StrictHttpResponse<CreateEventRelationResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventRelationService.EventRelationControllerUpdateEventRelationPath, 'put');
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
                    return r as StrictHttpResponse<CreateEventRelationResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventRelationControllerUpdateEventRelation$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventRelationControllerUpdateEventRelation(params: {
        id: number;
        body: UpdateEventRelationDto;
    }): Observable<CreateEventRelationResponseDto> {
        return this.eventRelationControllerUpdateEventRelation$Response(params).pipe(
            map((r: StrictHttpResponse<CreateEventRelationResponseDto>) => r.body as CreateEventRelationResponseDto)
        );
    }

    /**
     * Path part for operation eventRelationControllerDeleteEventRelation
     */
    static readonly EventRelationControllerDeleteEventRelationPath = '/api/v1/event-relation/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventRelationControllerDeleteEventRelation()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventRelationControllerDeleteEventRelation$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventRelationService.EventRelationControllerDeleteEventRelationPath, 'delete');
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
     * To access the full response (for headers, for example), `eventRelationControllerDeleteEventRelation$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventRelationControllerDeleteEventRelation(params: { id: number }): Observable<void> {
        return this.eventRelationControllerDeleteEventRelation$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
