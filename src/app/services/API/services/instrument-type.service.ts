/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { InstrumentTypeDto } from '../models/instrument-type-dto';
import { InstrumentTypeListResponseDto } from '../models/instrument-type-list-response-dto';
import { SentSuccessDto } from '../models/sent-success-dto';
import { UpdateInstrumentTypeDto } from '../models/update-instrument-type-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class InstrumentTypeService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation instrumentTypeControllerGetInstrumentTypes
     */
    static readonly InstrumentTypeControllerGetInstrumentTypesPath = '/api/v1/instrument-type';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentTypeControllerGetInstrumentTypes()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentTypeControllerGetInstrumentTypes$Response(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<InstrumentTypeListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentTypeService.InstrumentTypeControllerGetInstrumentTypesPath, 'get');
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
                    return r as StrictHttpResponse<InstrumentTypeListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentTypeControllerGetInstrumentTypes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentTypeControllerGetInstrumentTypes(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: any;
    }): Observable<InstrumentTypeListResponseDto> {
        return this.instrumentTypeControllerGetInstrumentTypes$Response(params).pipe(
            map((r: StrictHttpResponse<InstrumentTypeListResponseDto>) => r.body as InstrumentTypeListResponseDto)
        );
    }

    /**
     * Path part for operation instrumentTypeControllerUpdateInstrumentType
     */
    static readonly InstrumentTypeControllerUpdateInstrumentTypePath = '/api/v1/instrument-type';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentTypeControllerUpdateInstrumentType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentTypeControllerUpdateInstrumentType$Response(params: {
        body: UpdateInstrumentTypeDto;
    }): Observable<StrictHttpResponse<SentSuccessDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentTypeService.InstrumentTypeControllerUpdateInstrumentTypePath, 'put');
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
                    return r as StrictHttpResponse<SentSuccessDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentTypeControllerUpdateInstrumentType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    instrumentTypeControllerUpdateInstrumentType(params: { body: UpdateInstrumentTypeDto }): Observable<SentSuccessDto> {
        return this.instrumentTypeControllerUpdateInstrumentType$Response(params).pipe(
            map((r: StrictHttpResponse<SentSuccessDto>) => r.body as SentSuccessDto)
        );
    }

    /**
     * Path part for operation instrumentTypeControllerGetInstrumentType
     */
    static readonly InstrumentTypeControllerGetInstrumentTypePath = '/api/v1/instrument-type/{ticker}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `instrumentTypeControllerGetInstrumentType()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentTypeControllerGetInstrumentType$Response(params: {
        ticker: string;
        isInBourse: boolean;
    }): Observable<StrictHttpResponse<InstrumentTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, InstrumentTypeService.InstrumentTypeControllerGetInstrumentTypePath, 'get');
        if (params) {
            rb.path('ticker', params.ticker, {});
            rb.query('isInBourse', params.isInBourse, {});
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
                    return r as StrictHttpResponse<InstrumentTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `instrumentTypeControllerGetInstrumentType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    instrumentTypeControllerGetInstrumentType(params: { ticker: string; isInBourse: boolean }): Observable<InstrumentTypeDto> {
        return this.instrumentTypeControllerGetInstrumentType$Response(params).pipe(
            map((r: StrictHttpResponse<InstrumentTypeDto>) => r.body as InstrumentTypeDto)
        );
    }
}
