/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateInstrumentDto } from '../models/create-instrument-dto';
import { InstrumentResponseDto } from '../models/instrument-response-dto';
import { InstrumentWithChildDto } from '../models/instrument-with-child-dto';
import { InstrumentWithIdDto } from '../models/instrument-with-id-dto';
import { InstrumentWithParentDto } from '../models/instrument-with-parent-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class InstrumentService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation instrumentControllerGetInstrumentTree
     */
    static readonly InstrumentControllerGetInstrumentTreePath = '/api/v1/instrument/tree';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentControllerGetInstrumentTree()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerGetInstrumentTree$Response(params?: {}): Observable<StrictHttpResponse<Array<InstrumentWithChildDto>>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentService.InstrumentControllerGetInstrumentTreePath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<Array<InstrumentWithChildDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentControllerGetInstrumentTree$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerGetInstrumentTree(params?: {}): Observable<Array<InstrumentWithChildDto>> {
        return this.instrumentControllerGetInstrumentTree$Response(params).pipe(
            map((r: StrictHttpResponse<Array<InstrumentWithChildDto>>) => r.body as Array<InstrumentWithChildDto>)
        );
    }

    /**
     * Path part for operation instrumentControllerGetInstrument
     */
    static readonly InstrumentControllerGetInstrumentPath = '/api/v1/instrument/{instrumentId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentControllerGetInstrument()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerGetInstrument$Response(params: { instrumentId: number }): Observable<StrictHttpResponse<InstrumentWithParentDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentService.InstrumentControllerGetInstrumentPath, 'get');
        if (params) {
            rb.path('instrumentId', params.instrumentId, {});
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
                    return r as StrictHttpResponse<InstrumentWithParentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentControllerGetInstrument$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerGetInstrument(params: { instrumentId: number }): Observable<InstrumentWithParentDto> {
        return this.instrumentControllerGetInstrument$Response(params).pipe(
            map((r: StrictHttpResponse<InstrumentWithParentDto>) => r.body as InstrumentWithParentDto)
        );
    }

    /**
     * Path part for operation instrumentControllerDeleteInstrument
     */
    static readonly InstrumentControllerDeleteInstrumentPath = '/api/v1/instrument/{instrumentId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentControllerDeleteInstrument()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerDeleteInstrument$Response(params: { instrumentId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentService.InstrumentControllerDeleteInstrumentPath, 'delete');
        if (params) {
            rb.path('instrumentId', params.instrumentId, {});
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
     * To access the full response (for headers, for example), `instrumentControllerDeleteInstrument$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerDeleteInstrument(params: { instrumentId: number }): Observable<void> {
        return this.instrumentControllerDeleteInstrument$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation instrumentControllerGetInstruments
     */
    static readonly InstrumentControllerGetInstrumentsPath = '/api/v1/instrument';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentControllerGetInstruments()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerGetInstruments$Response(params?: {
        limit?: number;
        skip?: number;
        name?: string;
        nameEn?: string;
        code?: number;
        parentId?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code parent nameEn
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<InstrumentResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentService.InstrumentControllerGetInstrumentsPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('name', params.name, {});
            rb.query('nameEn', params.nameEn, {});
            rb.query('code', params.code, {});
            rb.query('parentId', params.parentId, {});
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
                    return r as StrictHttpResponse<InstrumentResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentControllerGetInstruments$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentControllerGetInstruments(params?: {
        limit?: number;
        skip?: number;
        name?: string;
        nameEn?: string;
        code?: number;
        parentId?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this name code parent nameEn
         */
        searchKeyword?: any;
    }): Observable<InstrumentResponseDto> {
        return this.instrumentControllerGetInstruments$Response(params).pipe(
            map((r: StrictHttpResponse<InstrumentResponseDto>) => r.body as InstrumentResponseDto)
        );
    }

    /**
     * Path part for operation instrumentControllerUpdateInstrument
     */
    static readonly InstrumentControllerUpdateInstrumentPath = '/api/v1/instrument';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentControllerUpdateInstrument()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentControllerUpdateInstrument$Response(params: { body: InstrumentWithIdDto }): Observable<StrictHttpResponse<InstrumentWithParentDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentService.InstrumentControllerUpdateInstrumentPath, 'put');
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
                    return r as StrictHttpResponse<InstrumentWithParentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentControllerUpdateInstrument$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentControllerUpdateInstrument(params: { body: InstrumentWithIdDto }): Observable<InstrumentWithParentDto> {
        return this.instrumentControllerUpdateInstrument$Response(params).pipe(
            map((r: StrictHttpResponse<InstrumentWithParentDto>) => r.body as InstrumentWithParentDto)
        );
    }

    /**
     * Path part for operation instrumentControllerCreateInstrument
     */
    static readonly InstrumentControllerCreateInstrumentPath = '/api/v1/instrument';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentControllerCreateInstrument()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentControllerCreateInstrument$Response(params: { body: CreateInstrumentDto }): Observable<StrictHttpResponse<InstrumentWithParentDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentService.InstrumentControllerCreateInstrumentPath, 'post');
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
                    return r as StrictHttpResponse<InstrumentWithParentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentControllerCreateInstrument$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentControllerCreateInstrument(params: { body: CreateInstrumentDto }): Observable<InstrumentWithParentDto> {
        return this.instrumentControllerCreateInstrument$Response(params).pipe(
            map((r: StrictHttpResponse<InstrumentWithParentDto>) => r.body as InstrumentWithParentDto)
        );
    }
}
