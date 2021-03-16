/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { OperatorDto } from '../models/operator-dto';
import { OperatorInfoDto } from '../models/operator-info-dto';
import { ResponseOperatorDto } from '../models/response-operator-dto';
import { UpdateOperatorDto } from '../models/update-operator-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class OperatorService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation operatorControllerGetOperators
     */
    static readonly OperatorControllerGetOperatorsPath = '/api/v1/operator';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `operatorControllerGetOperators()` instead.
     *
     * This method doesn't expect any request body.
     */
    operatorControllerGetOperators$Response(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this firstName, lastName and email
         */
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<ResponseOperatorDto>> {
        const rb = new RequestBuilder(this.rootUrl, OperatorService.OperatorControllerGetOperatorsPath, 'get');
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
                    return r as StrictHttpResponse<ResponseOperatorDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `operatorControllerGetOperators$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    operatorControllerGetOperators(params?: {
        limit?: number;
        skip?: number;

        /**
         * Only return the items with the searchKeyword that similarly match this firstName, lastName and email
         */
        searchKeyword?: any;
    }): Observable<ResponseOperatorDto> {
        return this.operatorControllerGetOperators$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseOperatorDto>) => r.body as ResponseOperatorDto)
        );
    }

    /**
     * Path part for operation operatorControllerUpdateOperator
     */
    static readonly OperatorControllerUpdateOperatorPath = '/api/v1/operator';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `operatorControllerUpdateOperator()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    operatorControllerUpdateOperator$Response(params: { body: UpdateOperatorDto }): Observable<StrictHttpResponse<OperatorInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, OperatorService.OperatorControllerUpdateOperatorPath, 'put');
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
                    return r as StrictHttpResponse<OperatorInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `operatorControllerUpdateOperator$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    operatorControllerUpdateOperator(params: { body: UpdateOperatorDto }): Observable<OperatorInfoDto> {
        return this.operatorControllerUpdateOperator$Response(params).pipe(
            map((r: StrictHttpResponse<OperatorInfoDto>) => r.body as OperatorInfoDto)
        );
    }

    /**
     * Path part for operation operatorControllerCreateOperator
     */
    static readonly OperatorControllerCreateOperatorPath = '/api/v1/operator';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `operatorControllerCreateOperator()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    operatorControllerCreateOperator$Response(params: { body: OperatorDto }): Observable<StrictHttpResponse<OperatorInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, OperatorService.OperatorControllerCreateOperatorPath, 'post');
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
                    return r as StrictHttpResponse<OperatorInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `operatorControllerCreateOperator$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    operatorControllerCreateOperator(params: { body: OperatorDto }): Observable<OperatorInfoDto> {
        return this.operatorControllerCreateOperator$Response(params).pipe(
            map((r: StrictHttpResponse<OperatorInfoDto>) => r.body as OperatorInfoDto)
        );
    }

    /**
     * Path part for operation operatorControllerGetOperator
     */
    static readonly OperatorControllerGetOperatorPath = '/api/v1/operator/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `operatorControllerGetOperator()` instead.
     *
     * This method doesn't expect any request body.
     */
    operatorControllerGetOperator$Response(params: { id: number }): Observable<StrictHttpResponse<OperatorInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, OperatorService.OperatorControllerGetOperatorPath, 'get');
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
                    return r as StrictHttpResponse<OperatorInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `operatorControllerGetOperator$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    operatorControllerGetOperator(params: { id: number }): Observable<OperatorInfoDto> {
        return this.operatorControllerGetOperator$Response(params).pipe(
            map((r: StrictHttpResponse<OperatorInfoDto>) => r.body as OperatorInfoDto)
        );
    }

    // hossein: from here we are going to use the new approach for getting data

    getOperators(limit: number) {
        return this.http.get<any>(`${environment.serviceUrl}/api/v1/operator?limit=${limit}&skip=0`);
    }
}
