/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { BourseMarketDto } from '../models/bourse-market-dto';
import { CreateBourseMarketDto } from '../models/create-bourse-market-dto';
import { UpdateBourseMarketDto } from '../models/update-bourse-market-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class BourseMarketService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation bourseMarketControllerGetBourseMarket
     */
    static readonly BourseMarketControllerGetBourseMarketPath = '/api/v1/bourse-market/{bourseMarketId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseMarketControllerGetBourseMarket()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseMarketControllerGetBourseMarket$Response(params: { bourseMarketId: number }): Observable<StrictHttpResponse<BourseMarketDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseMarketService.BourseMarketControllerGetBourseMarketPath, 'get');
        if (params) {
            rb.path('bourseMarketId', params.bourseMarketId, {});
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
                    return r as StrictHttpResponse<BourseMarketDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseMarketControllerGetBourseMarket$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseMarketControllerGetBourseMarket(params: { bourseMarketId: number }): Observable<BourseMarketDto> {
        return this.bourseMarketControllerGetBourseMarket$Response(params).pipe(
            map((r: StrictHttpResponse<BourseMarketDto>) => r.body as BourseMarketDto)
        );
    }

    /**
     * Path part for operation bourseMarketControllerDeleteBourseMarket
     */
    static readonly BourseMarketControllerDeleteBourseMarketPath = '/api/v1/bourse-market/{bourseMarketId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseMarketControllerDeleteBourseMarket()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseMarketControllerDeleteBourseMarket$Response(params: { bourseMarketId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BourseMarketService.BourseMarketControllerDeleteBourseMarketPath, 'delete');
        if (params) {
            rb.path('bourseMarketId', params.bourseMarketId, {});
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
     * To access the full response (for headers, for example), `bourseMarketControllerDeleteBourseMarket$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseMarketControllerDeleteBourseMarket(params: { bourseMarketId: number }): Observable<void> {
        return this.bourseMarketControllerDeleteBourseMarket$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation bourseMarketControllerGetBourseMarkets
     */
    static readonly BourseMarketControllerGetBourseMarketsPath = '/api/v1/bourse-market';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseMarketControllerGetBourseMarkets()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseMarketControllerGetBourseMarkets$Response(params?: {
        name?: string;
        code?: number;
    }): Observable<StrictHttpResponse<Array<BourseMarketDto>>> {
        const rb = new RequestBuilder(this.rootUrl, BourseMarketService.BourseMarketControllerGetBourseMarketsPath, 'get');
        if (params) {
            rb.query('name', params.name, {});
            rb.query('code', params.code, {});
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
                    return r as StrictHttpResponse<Array<BourseMarketDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseMarketControllerGetBourseMarkets$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    bourseMarketControllerGetBourseMarkets(params?: { name?: string; code?: number }): Observable<Array<BourseMarketDto>> {
        return this.bourseMarketControllerGetBourseMarkets$Response(params).pipe(
            map((r: StrictHttpResponse<Array<BourseMarketDto>>) => r.body as Array<BourseMarketDto>)
        );
    }

    /**
     * Path part for operation bourseMarketControllerUpdateBourseMarket
     */
    static readonly BourseMarketControllerUpdateBourseMarketPath = '/api/v1/bourse-market';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseMarketControllerUpdateBourseMarket()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseMarketControllerUpdateBourseMarket$Response(params: {
        body: UpdateBourseMarketDto;
    }): Observable<StrictHttpResponse<UpdateBourseMarketDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseMarketService.BourseMarketControllerUpdateBourseMarketPath, 'put');
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
                    return r as StrictHttpResponse<UpdateBourseMarketDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseMarketControllerUpdateBourseMarket$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseMarketControllerUpdateBourseMarket(params: { body: UpdateBourseMarketDto }): Observable<UpdateBourseMarketDto> {
        return this.bourseMarketControllerUpdateBourseMarket$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateBourseMarketDto>) => r.body as UpdateBourseMarketDto)
        );
    }

    /**
     * Path part for operation bourseMarketControllerCreateBourseMarket
     */
    static readonly BourseMarketControllerCreateBourseMarketPath = '/api/v1/bourse-market';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `bourseMarketControllerCreateBourseMarket()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseMarketControllerCreateBourseMarket$Response(params: {
        body: CreateBourseMarketDto;
    }): Observable<StrictHttpResponse<UpdateBourseMarketDto>> {
        const rb = new RequestBuilder(this.rootUrl, BourseMarketService.BourseMarketControllerCreateBourseMarketPath, 'post');
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
                    return r as StrictHttpResponse<UpdateBourseMarketDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `bourseMarketControllerCreateBourseMarket$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    bourseMarketControllerCreateBourseMarket(params: { body: CreateBourseMarketDto }): Observable<UpdateBourseMarketDto> {
        return this.bourseMarketControllerCreateBourseMarket$Response(params).pipe(
            map((r: StrictHttpResponse<UpdateBourseMarketDto>) => r.body as UpdateBourseMarketDto)
        );
    }
}
