/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEventFieldDto } from '../models/create-event-field-dto';
import { GetEventFieldDto } from '../models/get-event-field-dto';
import { UpdateEventFieldDto } from '../models/update-event-field-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class EventFieldService extends BaseService {
    /**
     * Path part for operation eventFieldControllerGetEventFields
     */
    static readonly EventFieldControllerGetEventFieldsPath = '/api/v1/event-field';
    /**
     * Path part for operation eventFieldControllerCreateEventField
     */
    static readonly EventFieldControllerCreateEventFieldPath = '/api/v1/event-field';
    /**
     * Path part for operation eventFieldControllerUpdateEventField
     */
    static readonly EventFieldControllerUpdateEventFieldPath = '/api/v1/event-field/{id}';
    /**
     * Path part for operation eventFieldControllerDeleteEventField
     */
    static readonly EventFieldControllerDeleteEventFieldPath = '/api/v1/event-field/{id}';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventFieldControllerGetEventFields()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventFieldControllerGetEventFields$Response(params?: {
        defaultFields?: boolean;
        name?: string;
        id?: number;
    }): Observable<StrictHttpResponse<Array<GetEventFieldDto>>> {
        const rb = new RequestBuilder(this.rootUrl, EventFieldService.EventFieldControllerGetEventFieldsPath, 'get');
        if (params) {
            rb.query('defaultFields', params.defaultFields, {});
            rb.query('name', params.name, {});
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
                    return r as StrictHttpResponse<Array<GetEventFieldDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventFieldControllerGetEventFields$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventFieldControllerGetEventFields(params?: { defaultFields?: boolean; name?: string; id?: number }): Observable<Array<GetEventFieldDto>> {
        return this.eventFieldControllerGetEventFields$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetEventFieldDto>>) => r.body as Array<GetEventFieldDto>)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventFieldControllerCreateEventField()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventFieldControllerCreateEventField$Response(params: { body: CreateEventFieldDto }): Observable<StrictHttpResponse<GetEventFieldDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventFieldService.EventFieldControllerCreateEventFieldPath, 'post');
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
                    return r as StrictHttpResponse<GetEventFieldDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventFieldControllerCreateEventField$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventFieldControllerCreateEventField(params: { body: CreateEventFieldDto }): Observable<GetEventFieldDto> {
        return this.eventFieldControllerCreateEventField$Response(params).pipe(map((r: StrictHttpResponse<GetEventFieldDto>) => r.body as GetEventFieldDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventFieldControllerUpdateEventField()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventFieldControllerUpdateEventField$Response(params: { id: number; body: UpdateEventFieldDto }): Observable<StrictHttpResponse<GetEventFieldDto>> {
        const rb = new RequestBuilder(this.rootUrl, EventFieldService.EventFieldControllerUpdateEventFieldPath, 'put');
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
                    return r as StrictHttpResponse<GetEventFieldDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `eventFieldControllerUpdateEventField$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    eventFieldControllerUpdateEventField(params: { id: number; body: UpdateEventFieldDto }): Observable<GetEventFieldDto> {
        return this.eventFieldControllerUpdateEventField$Response(params).pipe(map((r: StrictHttpResponse<GetEventFieldDto>) => r.body as GetEventFieldDto));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `eventFieldControllerDeleteEventField()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventFieldControllerDeleteEventField$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, EventFieldService.EventFieldControllerDeleteEventFieldPath, 'delete');
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
     * To access the full response (for headers, for example), `eventFieldControllerDeleteEventField$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    eventFieldControllerDeleteEventField(params: { id: number }): Observable<void> {
        return this.eventFieldControllerDeleteEventField$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
