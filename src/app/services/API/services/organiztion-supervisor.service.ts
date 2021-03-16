/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateOrganiztionSupervisorDto } from '../models/create-organiztion-supervisor-dto';
import { OrganiztionSupervisorDto } from '../models/organiztion-supervisor-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';


@Injectable({
    providedIn: 'root',
})
export class OrganiztionSupervisorService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation organiztionSupervisorControllerGetOrganiztionSupervisor
     */
    static readonly OrganiztionSupervisorControllerGetOrganiztionSupervisorPath = '/api/v1/organization-supervisor/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organiztionSupervisorControllerGetOrganiztionSupervisor()` instead.
     *
     * This method doesn't expect any request body.
     */
    organiztionSupervisorControllerGetOrganiztionSupervisor$Response(params: {
        id: number;
    }): Observable<StrictHttpResponse<OrganiztionSupervisorDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            OrganiztionSupervisorService.OrganiztionSupervisorControllerGetOrganiztionSupervisorPath,
            'get'
        );
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
                    return r as StrictHttpResponse<OrganiztionSupervisorDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organiztionSupervisorControllerGetOrganiztionSupervisor$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    organiztionSupervisorControllerGetOrganiztionSupervisor(params: { id: number }): Observable<OrganiztionSupervisorDto> {
        return this.organiztionSupervisorControllerGetOrganiztionSupervisor$Response(params).pipe(
            map((r: StrictHttpResponse<OrganiztionSupervisorDto>) => r.body as OrganiztionSupervisorDto)
        );
    }

    /**
     * Path part for operation organiztionSupervisorControllerDeleteOrganiztionSupervisor
     */
    static readonly OrganiztionSupervisorControllerDeleteOrganiztionSupervisorPath = '/api/v1/organization-supervisor/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organiztionSupervisorControllerDeleteOrganiztionSupervisor()` instead.
     *
     * This method doesn't expect any request body.
     */
    organiztionSupervisorControllerDeleteOrganiztionSupervisor$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            OrganiztionSupervisorService.OrganiztionSupervisorControllerDeleteOrganiztionSupervisorPath,
            'delete'
        );
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
     * To access the full response (for headers, for example), `organiztionSupervisorControllerDeleteOrganiztionSupervisor$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    organiztionSupervisorControllerDeleteOrganiztionSupervisor(params: { id: number }): Observable<void> {
        return this.organiztionSupervisorControllerDeleteOrganiztionSupervisor$Response(params).pipe(
            map((r: StrictHttpResponse<void>) => r.body as void)
        );
    }

    /**
     * Path part for operation organiztionSupervisorControllerGetOrganiztionSupervisors
     */
    static readonly OrganiztionSupervisorControllerGetOrganiztionSupervisorsPath = '/api/v1/organization-supervisor';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organiztionSupervisorControllerGetOrganiztionSupervisors()` instead.
     *
     * This method doesn't expect any request body.
     */
    organiztionSupervisorControllerGetOrganiztionSupervisors$Response(params?: {
        searchKeyword?: any;
    }): Observable<StrictHttpResponse<Array<OrganiztionSupervisorDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            OrganiztionSupervisorService.OrganiztionSupervisorControllerGetOrganiztionSupervisorsPath,
            'get'
        );
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
                    return r as StrictHttpResponse<Array<OrganiztionSupervisorDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organiztionSupervisorControllerGetOrganiztionSupervisors$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    organiztionSupervisorControllerGetOrganiztionSupervisors(params?: {
        searchKeyword?: any;
    }): Observable<Array<OrganiztionSupervisorDto>> {
        return this.organiztionSupervisorControllerGetOrganiztionSupervisors$Response(params).pipe(
            map((r: StrictHttpResponse<Array<OrganiztionSupervisorDto>>) => r.body as Array<OrganiztionSupervisorDto>)
        );
    }

    /**
     * Path part for operation organiztionSupervisorControllerUpdateOrganiztionSupervisor
     */
    static readonly OrganiztionSupervisorControllerUpdateOrganiztionSupervisorPath = '/api/v1/organization-supervisor';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organiztionSupervisorControllerUpdateOrganiztionSupervisor()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organiztionSupervisorControllerUpdateOrganiztionSupervisor$Response(params: {
        body: OrganiztionSupervisorDto;
    }): Observable<StrictHttpResponse<OrganiztionSupervisorDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            OrganiztionSupervisorService.OrganiztionSupervisorControllerUpdateOrganiztionSupervisorPath,
            'put'
        );
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
                    return r as StrictHttpResponse<OrganiztionSupervisorDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organiztionSupervisorControllerUpdateOrganiztionSupervisor$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organiztionSupervisorControllerUpdateOrganiztionSupervisor(params: {
        body: OrganiztionSupervisorDto;
    }): Observable<OrganiztionSupervisorDto> {
        return this.organiztionSupervisorControllerUpdateOrganiztionSupervisor$Response(params).pipe(
            map((r: StrictHttpResponse<OrganiztionSupervisorDto>) => r.body as OrganiztionSupervisorDto)
        );
    }

    /**
     * Path part for operation organiztionSupervisorControllerCreateOrganiztionSupervisor
     */
    static readonly OrganiztionSupervisorControllerCreateOrganiztionSupervisorPath = '/api/v1/organization-supervisor';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `organiztionSupervisorControllerCreateOrganiztionSupervisor()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organiztionSupervisorControllerCreateOrganiztionSupervisor$Response(params: {
        body: CreateOrganiztionSupervisorDto;
    }): Observable<StrictHttpResponse<OrganiztionSupervisorDto>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            OrganiztionSupervisorService.OrganiztionSupervisorControllerCreateOrganiztionSupervisorPath,
            'post'
        );
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
                    return r as StrictHttpResponse<OrganiztionSupervisorDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `organiztionSupervisorControllerCreateOrganiztionSupervisor$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    organiztionSupervisorControllerCreateOrganiztionSupervisor(params: {
        body: CreateOrganiztionSupervisorDto;
    }): Observable<OrganiztionSupervisorDto> {
        return this.organiztionSupervisorControllerCreateOrganiztionSupervisor$Response(params).pipe(
            map((r: StrictHttpResponse<OrganiztionSupervisorDto>) => r.body as OrganiztionSupervisorDto)
        );
    }
}
