import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class BourseMarketService {
    constructor(private http: HttpClient) {}

    getBourses(searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...searchParams });
        return this.http.get('/api/v1/bourse-market', { params });
    }

    createBourse(model): Observable<any> {
        return this.http.post('/api/v1/bourse-market', model);
    }

    updateBourse(model): Observable<any> {
        return this.http.put('/api/v1/bourse-market', model);
    }

    deleteBourse(id): Observable<any> {
        return this.http.delete('/api/v1/bourse-market/' + id);
    }
}
