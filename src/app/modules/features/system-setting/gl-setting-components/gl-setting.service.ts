import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';
import { Injectable } from '@angular/core';

@Injectable()
export class GlSettingService {
    private static glSettingApi = '/api/v1/inst-gl-mapping';

    constructor(private http: HttpClient) {}

    public createGlSetting(model): Observable<any> {
        return this.http.post(GlSettingService.glSettingApi, model);
    }

    public deleteGlSetting(id): Observable<any> {
        const api = GlSettingService.glSettingApi + '/' + id;
        return this.http.delete(api);
    }

    public updateGlSetting(model): Observable<any> {
        return this.http.put(GlSettingService.glSettingApi, model);
    }

    public getGlSettings(paginationParams, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        const api = GlSettingService.glSettingApi;
        return this.http.get(api, { params });
    }
}
