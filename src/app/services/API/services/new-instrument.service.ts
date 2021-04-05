/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateNewInstrumentDto } from '../models/create-new-instrument-dto';
import { NewInstrumentDto } from '../models/new-instrument-dto';
import { NewInstrumentListResponseDto } from '../models/new-instrument-list-response-dto';
import { SentSuccessDto } from '../models/sent-success-dto';
import { UpdateNewInstrumentDto } from '../models/update-new-instrument-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class NewInstrumentService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation newInstrumentControllerGetNewInstruments
     */
    static readonly NewInstrumentControllerGetNewInstrumentsPath = '/api/v1/new-instrument';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `newInstrumentControllerGetNewInstruments()` instead.
     *
     * This method doesn't expect any request body.
     */
    newInstrumentControllerGetNewInstruments$Response(params?: {
        ticker?: string;
        type?: number;
        symbol?: string;
        symbolEn?: string;
        name?: string;
        nameEn?: string;
        isInBourse?: boolean;
        isActive?: boolean;
        boardName?: string;
        marketName?: string;
        limit?: number;
        skip?: number;
    }): Observable<StrictHttpResponse<NewInstrumentListResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, NewInstrumentService.NewInstrumentControllerGetNewInstrumentsPath, 'get');
        if (params) {
            rb.query('ticker', params.ticker, {});
            rb.query('type', params.type, {});
            rb.query('symbol', params.symbol, {});
            rb.query('symbolEn', params.symbolEn, {});
            rb.query('name', params.name, {});
            rb.query('nameEn', params.nameEn, {});
            rb.query('isInBourse', params.isInBourse, {});
            rb.query('isActive', params.isActive, {});
            rb.query('boardName', params.boardName, {});
            rb.query('marketName', params.marketName, {});
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
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
                    return r as StrictHttpResponse<NewInstrumentListResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `newInstrumentControllerGetNewInstruments$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    newInstrumentControllerGetNewInstruments(params?: {
        ticker?: string;
        type?: number;
        symbol?: string;
        symbolEn?: string;
        name?: string;
        nameEn?: string;
        isInBourse?: boolean;
        isActive?: boolean;
        boardName?: string;
        marketName?: string;
        limit?: number;
        skip?: number;
    }): Observable<NewInstrumentListResponseDto> {
        return this.newInstrumentControllerGetNewInstruments$Response(params).pipe(
            map((r: StrictHttpResponse<NewInstrumentListResponseDto>) => r.body as NewInstrumentListResponseDto)
        );
    }

    /**
     * Path part for operation newInstrumentControllerUpdateNewInstrument
     */
    static readonly NewInstrumentControllerUpdateNewInstrumentPath = '/api/v1/new-instrument';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `newInstrumentControllerUpdateNewInstrument()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    newInstrumentControllerUpdateNewInstrument$Response(params: { body: UpdateNewInstrumentDto }): Observable<StrictHttpResponse<SentSuccessDto>> {
        const rb = new RequestBuilder(this.rootUrl, NewInstrumentService.NewInstrumentControllerUpdateNewInstrumentPath, 'put');
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
     * To access the full response (for headers, for example), `newInstrumentControllerUpdateNewInstrument$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    newInstrumentControllerUpdateNewInstrument(params: { body: UpdateNewInstrumentDto }): Observable<SentSuccessDto> {
        return this.newInstrumentControllerUpdateNewInstrument$Response(params).pipe(
            map((r: StrictHttpResponse<SentSuccessDto>) => r.body as SentSuccessDto)
        );
    }

    /**
     * Path part for operation newInstrumentControllerCreateNewInstrument
     */
    static readonly NewInstrumentControllerCreateNewInstrumentPath = '/api/v1/new-instrument';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `newInstrumentControllerCreateNewInstrument()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    newInstrumentControllerCreateNewInstrument$Response(params: { body: CreateNewInstrumentDto }): Observable<StrictHttpResponse<NewInstrumentDto>> {
        const rb = new RequestBuilder(this.rootUrl, NewInstrumentService.NewInstrumentControllerCreateNewInstrumentPath, 'post');
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
                    return r as StrictHttpResponse<NewInstrumentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `newInstrumentControllerCreateNewInstrument$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    newInstrumentControllerCreateNewInstrument(params: { body: CreateNewInstrumentDto }): Observable<NewInstrumentDto> {
        return this.newInstrumentControllerCreateNewInstrument$Response(params).pipe(
            map((r: StrictHttpResponse<NewInstrumentDto>) => r.body as NewInstrumentDto)
        );
    }

    /**
     * Path part for operation newInstrumentControllerGetNewInstrument
     */
    static readonly NewInstrumentControllerGetNewInstrumentPath = '/api/v1/new-instrument/{ticker}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `newInstrumentControllerGetNewInstrument()` instead.
     *
     * This method doesn't expect any request body.
     */
    newInstrumentControllerGetNewInstrument$Response(params: {
        ticker: string;
        isInBourse: boolean;
    }): Observable<StrictHttpResponse<NewInstrumentDto>> {
        const rb = new RequestBuilder(this.rootUrl, NewInstrumentService.NewInstrumentControllerGetNewInstrumentPath, 'get');
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
                    return r as StrictHttpResponse<NewInstrumentDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `newInstrumentControllerGetNewInstrument$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    newInstrumentControllerGetNewInstrument(params: { ticker: string; isInBourse: boolean }): Observable<NewInstrumentDto> {
        return this.newInstrumentControllerGetNewInstrument$Response(params).pipe(
            map((r: StrictHttpResponse<NewInstrumentDto>) => r.body as NewInstrumentDto)
        );
    }

    /**
     * Path part for operation newInstrumentControllerDeleteMarket
     */
    static readonly NewInstrumentControllerDeleteMarketPath = '/api/v1/new-instrument/{ticker}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `newInstrumentControllerDeleteMarket()` instead.
     *
     * This method doesn't expect any request body.
     */
    newInstrumentControllerDeleteMarket$Response(params: { ticker: string; isInBourse: boolean }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, NewInstrumentService.NewInstrumentControllerDeleteMarketPath, 'delete');
        if (params) {
            rb.path('ticker', params.ticker, {});
            rb.query('isInBourse', params.isInBourse, {});
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
     * To access the full response (for headers, for example), `newInstrumentControllerDeleteMarket$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    newInstrumentControllerDeleteMarket(params: { ticker: string; isInBourse: boolean }): Observable<void> {
        return this.newInstrumentControllerDeleteMarket$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
