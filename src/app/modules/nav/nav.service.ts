import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavService extends Specification {
    private static getAllFunds = '/api/v1/fund?limit=1000&skip=0';
    private static getAllCodeSarfasl = '/api/v1/subsidiary-ledger-type-codes?fundNationalCode={fundNationalCodeValue}';
    // private static getAllCodeSarfasl = '/api/v1/instrument?limit=1000&skip=0';
    private static getAllTickers = '/api/v1/fund-nav-user-transaction/tickers';
    private static createAssetAndDebitApi = '/api/v1/fund-nav-asset-and-debit';
    private static getNonBourseInstrument = '/api/v1/fund-nav-user-transaction/non-bourse-instruments';
    private static getAllBankAccountApi = '/api/v1/fund-nav-user-transaction/bank-accounts';
    private static getAllEstimatedPrice =
        '/api/v1/fund-nav-user-transaction/estimated-price-instruments?fundNationalCode={fundNationalCodeValue}&searchKey={tickerValue}';
    private static processNavApi = '/api/v1/fund-nav-user-transaction';
    private static processNAVRunTime =
        '/api/v1/fund-real-time-nav?fundNationalCode={fundNationalCodeValue}&plannedRate={plannedRateValue}&date={date}';
    private static getAssetAndDebitService = '/api/v1/fund-nav-asset-and-debit/{fundNationalId}';

    constructor(private apiClientService: ApiClientService) {
        super();
    }

    getFundAssetAndDebit(fundId, fc?: FormContainer) {
        const api = NavService.getAssetAndDebitService.replace('{fundNationalId}', fundId);
        return this.apiClientService.get(api, fc);
    }

    getAllFunds(fc?: FormContainer) {
        return this.apiClientService.get(NavService.getAllFunds, fc);
    }

    getAllCodeSarfasl(fundNationalCode, fc?: FormContainer) {
        const api = NavService.getAllCodeSarfasl.replace('{fundNationalCodeValue}', fundNationalCode);
        return this.apiClientService.get(api, fc);
    }

    getAllTickers(fundNationalCode, transactionType, ticker, fc?: FormContainer) {
        let api = NavService.getAllTickers;
        const query = [];
        if (fundNationalCode) {
            query.push(`fundNationalCode=${fundNationalCode}`);
        }

        if (transactionType) {
            query.push(`transactionType=${transactionType}`);
        } else {
            query.push(`transactionType=1`);
        }

        if (ticker) {
            query.push(`searchKey=${ticker}`);
        }
        if (query.length > 0) {
            api += '?';
            for (let i = 0; i < query.length; i++) {
                api += query[i];
                if (i !== query.length - 1) {
                    api += '&';
                }
            }
        }
        return this.apiClientService.get(api, fc);
    }

    createCodeSarfasl(model, fc?: FormContainer) {
        return this.apiClientService.post(NavService.createAssetAndDebitApi, model, fc);
    }

    getAllTickersBySearch(fundNationalCode, transactionType, ticker, fc?: FormContainer) {
        let api = NavService.getAllTickers;
        const query = [];
        if (fundNationalCode) {
            query.push(`fundNationalCode=${fundNationalCode}`);
        }

        if (transactionType) {
            query.push(`transactionType=${transactionType}`);
        } else {
            query.push(`transactionType=1`);
        }

        if (ticker) {
            query.push(`searchKey=${ticker}`);
        }
        if (query.length > 0) {
            api += '?';
            for (let i = 0; i < query.length; i++) {
                api += query[i];
                if (i !== query.length - 1) {
                    api += '&';
                }
            }
        }
        return this.apiClientService.get(api, fc);
    }

    getAllNonBourseInstrument(fundNationalCode, transactionType, tickerValue, fc?: FormContainer): Observable<any> {
        let api = NavService.getNonBourseInstrument;
        const query = [];

        if (fundNationalCode) {
            query.push(`fundNationalCode=${fundNationalCode}`);
        }

        if (transactionType) {
            query.push(`transactionType=${transactionType}`);
        } else {
            query.push(`transactionType=1`);
        }

        if (tickerValue) {
            query.push(`searchKey=${tickerValue}`);
        }
        if (query.length > 0) {
            api += '?';
            for (let i = 0; i < query.length; i++) {
                api += query[i];
                if (i !== query.length - 1) {
                    api += '&';
                }
            }
        }
        return this.apiClientService.get(api, fc);
    }

    getAllEstimatePriceInstrument(fundNationalCode, ticker, fc?: FormContainer): Observable<any> {
        const api = NavService.getAllEstimatedPrice.replace('{fundNationalCodeValue}', fundNationalCode).replace('{tickerValue}', ticker);
        return this.apiClientService.get(api, fc);
    }

    getAllBankAccountApi(fundNationalCodeValue, searchKey?: string, fc?: FormContainer): Observable<any> {
        let api = NavService.getAllBankAccountApi;
        const query = [];

        if (fundNationalCodeValue) {
            query.push(`fundNationalCode=${fundNationalCodeValue}`);
        }

        if (searchKey) {
            query.push(`searchKey=${searchKey}`);
        }

        if (query.length > 0) {
            api += '?';
            for (let i = 0; i < query.length; i++) {
                api += query[i];
                if (i !== query.length - 1) {
                    api += '&';
                }
            }
        }
        return this.apiClientService.get(api, fc);
    }

    processNav(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.post(NavService.processNavApi, model, fc);
    }

    processNAVRuntime(fundNationalCode, plannedRate, date): Observable<any> {
        const api = NavService.processNAVRunTime
            .replace('{fundNationalCodeValue}', fundNationalCode)
            .replace('{plannedRateValue}', plannedRate)
            .replace('{date}', this.convertDate(date));
        return this.apiClientService.get(api, null);
    }
}
