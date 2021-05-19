import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TreeMappingService {
    private static TreeMappingServiceAPI = '/api/v1/operation-risk/tree-mapping';
    private latestMappingSubject = new BehaviorSubject<any>(null);
    public _latestMapping = this.latestMappingSubject.asObservable();

    constructor(private http: HttpClient) {}

    get latestMapping(): any {
        return this.latestMappingSubject.getValue();
    }

    getMappingCategory(): Observable<any> {
        return this.http.get(TreeMappingService.TreeMappingServiceAPI + `/categories`).pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    deleteMapping(id): Observable<any> {
        return this.http.delete(TreeMappingService.TreeMappingServiceAPI + `/${id}`);
    }

    addMapping(fromId: number, toId: number): Observable<any> {
        return this.http.post(TreeMappingService.TreeMappingServiceAPI, { mapParent: fromId + '', mapChild: toId + '' });
    }
}
