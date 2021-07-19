import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FlowService {
    constructor(private http: HttpClient) {}

    public getFlows(): Observable<any> {
        return this.http.get<any>(`/somewhere`);
    }

    public changeFlowStatus(flowId: number): Observable<any> {
        return this.http.put(`/somewhere else`, flowId);
    }
}
