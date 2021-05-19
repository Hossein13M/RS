import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BourseBoardService {
    constructor(private http: HttpClient) {}

    get(): Observable<any> {
        return this.http.get('/api/v1/bourse-board');
    }

    create(model): Observable<any> {
        return this.http.post('/api/v1/bourse-board', model);
    }

    update(model): Observable<any> {
        return this.http.put('/api/v1/bourse-board', model);
    }

    delete(id): Observable<any> {
        return this.http.delete('/api/v1/bourse-board/' + id);
    }
}
