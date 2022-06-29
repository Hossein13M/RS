import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class NewInstrumentService {
    constructor(private http: HttpClient) {}

    getInstruments(paginationParams?, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/new-instrument', { params });
    }

    createInstrument(model): Observable<any> {
        return this.http.post('/api/v1/new-instrument', model);
    }

    deleteInstrument(id, isInBourse): Observable<any> {
        const api = '/api/v1/new-instrument' + '/' + id + '?isInBourse=' + isInBourse;
        return this.http.delete(api);
    }

    updateInstrument(model): Observable<any> {
        return this.http.put('/api/v1/new-instrument', model);
    }
}
