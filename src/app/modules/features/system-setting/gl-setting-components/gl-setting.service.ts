import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { Injectable } from '@angular/core';

@Injectable()
export class GlSettingService {
    constructor(private http: HttpClient) {}

    public createGlSetting(model): Observable<any> {
        return this.http.post('/api/v1/inst-gl-mapping', model);
    }

    public deleteGlSetting(id): Observable<any> {
        return this.http.delete('/api/v1/inst-gl-mapping/' + id);
    }

    public updateGlSetting(model): Observable<any> {
        return this.http.put('/api/v1/inst-gl-mapping', model);
    }

    public getGlSettings(paginationParams, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        return this.http.get('/api/v1/inst-gl-mapping', { params });
    }
}
