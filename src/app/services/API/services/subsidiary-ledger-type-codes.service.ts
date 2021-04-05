/* tslint:disable */
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { GetFundSubsidiaryLedgerTypeCodesResponseDto } from '../models/get-fund-subsidiary-ledger-type-codes-response-dto';
import { RequestBuilder } from '../request-builder';
import { StrictHttpResponse } from '../strict-http-response';

@Injectable({
    providedIn: 'root',
})
export class SubsidiaryLedgerTypeCodesService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /**
     * Path part for operation subsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodes
     */
    static readonly SubsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodesPath = '/api/v1/subsidiary-ledger-type-codes';

    /**
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `subsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodes()` instead.
     *
     * This method doesn't expect any request body.
     */
    subsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodes$Response(params: {
        fundNationalCode: string;
        searchKey?: string;
    }): Observable<StrictHttpResponse<Array<GetFundSubsidiaryLedgerTypeCodesResponseDto>>> {
        const rb = new RequestBuilder(
            this.rootUrl,
            SubsidiaryLedgerTypeCodesService.SubsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodesPath,
            'get'
        );
        if (params) {
            rb.query('fundNationalCode', params.fundNationalCode, {});
            rb.query('searchKey', params.searchKey, {});
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
                    return r as StrictHttpResponse<Array<GetFundSubsidiaryLedgerTypeCodesResponseDto>>;
                })
            );
    }

    /**
     * This method provides access to only to the response body.
     * To access the full response (for headers, for example), `subsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    subsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodes(params: {
        fundNationalCode: string;
        searchKey?: string;
    }): Observable<Array<GetFundSubsidiaryLedgerTypeCodesResponseDto>> {
        return this.subsidiaryLedgerTypeCodesControllerGetFundSubsidiaryLedgerTypeCodes$Response(params).pipe(
            map(
                (r: StrictHttpResponse<Array<GetFundSubsidiaryLedgerTypeCodesResponseDto>>) =>
                    r.body as Array<GetFundSubsidiaryLedgerTypeCodesResponseDto>
            )
        );
    }
}
