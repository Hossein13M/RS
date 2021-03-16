import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AUMService {
    constructor(private http: HttpClient) {}

    public getAumCertificateDeposit(date: string): Observable<any> {
        return this.http.get(`/api/v1/asset/cod`, { params: { date } });
    }

    public getAumDeposit(tamadonAsset: any, date: any, fundNationalCodes: any): Observable<any> {
        return this.http.get(`/api/v1/asset/deposits`, { params: { tamadonAsset, date, fundNationalCodes } });
    }

    public getAumEtf(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/etf-dtf`, { params });
    }

    public getAumBond(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/bonds`, { params });
    }

    public getAumNlBond(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/nl/bonds`, { params });
    }

    public getAumFunds(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/funds`, { params });
    }

    public getAumNlFunds(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/nl/funds`, { params });
    }

    public getAumStocks(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/stocks`, { params });
    }

    public getAumNLStocks(searchParams: any): Observable<any> {
        const params: HttpParams = this.prepareParamsForObjects(searchParams);
        return this.http.get(`/api/v1/asset/nl/stocks`, { params });
    }

    public getAUMBaskets(): Observable<any> {
        return this.http.get(`/api/v1/asset/basket`);
    }

    public getAUMCategories(): Observable<any> {
        return this.http.get(`/api/v1/asset/category`);
    }

    public getAUMFund(basketIds: Array<string>): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('basketIds', JSON.stringify(basketIds));
        return this.http.get(`/api/v1/asset/fund`, { params });
    }

    // *** the following method has been implemented to create the query params we need to append to our requests
    private prepareParamsForObjects(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) {
                searchParams[key].forEach((element) => params.append(key, element));
            } else if (searchParams[key] !== '') {
                params = params.append(key, searchParams[key]);
            }
        });
        return params;
    }
}
