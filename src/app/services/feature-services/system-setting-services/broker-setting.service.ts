import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class BrokerSettingService {
    constructor(private http: HttpClient) {}

    getBrokerSettings(): Observable<any> {
        return this.http.get('/api/v1/broker?limit=1000&skip=0');
    }

    post(model): Observable<any> {
        return this.http.post('/api/v1/broker', model);
    }

    put(model): Observable<any> {
        return this.http.put('/api/v1/broker', model);
    }

    delete(id): Observable<any> {
        return this.http.delete('/api/v1/broker/' + id);
    }
}
