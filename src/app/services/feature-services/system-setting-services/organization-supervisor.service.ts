import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OrganizationSupervisorService {
    private static organizationSupervisorApi = '/api/v1/organization-supervisor';

    constructor(private http: HttpClient) {}

    get(): Observable<any> {
        const api = OrganizationSupervisorService.organizationSupervisorApi;
        return this.http.get(api);
    }

    delete(id): Observable<any> {
        const api = OrganizationSupervisorService.organizationSupervisorApi + '/' + id;
        return this.http.delete(api);
    }

    update(model): Observable<any> {
        return this.http.put(OrganizationSupervisorService.organizationSupervisorApi, model);
    }

    create(model): Observable<any> {
        return this.http.post(OrganizationSupervisorService.organizationSupervisorApi, model);
    }
}
