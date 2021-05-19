import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilityFunctions } from '#shared/utilityFunctions';

@Injectable({
    providedIn: 'root',
})
export class OrganizationTypeService {
    constructor(private http: HttpClient) {}

    getOrganizationType(searchParams?): Observable<any> {
        const params: HttpParams = UtilityFunctions.prepareParamsFromObjectsForAPICalls({ ...searchParams });
        return this.http.get('/api/v1/organization-type', { params });
    }

    deleteOrganizationType(id): Observable<any> {
        return this.http.delete('/api/v1/organization-type' + id);
    }

    updateOrganizationType(model): Observable<any> {
        return this.http.put('/api/v1/organization-type', model);
    }

    createOrganizationType(model): Observable<any> {
        return this.http.post('/api/v1/organization-type', model);
    }
}
