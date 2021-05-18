import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlListServerResponse, TreeOrderType } from './gl.model';

@Injectable()
export class GlService {
    constructor(private http: HttpClient) {}

    public getGLLevels(code, type: TreeOrderType): Observable<any> {
        const params: any = {};
        switch (type) {
            case TreeOrderType.Category:
                break;
            case TreeOrderType.Detail:
                params.ubsidiaryLedgerCode = code;
                break;
            case TreeOrderType.General:
                params.groupLedgerCode = code;
                break;
            case TreeOrderType.Group:
                params.categoryLedgerCode = code;
                break;
            case TreeOrderType.Subsidiary:
                params.generalLedgerCode = code;
                break;
        }

        return this.http.get(`/api/v1/gl/level`, { params });
    }

    public getGlGridData(params): Observable<GlListServerResponse> {
        return this.http.get<GlListServerResponse>(`/api/v1/gl/list`, { params });
    }

    public getGLChangesHistory(params): Observable<any> {
        return this.http.get<any>(`/api/v1/gl/change`, { params });
    }
}
