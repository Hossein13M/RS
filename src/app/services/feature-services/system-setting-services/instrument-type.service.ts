import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class InstrumentTypeService {
    private static instrumentTypeApi = '/api/v1/instrument-type';

    constructor(private http: HttpClient) {}

    getInstrumentType(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/instrument-type', { params });
    }

    updateInstrumentType(model): Observable<any> {
        return this.http.put(InstrumentTypeService.instrumentTypeApi, model);
    }
}
