import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeOrderType } from './gl.model';

@Injectable()
export class GlService {
    private static getLevelApi = '/api/v1/gl/level';

    constructor(private http: HttpClient) {}

    getLevelApi(code, type: TreeOrderType): Observable<any> {
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
        return this.http.get(GlService.getLevelApi, { params });
    }
}
