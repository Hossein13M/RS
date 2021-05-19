import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class FrequenceService {
    constructor(private http: HttpClient) {}

    getAllFrequences(): Observable<any> {
        return this.http.get('/api/v1/frequence');
    }
}
