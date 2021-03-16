/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateOrganizationTypeDto } from '../models/create-organization-type-dto';
import { OrganizationTypeDto } from '../models/organization-type-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class OrganizationTypeService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation organizationTypeControllerGetOrganizationType
     */
    static readonly OrganizationTypeControllerGetOrganizationTypePath = '/api/v1/organization-type/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organizationTypeControllerGetOrganizationType()` instead.
     *
     * This method doesn't expect any request body.
     */
    organizationTypeControllerGetOrganizationType$Response(params: { id: number }): Observable<StrictHttpResponse<OrganizationTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, OrganizationTypeService.OrganizationTypeControllerGetOrganizationTypePath, 'get');
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
                    return r as StrictHttpResponse<OrganizationTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organizationTypeControllerGetOrganizationType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    organizationTypeControllerGetOrganizationType(params: { id: number }): Observable<OrganizationTypeDto> {
        return this.organizationTypeControllerGetOrganizationType$Response(params).pipe(
            map((r: StrictHttpResponse<OrganizationTypeDto>) => r.body as OrganizationTypeDto)
        );
    }

    /**
     * Path part for operation organizationTypeControllerDeleteOrganizationType
     */
    static readonly OrganizationTypeControllerDeleteOrganizationTypePath = '/api/v1/organization-type/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organizationTypeControllerDeleteOrganizationType()` instead.
     *
     * This method doesn't expect any request body.
     */
    organizationTypeControllerDeleteOrganizationType$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, OrganizationTypeService.OrganizationTypeControllerDeleteOrganizationTypePath, 'delete');
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
     * To access the full response (for headers, for example), `organizationTypeControllerDeleteOrganizationType$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    organizationTypeControllerDeleteOrganizationType(params: { id: number }): Observable<void> {
        return this.organizationTypeControllerDeleteOrganizationType$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation organizationTypeControllerGetOrganizationTypes
     */
    static readonly OrganizationTypeControllerGetOrganizationTypesPath = '/api/v1/organization-type';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organizationTypeControllerGetOrganizationTypes()` instead.
     *
     * This method doesn't expect any request body.
     */
    organizationTypeControllerGetOrganizationTypes$Response(params?: {
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<Array<OrganizationTypeDto>>> {
        const rb = new RequestBuilder(this.rootUrl, OrganizationTypeService.OrganizationTypeControllerGetOrganizationTypesPath, 'get');
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
                    return r as StrictHttpResponse<Array<OrganizationTypeDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organizationTypeControllerGetOrganizationTypes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    organizationTypeControllerGetOrganizationTypes(params?: { searchKeyword?: any }): Observable<Array<OrganizationTypeDto>> {
        return this.organizationTypeControllerGetOrganizationTypes$Response(params).pipe(
            map((r: StrictHttpResponse<Array<OrganizationTypeDto>>) => r.body as Array<OrganizationTypeDto>)
        );
    }

    /**
     * Path part for operation organizationTypeControllerUpdateOrganizationType
     */
    static readonly OrganizationTypeControllerUpdateOrganizationTypePath = '/api/v1/organization-type';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organizationTypeControllerUpdateOrganizationType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organizationTypeControllerUpdateOrganizationType$Response(params: {
        body: OrganizationTypeDto;
    }): Observable<StrictHttpResponse<OrganizationTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, OrganizationTypeService.OrganizationTypeControllerUpdateOrganizationTypePath, 'put');
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
                    return r as StrictHttpResponse<OrganizationTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organizationTypeControllerUpdateOrganizationType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organizationTypeControllerUpdateOrganizationType(params: { body: OrganizationTypeDto }): Observable<OrganizationTypeDto> {
        return this.organizationTypeControllerUpdateOrganizationType$Response(params).pipe(
            map((r: StrictHttpResponse<OrganizationTypeDto>) => r.body as OrganizationTypeDto)
        );
    }

    /**
     * Path part for operation organizationTypeControllerCreateOrganizationType
     */
    static readonly OrganizationTypeControllerCreateOrganizationTypePath = '/api/v1/organization-type';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organizationTypeControllerCreateOrganizationType()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organizationTypeControllerCreateOrganizationType$Response(params: {
        body: CreateOrganizationTypeDto;
    }): Observable<StrictHttpResponse<OrganizationTypeDto>> {
        const rb = new RequestBuilder(this.rootUrl, OrganizationTypeService.OrganizationTypeControllerCreateOrganizationTypePath, 'post');
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
                    return r as StrictHttpResponse<OrganizationTypeDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organizationTypeControllerCreateOrganizationType$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organizationTypeControllerCreateOrganizationType(params: { body: CreateOrganizationTypeDto }): Observable<OrganizationTypeDto> {
        return this.organizationTypeControllerCreateOrganizationType$Response(params).pipe(
            map((r: StrictHttpResponse<OrganizationTypeDto>) => r.body as OrganizationTypeDto)
        );
    }
}
