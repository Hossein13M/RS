/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { CustomerDto } from '../models/customer-dto';
import { CustomerInfoDto } from '../models/customer-info-dto';
import { ResponseCustomerDto } from '../models/response-customer-dto';
import { UpdateCustomerDto } from '../models/update-customer-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation customerControllerGetCustomers
     */
    static readonly CustomerControllerGetCustomersPath = '/api/v1/customer';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `customerControllerGetCustomers()` instead.
     *
     * This method doesn't expect any request body.
     */
    customerControllerGetCustomers$Response(params?: {
        limit?: number;
        skip?: number;
        type?: 'legal' | 'real';
        name?: string;
        nationalId?: string;
    }): Observable<StrictHttpResponse<ResponseCustomerDto>> {
        const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerControllerGetCustomersPath, 'get');
        if (params) {
            rb.query('limit', params.limit, {});
            rb.query('skip', params.skip, {});
            rb.query('type', params.type, {});
            rb.query('name', params.name, {});
            rb.query('nationalId', params.nationalId, {});
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
                    return r as StrictHttpResponse<ResponseCustomerDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `customerControllerGetCustomers$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    customerControllerGetCustomers(params?: {
        limit?: number;
        skip?: number;
        type?: 'legal' | 'real';
        name?: string;
        nationalId?: string;
    }): Observable<ResponseCustomerDto> {
        return this.customerControllerGetCustomers$Response(params).pipe(
            map((r: StrictHttpResponse<ResponseCustomerDto>) => r.body as ResponseCustomerDto)
        );
    }

    /**
     * Path part for operation customerControllerUpdateCustomer
     */
    static readonly CustomerControllerUpdateCustomerPath = '/api/v1/customer';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `customerControllerUpdateCustomer()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    customerControllerUpdateCustomer$Response(params: { body: UpdateCustomerDto }): Observable<StrictHttpResponse<CustomerInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerControllerUpdateCustomerPath, 'put');
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
                    return r as StrictHttpResponse<CustomerInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `customerControllerUpdateCustomer$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    customerControllerUpdateCustomer(params: { body: UpdateCustomerDto }): Observable<CustomerInfoDto> {
        return this.customerControllerUpdateCustomer$Response(params).pipe(
            map((r: StrictHttpResponse<CustomerInfoDto>) => r.body as CustomerInfoDto)
        );
    }

    /**
     * Path part for operation customerControllerCreateCustomer
     */
    static readonly CustomerControllerCreateCustomerPath = '/api/v1/customer';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `customerControllerCreateCustomer()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    customerControllerCreateCustomer$Response(params: { body: CustomerDto }): Observable<StrictHttpResponse<CustomerInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerControllerCreateCustomerPath, 'post');
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
                    return r as StrictHttpResponse<CustomerInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `customerControllerCreateCustomer$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    customerControllerCreateCustomer(params: { body: CustomerDto }): Observable<CustomerInfoDto> {
        return this.customerControllerCreateCustomer$Response(params).pipe(
            map((r: StrictHttpResponse<CustomerInfoDto>) => r.body as CustomerInfoDto)
        );
    }

    /**
     * Path part for operation customerControllerGetCustomer
     */
    static readonly CustomerControllerGetCustomerPath = '/api/v1/customer/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `customerControllerGetCustomer()` instead.
     *
     * This method doesn't expect any request body.
     */
    customerControllerGetCustomer$Response(params: { id: number }): Observable<StrictHttpResponse<CustomerInfoDto>> {
        const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerControllerGetCustomerPath, 'get');
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
                    return r as StrictHttpResponse<CustomerInfoDto>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `customerControllerGetCustomer$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    customerControllerGetCustomer(params: { id: number }): Observable<CustomerInfoDto> {
        return this.customerControllerGetCustomer$Response(params).pipe(map((r: StrictHttpResponse<CustomerInfoDto>) => r.body as CustomerInfoDto));
    }

    /**
     * Path part for operation customerControllerDeleteCustomer
     */
    static readonly CustomerControllerDeleteCustomerPath = '/api/v1/customer/{id}';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `customerControllerDeleteCustomer()` instead.
     *
     * This method doesn't expect any request body.
     */
    customerControllerDeleteCustomer$Response(params: { id: number }): Observable<StrictHttpResponse<void>> {
        const rb = new RequestBuilder(this.rootUrl, CustomerService.CustomerControllerDeleteCustomerPath, 'delete');
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
     * To access the full response (for headers, for example), `customerControllerDeleteCustomer$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    customerControllerDeleteCustomer(params: { id: number }): Observable<void> {
        return this.customerControllerDeleteCustomer$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
    }
}
