import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FundTypeService {
    constructor(private http: HttpClient) {}

    getAllFundTypes(): Observable<any> {
        return this.http.get('/api/v1/fund-type' + '?limit=1000&skip=0');
    }
}
