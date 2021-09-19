/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BondsListResponseDto } from '../models/bonds-list-response-dto';
import { BourseInstrumentDetailsDto } from '../models/bourse-instrument-details-dto';
import { SentSuccessDto } from '../models/sent-success-dto';
import { UpdateBourseInstrumentDetailsDto } from '../models/update-bourse-instrument-details-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class BourseInstrumentDetailService extends BaseService {
    /**
     * Path part for operation bourseInstrumentDetailControllerGetBondsList
     */
    static readonly BourseInstrumentDetailControllerGetBondsListPath = '/api/v1/bourse-instrument-detail/bonds';
    /**
     * Path part for operation bourseInstrumentDetailControllerGetBourseInstrumentDetails
     */
    static readonly BourseInstrumentDetailControllerGetBourseInstrumentDetailsPath = '/api/v1/bourse-instrument-detail/details/{id}';
    /**
     * Path part for operation bourseInstrumentDetailControllerUpdateBourseInstrumentDetails
     */
    static readonly BourseInstrumentDetailControllerUpdateBourseInstrumentDetailsPath = '/api/v1/bourse-instrument-detail';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseInstrumentDetailControllerGetBondsList()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseInstrumentDetailControllerGetBondsList$Response(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: string;
        status?: boolean;
    }): Observable<StrictHttpResponse<BondsListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseInstrumentDetailService.BourseInstrumentDetailControllerGetBondsListPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('searchKeyword', params.searchKeyword, {});
            rb.query('status', params.status, {});
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
                    return r as StrictHttpResponse<BondsListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseInstrumentDetailControllerGetBondsList$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseInstrumentDetailControllerGetBondsList(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: string;
        status?: boolean;
    }): Observable<BondsListResponseDto> {
        return this.bourseInstrumentDetailControllerGetBondsList$Response(params).pipe(
            map((r: StrictHttpResponse<BondsListResponseDto>) => r.body as BondsListResponseDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseInstrumentDetailControllerGetBourseInstrumentDetails()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseInstrumentDetailControllerGetBourseInstrumentDetails$Response(params: {
        id: number;
        ticker: any;
    }): Observable<StrictHttpResponse<BourseInstrumentDetailsDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseInstrumentDetailService.BourseInstrumentDetailControllerGetBourseInstrumentDetailsPath, 'get');
        if (params) {
            rb.path('id', params.id, {});
            rb.query('ticker', params.ticker, {});
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
                    return r as StrictHttpResponse<BourseInstrumentDetailsDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseInstrumentDetailControllerGetBourseInstrumentDetails$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseInstrumentDetailControllerGetBourseInstrumentDetails(params: { id: number; ticker: any }): Observable<BourseInstrumentDetailsDto> {
        return this.bourseInstrumentDetailControllerGetBourseInstrumentDetails$Response(params).pipe(
            map((r: StrictHttpResponse<BourseInstrumentDetailsDto>) => r.body as BourseInstrumentDetailsDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseInstrumentDetailControllerUpdateBourseInstrumentDetails()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseInstrumentDetailControllerUpdateBourseInstrumentDetails$Response(params: {
        body: UpdateBourseInstrumentDetailsDto;
    }): Observable<StrictHttpResponse<SentSuccessDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseInstrumentDetailService.BourseInstrumentDetailControllerUpdateBourseInstrumentDetailsPath, 'put');
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
     * To access the full response (for headers, for example), `bourseInstrumentDetailControllerUpdateBourseInstrumentDetails$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseInstrumentDetailControllerUpdateBourseInstrumentDetails(params: { body: UpdateBourseInstrumentDetailsDto }): Observable<SentSuccessDto> {
        return this.bourseInstrumentDetailControllerUpdateBourseInstrumentDetails$Response(params).pipe(
            map((r: StrictHttpResponse<SentSuccessDto>) => r.body as SentSuccessDto)
        );
    }
}
