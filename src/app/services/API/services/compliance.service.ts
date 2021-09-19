/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { Compliance } from '../../../modules/compliance/compliance.model';
import { ComplianceResponseDto } from '../models/compliance-response-dto';
import { CreateComplianceDto } from '../models/create-compliance-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class ComplianceService extends BaseService {
    /**
     * Path part for operation complianceControllerGetCompliance
     */
    static readonly ComplianceControllerGetCompliancePath = '/api/v1/compliance/{id}';
    /**
     * Path part for operation complianceControllerDeleteCompliance
     */
    static readonly ComplianceControllerDeleteCompliancePath = '/api/v1/compliance/{id}';
    /**
     * Path part for operation complianceControllerGetCompliances
     */
    static readonly ComplianceControllerGetCompliancesPath = '/api/v1/compliance';
    /**
     * Path part for operation complianceControllerUpdateCompliance
     */
    static readonly ComplianceControllerUpdateCompliancePath = '/api/v1/compliance';
    /**
     * Path part for operation complianceControllerCreateCompliance
     */
    static readonly ComplianceControllerCreateCompliancePath = '/api/v1/compliance';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceControllerGetCompliance()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceControllerGetCompliance$Response(params: { id: number }): Observable<StrictHttpResponse<Compliance>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceService.ComplianceControllerGetCompliancePath, 'get');
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
                    return r as StrictHttpResponse<Compliance>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceControllerGetCompliance$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceControllerGetCompliance(params: { id: number }): Observable<Compliance> {
        return this.complianceControllerGetCompliance$Response(params).pipe(map((r: StrictHttpResponse<Compliance>) => r.body as Compliance));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceControllerDeleteCompliance()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceControllerDeleteCompliance$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceService.ComplianceControllerDeleteCompliancePath, 'delete');
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
     * To access the full response (for headers, for example), `complianceControllerDeleteCompliance$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceControllerDeleteCompliance(params: { id: number }): Observable<void> {
        return this.complianceControllerDeleteCompliance$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceControllerGetCompliances()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceControllerGetCompliances$Response(params?: {
        limit?: number;
        skip?: number;
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<ComplianceResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceService.ComplianceControllerGetCompliancesPath, 'get');
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
                    return r as StrictHttpResponse<ComplianceResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceControllerGetCompliances$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    complianceControllerGetCompliances(params?: { limit?: number; skip?: number; searchKeyword?: any }): Observable<ComplianceResponseDto> {
        return this.complianceControllerGetCompliances$Response(params).pipe(
            map((r: StrictHttpResponse<ComplianceResponseDto>) => r.body as ComplianceResponseDto)
        );
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceControllerUpdateCompliance()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceControllerUpdateCompliance$Response(params: { body: Compliance }): Observable<StrictHttpResponse<Compliance>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceService.ComplianceControllerUpdateCompliancePath, 'put');
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
                    return r as StrictHttpResponse<Compliance>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceControllerUpdateCompliance$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceControllerUpdateCompliance(params: { body: Compliance }): Observable<Compliance> {
        return this.complianceControllerUpdateCompliance$Response(params).pipe(map((r: StrictHttpResponse<Compliance>) => r.body as Compliance));
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `complianceControllerCreateCompliance()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceControllerCreateCompliance$Response(params: { body: CreateComplianceDto }): Observable<StrictHttpResponse<Compliance>> {
        const rb = new RequestBuilder(this.rootUrl, ComplianceService.ComplianceControllerCreateCompliancePath, 'post');
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
                    return r as StrictHttpResponse<Compliance>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `complianceControllerCreateCompliance$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    complianceControllerCreateCompliance(params: { body: CreateComplianceDto }): Observable<Compliance> {
        return this.complianceControllerCreateCompliance$Response(params).pipe(map((r: StrictHttpResponse<Compliance>) => r.body as Compliance));
    }
}
