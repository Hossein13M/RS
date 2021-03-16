/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateTradeDto } from '../models/create-trade-dto';
import { GetTradeResponseDto } from '../models/get-trade-response-dto';
import { UpdateTradeDto } from '../models/update-trade-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class TradeRegistrationService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation tradeRegistrationControllerSearchTrade
     */
    static readonly TradeRegistrationControllerSearchTradePath = '/api/v1/trade-registration';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `tradeRegistrationControllerSearchTrade()` instead.
     *
     * This method doesn't expect any request body.
     */
    tradeRegistrationControllerSearchTrade$Response(params: {
        limit: number;
        skip: number;

        /**
         * تاریخ معامله. نمونه : 23-05-2020
         */
        transactionDate?: string;

        /**
         * نوع معامله. خرید &#x3D; ۱    فروش &#x3D; ۲
         */
        tradeType?: '1' | '2';

        /**
         * ارزش معامله
         */
        value?: number;

        /**
         * حجم معامله
         */
        volume?: number;

        /**
         * قیمت معامله
         */
        price?: number;

        /**
         * توضیحات
         */
        comments?: string;
    }): Observable<StrictHttpResponse<GetTradeResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, TradeRegistrationService.TradeRegistrationControllerSearchTradePath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('transactionDate', params.transactionDate, {});
            rb.query('tradeType', params.tradeType, {});
            rb.query('value', params.value, {});
            rb.query('volume', params.volume, {});
            rb.query('price', params.price, {});
            rb.query('comments', params.comments, {});
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
                    return r as StrictHttpResponse<GetTradeResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `tradeRegistrationControllerSearchTrade$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    tradeRegistrationControllerSearchTrade(params: {
        limit: number;
        skip: number;

        /**
         * تاریخ معامله. نمونه : 23-05-2020
         */
        transactionDate?: string;

        /**
         * نوع معامله. خرید &#x3D; ۱    فروش &#x3D; ۲
         */
        tradeType?: '1' | '2';

        /**
         * ارزش معامله
         */
        value?: number;

        /**
         * حجم معامله
         */
        volume?: number;

        /**
         * قیمت معامله
         */
        price?: number;

        /**
         * توضیحات
         */
        comments?: string;
    }): Observable<GetTradeResponseDto> {
        return this.tradeRegistrationControllerSearchTrade$Response(params).pipe(
            map((r: StrictHttpResponse<GetTradeResponseDto>) => r.body as GetTradeResponseDto)
        );
    }

    /**
     * Path part for operation tradeRegistrationControllerUpdateTrade
     */
    static readonly TradeRegistrationControllerUpdateTradePath = '/api/v1/trade-registration';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `tradeRegistrationControllerUpdateTrade()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    tradeRegistrationControllerUpdateTrade$Response(params: { body: UpdateTradeDto }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, TradeRegistrationService.TradeRegistrationControllerUpdateTradePath, 'put');
        if (params) {
            rb.body(params.body, 'application/json');
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
     * To access the full response (for headers, for example), `tradeRegistrationControllerUpdateTrade$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    tradeRegistrationControllerUpdateTrade(params: { body: UpdateTradeDto }): Observable<void> {
        return this.tradeRegistrationControllerUpdateTrade$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation tradeRegistrationControllerCreateTrade
     */
    static readonly TradeRegistrationControllerCreateTradePath = '/api/v1/trade-registration';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `tradeRegistrationControllerCreateTrade()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    tradeRegistrationControllerCreateTrade$Response(params: { body: CreateTradeDto }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, TradeRegistrationService.TradeRegistrationControllerCreateTradePath, 'post');
        if (params) {
            rb.body(params.body, 'application/json');
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
     * To access the full response (for headers, for example), `tradeRegistrationControllerCreateTrade$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    tradeRegistrationControllerCreateTrade(params: { body: CreateTradeDto }): Observable<void> {
        return this.tradeRegistrationControllerCreateTrade$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation tradeRegistrationControllerDeleteTrade
     */
    static readonly TradeRegistrationControllerDeleteTradePath = '/api/v1/trade-registration/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `tradeRegistrationControllerDeleteTrade()` instead.
     *
     * This method doesn't expect any request body.
     */
    tradeRegistrationControllerDeleteTrade$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, TradeRegistrationService.TradeRegistrationControllerDeleteTradePath, 'delete');
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
     * To access the full response (for headers, for example), `tradeRegistrationControllerDeleteTrade$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    tradeRegistrationControllerDeleteTrade(params: { id: number }): Observable<void> {
        return this.tradeRegistrationControllerDeleteTrade$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
