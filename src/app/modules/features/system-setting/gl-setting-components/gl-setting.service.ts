import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

export class GlSettingService {
    private static glSettingApi = '/api/v1/inst-gl-mapping';

    constructor(private http: HttpClient) {}

    public create(model): Observable<any> {
        return this.http.post(GlSettingService.glSettingApi, model);
    }

    public delete(id): Observable<any> {
        const api = GlSettingService.glSettingApi + '/' + id;
        return this.http.delete(api);
    }

    public update(model): Observable<any> {
        return this.http.put(GlSettingService.glSettingApi, model);
    }

    public get(paginationParams, searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...paginationParams, ...searchParams });
        const api = GlSettingService.glSettingApi;
        return this.http.get(api, { params });
    }
}
