import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GlGridService {
    private static getGLGridDataApi = '/api/v1/gl/list';

    constructor(private http: HttpClient) {}

    getGlGridData(params): Observable<any> {
        return this.http.get(GlGridService.getGLGridDataApi, { params });
    }
}
