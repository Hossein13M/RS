/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateAuthItemChildDto } from '../models/create-auth-item-child-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class AuthItemChildService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation authItemChildControllerCreateAuthItemChild
     */
    static readonly AuthItemChildControllerCreateAuthItemChildPath = '/api/v1/rbac/assign-auth-item-to-role';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemChildControllerCreateAuthItemChild()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemChildControllerCreateAuthItemChild$Response(params: {
        body: CreateAuthItemChildDto;
    }): Observable<StrictHttpResponse<CreateAuthItemChildDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemChildService.AuthItemChildControllerCreateAuthItemChildPath, 'post');
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
                    return r as StrictHttpResponse<CreateAuthItemChildDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemChildControllerCreateAuthItemChild$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemChildControllerCreateAuthItemChild(params: { body: CreateAuthItemChildDto }): Observable<CreateAuthItemChildDto> {
        return this.authItemChildControllerCreateAuthItemChild$Response(params).pipe(
            map((r: StrictHttpResponse<CreateAuthItemChildDto>) => r.body as CreateAuthItemChildDto)
        );
    }

    /**
     * Path part for operation authItemChildControllerDeleteAuthItemChild
     */
    static readonly AuthItemChildControllerDeleteAuthItemChildPath = '/api/v1/rbac/revoke/{child}/from-role/{parent}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemChildControllerDeleteAuthItemChild()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemChildControllerDeleteAuthItemChild$Response(params: { parent: string; child: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemChildService.AuthItemChildControllerDeleteAuthItemChildPath, 'delete');
        if (params) {
            rb.path('parent', params.parent, {});
            rb.path('child', params.child, {});
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
     * To access the full response (for headers, for example), `authItemChildControllerDeleteAuthItemChild$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemChildControllerDeleteAuthItemChild(params: { parent: string; child: string }): Observable<void> {
        return this.authItemChildControllerDeleteAuthItemChild$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
