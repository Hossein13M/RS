/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CanDto } from '../models/can-dto';
import { CanResponseDto } from '../models/can-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class CanService extends BaseService {
    /**
     * Path part for operation canControllerCan
     */
    static readonly CanControllerCanPath = '/api/v1/rbac/can';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `canControllerCan()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    canControllerCan$Response(params: { body: CanDto }): Observable<StrictHttpResponse<CanResponseDto>> {
        const rb = new RequestBuilder(this.rootUrl, CanService.CanControllerCanPath, 'post');
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
                    return r as StrictHttpResponse<CanResponseDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `canControllerCan$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    canControllerCan(params: { body: CanDto }): Observable<CanResponseDto> {
        return this.canControllerCan$Response(params).pipe(map((r: StrictHttpResponse<CanResponseDto>) => r.body as CanResponseDto));
    }
}
