/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateRiskShieldModuleDto } from '../models/create-risk-shield-module-dto';
import { RiskShieldModuleDto } from '../models/risk-shield-module-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class RiskShieldModuleService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation riskShieldModuleControllerGetRiskShieldModules
     */
    static readonly RiskShieldModuleControllerGetRiskShieldModulesPath = '/api/v1/risk-shield-module';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `riskShieldModuleControllerGetRiskShieldModules()` instead.
     *
     * This method doesn't expect any request body.
     */
    riskShieldModuleControllerGetRiskShieldModules$Response(params?: {
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<Array<RiskShieldModuleDto>>> {
        const rb = new RequestBuilder(this.rootUrl, RiskShieldModuleService.RiskShieldModuleControllerGetRiskShieldModulesPath, 'get');
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
                    return r as StrictHttpResponse<Array<RiskShieldModuleDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `riskShieldModuleControllerGetRiskShieldModules$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    riskShieldModuleControllerGetRiskShieldModules(params?: { searchKeyword?: any }): Observable<Array<RiskShieldModuleDto>> {
        return this.riskShieldModuleControllerGetRiskShieldModules$Response(params).pipe(
            map((r: StrictHttpResponse<Array<RiskShieldModuleDto>>) => r.body as Array<RiskShieldModuleDto>)
        );
    }

    /**
     * Path part for operation riskShieldModuleControllerUpdateRiskShieldModule
     */
    static readonly RiskShieldModuleControllerUpdateRiskShieldModulePath = '/api/v1/risk-shield-module';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `riskShieldModuleControllerUpdateRiskShieldModule()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    riskShieldModuleControllerUpdateRiskShieldModule$Response(params: {
        body: RiskShieldModuleDto;
    }): Observable<StrictHttpResponse<RiskShieldModuleDto>> {
        const rb = new RequestBuilder(this.rootUrl, RiskShieldModuleService.RiskShieldModuleControllerUpdateRiskShieldModulePath, 'put');
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
                    return r as StrictHttpResponse<RiskShieldModuleDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `riskShieldModuleControllerUpdateRiskShieldModule$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    riskShieldModuleControllerUpdateRiskShieldModule(params: { body: RiskShieldModuleDto }): Observable<RiskShieldModuleDto> {
        return this.riskShieldModuleControllerUpdateRiskShieldModule$Response(params).pipe(
            map((r: StrictHttpResponse<RiskShieldModuleDto>) => r.body as RiskShieldModuleDto)
        );
    }

    /**
     * Path part for operation riskShieldModuleControllerCreateRiskShieldModule
     */
    static readonly RiskShieldModuleControllerCreateRiskShieldModulePath = '/api/v1/risk-shield-module';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `riskShieldModuleControllerCreateRiskShieldModule()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    riskShieldModuleControllerCreateRiskShieldModule$Response(params: {
        body: CreateRiskShieldModuleDto;
    }): Observable<StrictHttpResponse<RiskShieldModuleDto>> {
        const rb = new RequestBuilder(this.rootUrl, RiskShieldModuleService.RiskShieldModuleControllerCreateRiskShieldModulePath, 'post');
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
                    return r as StrictHttpResponse<RiskShieldModuleDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `riskShieldModuleControllerCreateRiskShieldModule$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    riskShieldModuleControllerCreateRiskShieldModule(params: { body: CreateRiskShieldModuleDto }): Observable<RiskShieldModuleDto> {
        return this.riskShieldModuleControllerCreateRiskShieldModule$Response(params).pipe(
            map((r: StrictHttpResponse<RiskShieldModuleDto>) => r.body as RiskShieldModuleDto)
        );
    }
}
