/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateFundRoleDto } from '../models/create-fund-role-dto';
import { FundRoleResponseDto } from '../models/fund-role-response-dto';
import { FundRoleWithIdDto } from '../models/fund-role-with-id-dto';
import { UpdateFundRoleDto } from '../models/update-fund-role-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class FundRoleService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation fundRoleControllerGetFundRole
     */
    static readonly FundRoleControllerGetFundRolePath = '/api/v1/fund-role/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundRoleControllerGetFundRole()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRoleControllerGetFundRole$Response(params: { id: number }): Observable<StrictHttpResponse<FundRoleWithIdDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundRoleService.FundRoleControllerGetFundRolePath, 'get');
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
                    return r as StrictHttpResponse<FundRoleWithIdDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundRoleControllerGetFundRole$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRoleControllerGetFundRole(params: { id: number }): Observable<FundRoleWithIdDto> {
        return this.fundRoleControllerGetFundRole$Response(params).pipe(
            map((r: StrictHttpResponse<FundRoleWithIdDto>) => r.body as FundRoleWithIdDto)
        );
    }

    /**
     * Path part for operation fundRoleControllerDeleteFundRole
     */
    static readonly FundRoleControllerDeleteFundRolePath = '/api/v1/fund-role/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundRoleControllerDeleteFundRole()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRoleControllerDeleteFundRole$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, FundRoleService.FundRoleControllerDeleteFundRolePath, 'delete');
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
     * To access the full response (for headers, for example), `fundRoleControllerDeleteFundRole$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRoleControllerDeleteFundRole(params: { id: number }): Observable<void> {
        return this.fundRoleControllerDeleteFundRole$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }

    /**
     * Path part for operation fundRoleControllerGetFundRoles
     */
    static readonly FundRoleControllerGetFundRolesPath = '/api/v1/fund-role';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundRoleControllerGetFundRoles()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRoleControllerGetFundRoles$Response(params?: {
        name?: string;
        phone?: string;
        address?: string;
        agentName?: string;
        agentPhone?: string;
        nationalId?: string;
        regNumber?: string;

        /**
         * 2020-01-04
         */
        regDate?: Date;
        hasSupervisor?: number;
        organizationTypeName?: string;
        organizationSupervisorName?: string;
        limit?: number;
        skip?: number;
    }): Observable<StrictHttpResponse<FundRoleResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundRoleService.FundRoleControllerGetFundRolesPath, 'get');
        if (params) {
            rb.query('name', params.name, {});
            rb.query('phone', params.phone, {});
            rb.query('address', params.address, {});
            rb.query('agentName', params.agentName, {});
            rb.query('agentPhone', params.agentPhone, {});
            rb.query('nationalId', params.nationalId, {});
            rb.query('regNumber', params.regNumber, {});
            rb.query('regDate', params.regDate, {});
            rb.query('hasSupervisor', params.hasSupervisor, {});
            rb.query('organizationTypeName', params.organizationTypeName, {});
            rb.query('organizationSupervisorName', params.organizationSupervisorName, {});
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
                    return r as StrictHttpResponse<FundRoleResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundRoleControllerGetFundRoles$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    fundRoleControllerGetFundRoles(params?: {
        name?: string;
        phone?: string;
        address?: string;
        agentName?: string;
        agentPhone?: string;
        nationalId?: string;
        regNumber?: string;

        /**
         * 2020-01-04
         */
        regDate?: Date;
        hasSupervisor?: number;
        organizationTypeName?: string;
        organizationSupervisorName?: string;
        limit?: number;
        skip?: number;
    }): Observable<FundRoleResponseDto> {
        return this.fundRoleControllerGetFundRoles$Response(params).pipe(
            map((r: StrictHttpResponse<FundRoleResponseDto>) => r.body as FundRoleResponseDto)
        );
    }

    /**
     * Path part for operation fundRoleControllerUpdateFundRole
     */
    static readonly FundRoleControllerUpdateFundRolePath = '/api/v1/fund-role';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundRoleControllerUpdateFundRole()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundRoleControllerUpdateFundRole$Response(params: { body: UpdateFundRoleDto }): Observable<StrictHttpResponse<FundRoleWithIdDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundRoleService.FundRoleControllerUpdateFundRolePath, 'put');
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
                    return r as StrictHttpResponse<FundRoleWithIdDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundRoleControllerUpdateFundRole$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundRoleControllerUpdateFundRole(params: { body: UpdateFundRoleDto }): Observable<FundRoleWithIdDto> {
        return this.fundRoleControllerUpdateFundRole$Response(params).pipe(
            map((r: StrictHttpResponse<FundRoleWithIdDto>) => r.body as FundRoleWithIdDto)
        );
    }

    /**
     * Path part for operation fundRoleControllerCreateFundRole
     */
    static readonly FundRoleControllerCreateFundRolePath = '/api/v1/fund-role';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `fundRoleControllerCreateFundRole()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundRoleControllerCreateFundRole$Response(params: { body: CreateFundRoleDto }): Observable<StrictHttpResponse<FundRoleWithIdDto>> {
        const rb = new RequestBuilder(this.rootUrl, FundRoleService.FundRoleControllerCreateFundRolePath, 'post');
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
                    return r as StrictHttpResponse<FundRoleWithIdDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `fundRoleControllerCreateFundRole$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    fundRoleControllerCreateFundRole(params: { body: CreateFundRoleDto }): Observable<FundRoleWithIdDto> {
        return this.fundRoleControllerCreateFundRole$Response(params).pipe(
            map((r: StrictHttpResponse<FundRoleWithIdDto>) => r.body as FundRoleWithIdDto)
        );
    }
}
