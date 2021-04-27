import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetMonitoring, Instrument } from './assets-monitoring.model';
import { Observable } from 'rxjs';

@Injectable()
export class AssetsMonitoringService {
    constructor(private http: HttpClient) {}

    public getAssetInstruments(searchParams): Observable<Array<Instrument>> {
        return this.http.get<Array<Instrument>>(`/api/v1/assets-monitoring/instruments`, { params: searchParams });
    }

    public getAssetMonitoringData(searchParams): Observable<AssetMonitoring> {
        return this.http.get<AssetMonitoring>(`/api/v1/assets-monitoring`, { params: searchParams });
    }
}
