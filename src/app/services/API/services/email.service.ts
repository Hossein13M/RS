/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CreateEmailDto } from '../models/create-email-dto';
import { ResponseEmailDto } from '../models/response-email-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class EmailService extends BaseService {
    /**
     * Path part for operation emailControllerSendEmail
     */
    static readonly EmailControllerSendEmailPath = '/api/v1/email';

    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `emailControllerSendEmail()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    emailControllerSendEmail$Response(params: { body: CreateEmailDto }): Observable<StrictHttpResponse<ResponseEmailDto>> {
        const rb = new RequestBuilder(this.rootUrl, EmailService.EmailControllerSendEmailPath, 'post');
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
                    return r as StrictHttpResponse<ResponseEmailDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `emailControllerSendEmail$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    emailControllerSendEmail(params: { body: CreateEmailDto }): Observable<ResponseEmailDto> {
        return this.emailControllerSendEmail$Response(params).pipe(map((r: StrictHttpResponse<ResponseEmailDto>) => r.body as ResponseEmailDto));
    }
}
