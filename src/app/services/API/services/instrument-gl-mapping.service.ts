/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateInstGlMappingDto } from '../models/create-inst-gl-mapping-dto';
import { InstGlMappingDto } from '../models/inst-gl-mapping-dto';
import { InstGlMappingResponseDto } from '../models/inst-gl-mapping-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class InstrumentGlMappingService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation instrumentGlMappingControllerGetInstrumentGlMapping
     */
    static readonly InstrumentGlMappingControllerGetInstrumentGlMappingPath = '/api/v1/inst-gl-mapping/{instrumentGLMappingId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentGlMappingControllerGetInstrumentGlMapping()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentGlMappingControllerGetInstrumentGlMapping$Response(params: {
        instrumentGLMappingId: number;
    }): Observable<StrictHttpResponse<InstGlMappingDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            InstrumentGlMappingService.InstrumentGlMappingControllerGetInstrumentGlMappingPath,
            'get'
        );
        if (params) {
            rb.path('instrumentGLMappingId', params.instrumentGLMappingId, {});
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
                    return r as StrictHttpResponse<InstGlMappingDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentGlMappingControllerGetInstrumentGlMapping$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentGlMappingControllerGetInstrumentGlMapping(params: { instrumentGLMappingId: number }): Observable<InstGlMappingDto> {
        return this.instrumentGlMappingControllerGetInstrumentGlMapping$Response(params).pipe(
            map((r: StrictHttpResponse<InstGlMappingDto>) => r.body as InstGlMappingDto)
        );
    }

    /**
     * Path part for operation instrumentGlMappingControllerDeleteInstrumentGlMapping
     */
    static readonly InstrumentGlMappingControllerDeleteInstrumentGlMappingPath = '/api/v1/inst-gl-mapping/{instrumentGLMappingId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentGlMappingControllerDeleteInstrumentGlMapping()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentGlMappingControllerDeleteInstrumentGlMapping$Response(params: {
        instrumentGLMappingId: number;
    }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            InstrumentGlMappingService.InstrumentGlMappingControllerDeleteInstrumentGlMappingPath,
            'delete'
        );
        if (params) {
            rb.path('instrumentGLMappingId', params.instrumentGLMappingId, {});
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
     * To access the full response (for headers, for example), `instrumentGlMappingControllerDeleteInstrumentGlMapping$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentGlMappingControllerDeleteInstrumentGlMapping(params: { instrumentGLMappingId: number }): Observable<void> {
        return this.instrumentGlMappingControllerDeleteInstrumentGlMapping$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation instrumentGlMappingControllerGetInstrumentsGlMapping
     */
    static readonly InstrumentGlMappingControllerGetInstrumentsGlMappingPath = '/api/v1/inst-gl-mapping';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentGlMappingControllerGetInstrumentsGlMapping()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentGlMappingControllerGetInstrumentsGlMapping$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * searchKeyword is matched symbol or glcode or ticker or status(active, deleted)
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<InstGlMappingResponseDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            InstrumentGlMappingService.InstrumentGlMappingControllerGetInstrumentsGlMappingPath,
            'get'
        );
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('searchKeyword', params.searchKeyword, {});
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
                    return r as StrictHttpResponse<InstGlMappingResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentGlMappingControllerGetInstrumentsGlMapping$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentGlMappingControllerGetInstrumentsGlMapping(params?: {
        limit?: number;
        skip?: number;

        /**
         * searchKeyword is matched symbol or glcode or ticker or status(active, deleted)
         */
        searchKeyword?: any;
    }): Observable<InstGlMappingResponseDto> {
        return this.instrumentGlMappingControllerGetInstrumentsGlMapping$Response(params).pipe(
            map((r: StrictHttpResponse<InstGlMappingResponseDto>) => r.body as InstGlMappingResponseDto)
        );
    }

    /**
     * Path part for operation instrumentGlMappingControllerUpdateInstrumentGlMapping
     */
    static readonly InstrumentGlMappingControllerUpdateInstrumentGlMappingPath = '/api/v1/inst-gl-mapping';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentGlMappingControllerUpdateInstrumentGlMapping()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentGlMappingControllerUpdateInstrumentGlMapping$Response(params: {
        body: InstGlMappingDto;
    }): Observable<StrictHttpResponse<InstGlMappingDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            InstrumentGlMappingService.InstrumentGlMappingControllerUpdateInstrumentGlMappingPath,
            'put'
        );
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
                    return r as StrictHttpResponse<InstGlMappingDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentGlMappingControllerUpdateInstrumentGlMapping$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentGlMappingControllerUpdateInstrumentGlMapping(params: { body: InstGlMappingDto }): Observable<InstGlMappingDto> {
        return this.instrumentGlMappingControllerUpdateInstrumentGlMapping$Response(params).pipe(
            map((r: StrictHttpResponse<InstGlMappingDto>) => r.body as InstGlMappingDto)
        );
    }

    /**
     * Path part for operation instrumentGlMappingControllerCreateInstrumentGlMapping
     */
    static readonly InstrumentGlMappingControllerCreateInstrumentGlMappingPath = '/api/v1/inst-gl-mapping';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentGlMappingControllerCreateInstrumentGlMapping()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentGlMappingControllerCreateInstrumentGlMapping$Response(params: {
        body: CreateInstGlMappingDto;
    }): Observable<StrictHttpResponse<InstGlMappingDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            InstrumentGlMappingService.InstrumentGlMappingControllerCreateInstrumentGlMappingPath,
            'post'
        );
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
                    return r as StrictHttpResponse<InstGlMappingDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentGlMappingControllerCreateInstrumentGlMapping$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentGlMappingControllerCreateInstrumentGlMapping(params: { body: CreateInstGlMappingDto }): Observable<InstGlMappingDto> {
        return this.instrumentGlMappingControllerCreateInstrumentGlMapping$Response(params).pipe(
            map((r: StrictHttpResponse<InstGlMappingDto>) => r.body as InstGlMappingDto)
        );
    }
}
