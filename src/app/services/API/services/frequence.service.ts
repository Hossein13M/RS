/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFrequenceDto } from '../models/create-frequence-dto';
import { FrequenceDto } from '../models/frequence-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FrequenceService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation frequenceControllerGetFrequence
     */
    static readonly FrequenceControllerGetFrequencePath = '/api/v1/frequence/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `frequenceControllerGetFrequence()` instead.
     *
     * This method doesn't expect any request body.
     */
    frequenceControllerGetFrequence$Response(params: { id: number }): Observable<StrictHttpResponse<FrequenceDto>> {
        const rb = new RequestBuilder(this.rootUrl, FrequenceService.FrequenceControllerGetFrequencePath, 'get');
        if (params) {
            rb.path('id', params.id, {});
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
                    return r as StrictHttpResponse<FrequenceDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `frequenceControllerGetFrequence$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    frequenceControllerGetFrequence(params: { id: number }): Observable<FrequenceDto> {
        return this.frequenceControllerGetFrequence$Response(params).pipe(
            map((r: StrictHttpResponse<FrequenceDto>) => r.body as FrequenceDto)
        );
    }

    /**
     * Path part for operation frequenceControllerDeleteFrequence
     */
    static readonly FrequenceControllerDeleteFrequencePath = '/api/v1/frequence/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `frequenceControllerDeleteFrequence()` instead.
     *
     * This method doesn't expect any request body.
     */
    frequenceControllerDeleteFrequence$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, FrequenceService.FrequenceControllerDeleteFrequencePath, 'delete');
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
     * To access the full response (for headers, for example), `frequenceControllerDeleteFrequence$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    frequenceControllerDeleteFrequence(params: { id: number }): Observable<void> {
        return this.frequenceControllerDeleteFrequence$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation frequenceControllerGetFrequences
     */
    static readonly FrequenceControllerGetFrequencesPath = '/api/v1/frequence';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `frequenceControllerGetFrequences()` instead.
     *
     * This method doesn't expect any request body.
     */
    frequenceControllerGetFrequences$Response(params?: { searchKeyword?: any }): Observable<StrictHttpResponse<Array<FrequenceDto>>> {
        const rb = new RequestBuilder(this.rootUrl, FrequenceService.FrequenceControllerGetFrequencesPath, 'get');
        if (params) {
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
                    return r as StrictHttpResponse<Array<FrequenceDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `frequenceControllerGetFrequences$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    frequenceControllerGetFrequences(params?: { searchKeyword?: any }): Observable<Array<FrequenceDto>> {
        return this.frequenceControllerGetFrequences$Response(params).pipe(
            map((r: StrictHttpResponse<Array<FrequenceDto>>) => r.body as Array<FrequenceDto>)
        );
    }

    /**
     * Path part for operation frequenceControllerUpdateFrequence
     */
    static readonly FrequenceControllerUpdateFrequencePath = '/api/v1/frequence';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `frequenceControllerUpdateFrequence()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    frequenceControllerUpdateFrequence$Response(params: { body: FrequenceDto }): Observable<StrictHttpResponse<FrequenceDto>> {
        const rb = new RequestBuilder(this.rootUrl, FrequenceService.FrequenceControllerUpdateFrequencePath, 'put');
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
                    return r as StrictHttpResponse<FrequenceDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `frequenceControllerUpdateFrequence$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    frequenceControllerUpdateFrequence(params: { body: FrequenceDto }): Observable<FrequenceDto> {
        return this.frequenceControllerUpdateFrequence$Response(params).pipe(
            map((r: StrictHttpResponse<FrequenceDto>) => r.body as FrequenceDto)
        );
    }

    /**
     * Path part for operation frequenceControllerCreateFrequence
     */
    static readonly FrequenceControllerCreateFrequencePath = '/api/v1/frequence';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `frequenceControllerCreateFrequence()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    frequenceControllerCreateFrequence$Response(params: { body: CreateFrequenceDto }): Observable<StrictHttpResponse<FrequenceDto>> {
        const rb = new RequestBuilder(this.rootUrl, FrequenceService.FrequenceControllerCreateFrequencePath, 'post');
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
                    return r as StrictHttpResponse<FrequenceDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `frequenceControllerCreateFrequence$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    frequenceControllerCreateFrequence(params: { body: CreateFrequenceDto }): Observable<FrequenceDto> {
        return this.frequenceControllerCreateFrequence$Response(params).pipe(
            map((r: StrictHttpResponse<FrequenceDto>) => r.body as FrequenceDto)
        );
    }
}
