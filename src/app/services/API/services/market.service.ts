/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateMarketDto } from '../models/create-market-dto';
import { GetMarketDto } from '../models/get-market-dto';
import { MarketResponseDto } from '../models/market-response-dto';
import { UpdateMarketDto } from '../models/update-market-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class MarketService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation marketControllerGetMarket
     */
    static readonly MarketControllerGetMarketPath = '/api/v1/market/{marketId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `marketControllerGetMarket()` instead.
     *
     * This method doesn't expect any request body.
     */
    marketControllerGetMarket$Response(params: { marketId: number }): Observable<StrictHttpResponse<GetMarketDto>> {
        const rb = new RequestBuilder(this.rootUrl, MarketService.MarketControllerGetMarketPath, 'get');
        if (params) {
            rb.path('marketId', params.marketId, {});
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
                    return r as StrictHttpResponse<GetMarketDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `marketControllerGetMarket$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    marketControllerGetMarket(params: { marketId: number }): Observable<GetMarketDto> {
        return this.marketControllerGetMarket$Response(params).pipe(map((r: StrictHttpResponse<GetMarketDto>) => r.body as GetMarketDto));
    }

    /**
     * Path part for operation marketControllerDeleteMarket
     */
    static readonly MarketControllerDeleteMarketPath = '/api/v1/market/{marketId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `marketControllerDeleteMarket()` instead.
     *
     * This method doesn't expect any request body.
     */
    marketControllerDeleteMarket$Response(params: { marketId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, MarketService.MarketControllerDeleteMarketPath, 'delete');
        if (params) {
            rb.path('marketId', params.marketId, {});
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
     * To access the full response (for headers, for example), `marketControllerDeleteMarket$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    marketControllerDeleteMarket(params: { marketId: number }): Observable<void> {
        return this.marketControllerDeleteMarket$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation marketControllerGetMarkets
     */
    static readonly MarketControllerGetMarketsPath = '/api/v1/market';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `marketControllerGetMarkets()` instead.
     *
     * This method doesn't expect any request body.
     */
    marketControllerGetMarkets$Response(params?: {
        organizationType?: string;
        bourseCode?: string;
        nationalId?: string;
        pamCode?: string;
        apiActive?: boolean;
        symbolORFundTitle?: string;
        isBOC?: number;
        brokerName?: string;
        limit?: number;
        skip?: number;
    }): Observable<StrictHttpResponse<MarketResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, MarketService.MarketControllerGetMarketsPath, 'get');
        if (params) {
            rb.query('organizationType', params.organizationType, {});
            rb.query('bourseCode', params.bourseCode, {});
            rb.query('nationalId', params.nationalId, {});
            rb.query('pamCode', params.pamCode, {});
            rb.query('apiActive', params.apiActive, {});
            rb.query('symbolORFundTitle', params.symbolORFundTitle, {});
            rb.query('isBOC', params.isBOC, {});
            rb.query('brokerName', params.brokerName, {});
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
                    return r as StrictHttpResponse<MarketResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `marketControllerGetMarkets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    marketControllerGetMarkets(params?: {
        organizationType?: string;
        bourseCode?: string;
        nationalId?: string;
        pamCode?: string;
        apiActive?: boolean;
        symbolORFundTitle?: string;
        isBOC?: number;
        brokerName?: string;
        limit?: number;
        skip?: number;
    }): Observable<MarketResponseDto> {
        return this.marketControllerGetMarkets$Response(params).pipe(
            map((r: StrictHttpResponse<MarketResponseDto>) => r.body as MarketResponseDto)
        );
    }

    /**
     * Path part for operation marketControllerUpdateMarket
     */
    static readonly MarketControllerUpdateMarketPath = '/api/v1/market';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `marketControllerUpdateMarket()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    marketControllerUpdateMarket$Response(params: { body: UpdateMarketDto }): Observable<StrictHttpResponse<GetMarketDto>> {
        const rb = new RequestBuilder(this.rootUrl, MarketService.MarketControllerUpdateMarketPath, 'put');
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
                    return r as StrictHttpResponse<GetMarketDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `marketControllerUpdateMarket$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    marketControllerUpdateMarket(params: { body: UpdateMarketDto }): Observable<GetMarketDto> {
        return this.marketControllerUpdateMarket$Response(params).pipe(
            map((r: StrictHttpResponse<GetMarketDto>) => r.body as GetMarketDto)
        );
    }

    /**
     * Path part for operation marketControllerCreateMarket
     */
    static readonly MarketControllerCreateMarketPath = '/api/v1/market';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `marketControllerCreateMarket()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    marketControllerCreateMarket$Response(params: { body: CreateMarketDto }): Observable<StrictHttpResponse<GetMarketDto>> {
        const rb = new RequestBuilder(this.rootUrl, MarketService.MarketControllerCreateMarketPath, 'post');
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
                    return r as StrictHttpResponse<GetMarketDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `marketControllerCreateMarket$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    marketControllerCreateMarket(params: { body: CreateMarketDto }): Observable<GetMarketDto> {
        return this.marketControllerCreateMarket$Response(params).pipe(
            map((r: StrictHttpResponse<GetMarketDto>) => r.body as GetMarketDto)
        );
    }
}
