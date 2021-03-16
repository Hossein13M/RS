import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AssetReturnService {
    private static assetReturnApi = '/api/assets-risk-and-return';

    constructor(private http: HttpClient) {}

    getAssetReturns(endDate): Observable<any> {
        return this.http.get(AssetReturnService.assetReturnApi, { params: { endDate } });
    }
}
