import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GlChangesService {
    private static GlChangeApi = '/api/v1/gl/change';

    constructor(private http: HttpClient) {}

    getChangeApi(params): Observable<any> {
        return this.http.get(GlChangesService.GlChangeApi, { params });
    }
}
