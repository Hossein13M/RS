import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class YieldCurveService {
    constructor(private http: HttpClient) {}

    public getYieldCurveData(date: string): Observable<any> {
        return this.http.get(`/api/v1/yield-curve`, { params: { date: date } });
    }
}
