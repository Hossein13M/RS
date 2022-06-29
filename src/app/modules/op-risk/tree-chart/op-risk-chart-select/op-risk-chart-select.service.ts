import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpRiskChartSelectService {
    constructor(private http: HttpClient) {}

    categories(): Observable<any> {
        return this.http.get('/api/v1/operation-risk/tree/categories');
    }
}
