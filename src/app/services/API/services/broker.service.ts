/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateBrokerDto } from '../models/create-broker-dto';
import { GetBrokerResponseDto } from '../models/get-broker-response-dto';
import { UpdateBrokerDto } from '../models/update-broker-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class BrokerService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation brokerControllerGetBroker
     */
    static readonly BrokerControllerGetBrokerPath = '/api/v1/broker/{brokerId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `brokerControllerGetBroker()` instead.
     *
     * This method doesn't expect any request body.
     */
    brokerControllerGetBroker$Response(params: { brokerId: number }): Observable<StrictHttpResponse<GetBrokerResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BrokerService.BrokerControllerGetBrokerPath, 'get');
        if (params) {
            rb.path('brokerId', params.brokerId, {});
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
                    return r as StrictHttpResponse<GetBrokerResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `brokerControllerGetBroker$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    brokerControllerGetBroker(params: { brokerId: number }): Observable<GetBrokerResponseDto> {
        return this.brokerControllerGetBroker$Response(params).pipe(
            map((r: StrictHttpResponse<GetBrokerResponseDto>) => r.body as GetBrokerResponseDto)
        );
    }

    /**
     * Path part for operation brokerControllerDeleteBroker
     */
    static readonly BrokerControllerDeleteBrokerPath = '/api/v1/broker/{brokerId}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `brokerControllerDeleteBroker()` instead.
     *
     * This method doesn't expect any request body.
     */
    brokerControllerDeleteBroker$Response(params: { brokerId: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, BrokerService.BrokerControllerDeleteBrokerPath, 'delete');
        if (params) {
            rb.path('brokerId', params.brokerId, {});
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
     * To access the full response (for headers, for example), `brokerControllerDeleteBroker$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    brokerControllerDeleteBroker(params: { brokerId: number }): Observable<void> {
        return this.brokerControllerDeleteBroker$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation brokerControllerGetBrokers
     */
    static readonly BrokerControllerGetBrokersPath = '/api/v1/broker';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `brokerControllerGetBrokers()` instead.
     *
     * This method doesn't expect any request body.
     */
    brokerControllerGetBrokers$Response(params?: {
        name?: string;
        code?: string;
    }): Observable<StrictHttpResponse<Array<GetBrokerResponseDto>>> {
        const rb = new RequestBuilder(this.rootUrl, BrokerService.BrokerControllerGetBrokersPath, 'get');
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
                    return r as StrictHttpResponse<Array<GetBrokerResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `brokerControllerGetBrokers$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    brokerControllerGetBrokers(params?: { name?: string; code?: string }): Observable<Array<GetBrokerResponseDto>> {
        return this.brokerControllerGetBrokers$Response(params).pipe(
            map((r: StrictHttpResponse<Array<GetBrokerResponseDto>>) => r.body as Array<GetBrokerResponseDto>)
        );
    }

    /**
     * Path part for operation brokerControllerUpdateBroker
     */
    static readonly BrokerControllerUpdateBrokerPath = '/api/v1/broker';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `brokerControllerUpdateBroker()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    brokerControllerUpdateBroker$Response(params: { body: UpdateBrokerDto }): Observable<StrictHttpResponse<GetBrokerResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BrokerService.BrokerControllerUpdateBrokerPath, 'put');
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
                    return r as StrictHttpResponse<GetBrokerResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `brokerControllerUpdateBroker$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    brokerControllerUpdateBroker(params: { body: UpdateBrokerDto }): Observable<GetBrokerResponseDto> {
        return this.brokerControllerUpdateBroker$Response(params).pipe(
            map((r: StrictHttpResponse<GetBrokerResponseDto>) => r.body as GetBrokerResponseDto)
        );
    }

    /**
     * Path part for operation brokerControllerCreateBroker
     */
    static readonly BrokerControllerCreateBrokerPath = '/api/v1/broker';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `brokerControllerCreateBroker()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    brokerControllerCreateBroker$Response(params: { body: CreateBrokerDto }): Observable<StrictHttpResponse<GetBrokerResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, BrokerService.BrokerControllerCreateBrokerPath, 'post');
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
                    return r as StrictHttpResponse<GetBrokerResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `brokerControllerCreateBroker$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    brokerControllerCreateBroker(params: { body: CreateBrokerDto }): Observable<GetBrokerResponseDto> {
        return this.brokerControllerCreateBroker$Response(params).pipe(
            map((r: StrictHttpResponse<GetBrokerResponseDto>) => r.body as GetBrokerResponseDto)
        );
    }
}
