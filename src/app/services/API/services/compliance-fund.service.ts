/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateComplianceFundDto } from '../models/create-compliance-fund-dto';
import { ResponseComplianceFundDto } from '../models/response-compliance-fund-dto';
import { UpdateComplianceFundDto } from '../models/update-compliance-fund-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class ComplianceFundService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation complianceFundControllerGetComplianceFund
     */
    static readonly ComplianceFundControllerGetComplianceFundPath = '/api/v1/compliance-fund/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceFundControllerGetComplianceFund()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceFundControllerGetComplianceFund$Response(params: { id: number }): Observable<StrictHttpResponse<ResponseComplianceFundDto>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceFundService.ComplianceFundControllerGetComplianceFundPath, 'get');
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
                    return r as StrictHttpResponse<ResponseComplianceFundDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceFundControllerGetComplianceFund$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceFundControllerGetComplianceFund(params: { id: number }): Observable<ResponseComplianceFundDto> {
        return this.complianceFundControllerGetComplianceFund$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseComplianceFundDto>) => r.body as ResponseComplianceFundDto)
        );
    }

    /**
     * Path part for operation complianceFundControllerDeleteComplianceFund
     */
    static readonly ComplianceFundControllerDeleteComplianceFundPath = '/api/v1/compliance-fund/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceFundControllerDeleteComplianceFund()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceFundControllerDeleteComplianceFund$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceFundService.ComplianceFundControllerDeleteComplianceFundPath, 'delete');
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
     * To access the full response (for headers, for example), `complianceFundControllerDeleteComplianceFund$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceFundControllerDeleteComplianceFund(params: { id: number }): Observable<void> {
        return this.complianceFundControllerDeleteComplianceFund$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation complianceFundControllerGetComplianceFunds
     */
    static readonly ComplianceFundControllerGetComplianceFundsPath = '/api/v1/compliance-fund';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceFundControllerGetComplianceFunds()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceFundControllerGetComplianceFunds$Response(params?: {
        complianceId?: number;
    }): Observable<StrictHttpResponse<Array<ResponseComplianceFundDto>>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceFundService.ComplianceFundControllerGetComplianceFundsPath, 'get');
        if (params) {
            rb.query('complianceId', params.complianceId, {});
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
                    return r as StrictHttpResponse<Array<ResponseComplianceFundDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceFundControllerGetComplianceFunds$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceFundControllerGetComplianceFunds(params?: { complianceId?: number }): Observable<Array<ResponseComplianceFundDto>> {
        return this.complianceFundControllerGetComplianceFunds$Response(params).pipe(
            map((r: StrictHttpResponse<Array<ResponseComplianceFundDto>>) => r.body as Array<ResponseComplianceFundDto>)
        );
    }

    /**
     * Path part for operation complianceFundControllerUpdateComplianceFund
     */
    static readonly ComplianceFundControllerUpdateComplianceFundPath = '/api/v1/compliance-fund';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceFundControllerUpdateComplianceFund()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceFundControllerUpdateComplianceFund$Response(params: {
        body: UpdateComplianceFundDto;
    }): Observable<StrictHttpResponse<ResponseComplianceFundDto>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceFundService.ComplianceFundControllerUpdateComplianceFundPath, 'put');
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
                    return r as StrictHttpResponse<ResponseComplianceFundDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceFundControllerUpdateComplianceFund$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceFundControllerUpdateComplianceFund(params: { body: UpdateComplianceFundDto }): Observable<ResponseComplianceFundDto> {
        return this.complianceFundControllerUpdateComplianceFund$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseComplianceFundDto>) => r.body as ResponseComplianceFundDto)
        );
    }

    /**
     * Path part for operation complianceFundControllerCreateComplianceFund
     */
    static readonly ComplianceFundControllerCreateComplianceFundPath = '/api/v1/compliance-fund';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceFundControllerCreateComplianceFund()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceFundControllerCreateComplianceFund$Response(params: {
        body: CreateComplianceFundDto;
    }): Observable<StrictHttpResponse<ResponseComplianceFundDto>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceFundService.ComplianceFundControllerCreateComplianceFundPath, 'post');
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
                    return r as StrictHttpResponse<ResponseComplianceFundDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceFundControllerCreateComplianceFund$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceFundControllerCreateComplianceFund(params: { body: CreateComplianceFundDto }): Observable<ResponseComplianceFundDto> {
        return this.complianceFundControllerCreateComplianceFund$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseComplianceFundDto>) => r.body as ResponseComplianceFundDto)
        );
    }
}
