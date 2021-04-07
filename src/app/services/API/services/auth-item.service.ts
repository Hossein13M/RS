/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateAuthItemDto } from '../models/create-auth-item-dto';
import { UpdateAuthItemDto } from '../models/update-auth-item-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class AuthItemService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation authItemControllerCreateAuthItem
     */
    static readonly AuthItemControllerCreateAuthItemPath = '/api/v1/rbac/auth-item';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemControllerCreateAuthItem()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemControllerCreateAuthItem$Response(params: { body: CreateAuthItemDto }): Observable<StrictHttpResponse<CreateAuthItemDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemService.AuthItemControllerCreateAuthItemPath, 'post');
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
                    return r as StrictHttpResponse<CreateAuthItemDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemControllerCreateAuthItem$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemControllerCreateAuthItem(params: { body: CreateAuthItemDto }): Observable<CreateAuthItemDto> {
        return this.authItemControllerCreateAuthItem$Response(params).pipe(
            map((r: StrictHttpResponse<CreateAuthItemDto>) => r.body as CreateAuthItemDto)
        );
    }

    /**
     * Path part for operation authItemControllerGetAuthItems
     */
    static readonly AuthItemControllerGetAuthItemsPath = '/api/v1/rbac/auth-items';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemControllerGetAuthItems()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemControllerGetAuthItems$Response(params?: { name?: string; type?: '1' | '2' }): Observable<StrictHttpResponse<Array<CreateAuthItemDto>>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemService.AuthItemControllerGetAuthItemsPath, 'get');
        if (params) {
            rb.query('name', params.name, {});
            rb.query('type', params.type, {});
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
                    return r as StrictHttpResponse<Array<CreateAuthItemDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemControllerGetAuthItems$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemControllerGetAuthItems(params?: { name?: string; type?: '1' | '2' }): Observable<Array<CreateAuthItemDto>> {
        return this.authItemControllerGetAuthItems$Response(params).pipe(
            map((r: StrictHttpResponse<Array<CreateAuthItemDto>>) => r.body as Array<CreateAuthItemDto>)
        );
    }

    /**
     * Path part for operation authItemControllerUpdateAuthItem
     */
    static readonly AuthItemControllerUpdateAuthItemPath = '/api/v1/rbac/auth-item/{name}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemControllerUpdateAuthItem()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemControllerUpdateAuthItem$Response(params: { name: string; body: UpdateAuthItemDto }): Observable<StrictHttpResponse<CreateAuthItemDto>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemService.AuthItemControllerUpdateAuthItemPath, 'put');
        if (params) {
            rb.path('name', params.name, {});

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
                    return r as StrictHttpResponse<CreateAuthItemDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `authItemControllerUpdateAuthItem$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    authItemControllerUpdateAuthItem(params: { name: string; body: UpdateAuthItemDto }): Observable<CreateAuthItemDto> {
        return this.authItemControllerUpdateAuthItem$Response(params).pipe(
            map((r: StrictHttpResponse<CreateAuthItemDto>) => r.body as CreateAuthItemDto)
        );
    }

    /**
     * Path part for operation authItemControllerDeleteAuthItem
     */
    static readonly AuthItemControllerDeleteAuthItemPath = '/api/v1/rbac/auth-item/{name}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `authItemControllerDeleteAuthItem()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemControllerDeleteAuthItem$Response(params: { name: string }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, AuthItemService.AuthItemControllerDeleteAuthItemPath, 'delete');
        if (params) {
            rb.path('name', params.name, {});
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
     * To access the full response (for headers, for example), `authItemControllerDeleteAuthItem$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    authItemControllerDeleteAuthItem(params: { name: string }): Observable<void> {
        return this.authItemControllerDeleteAuthItem$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
