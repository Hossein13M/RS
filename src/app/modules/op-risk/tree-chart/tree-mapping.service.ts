import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/services/Base/api-client.service';
import { FormContainer } from 'app/shared/models/FromContainer';
import { Specification } from 'app/shared/models/Specification';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TreeMappingService extends Specification {
    private static TreeMappingServiceAPI = '/api/v1/operation-risk/tree-mapping';
    private latestMappingSubject = new BehaviorSubject<any>(null);
    public _latestMapping = this.latestMappingSubject.asObservable();

    get latestMapping() {
        return this.latestMappingSubject.getValue();
    }

    constructor(private acs: ApiClientService) {
        super();
    }

    getMappingCategory(fc?: FormContainer): Observable<any> {
        return this.acs
            .get(TreeMappingService.TreeMappingServiceAPI + `/categories`, fc)
            .pipe(tap((mapping) => this.latestMappingSubject.next(mapping)));
    }

    deleteMapping(id, fc?: FormContainer): Observable<any> {
        return this.acs.delete(TreeMappingService.TreeMappingServiceAPI + `/${id}`, fc);
    }

    addMapping(fromId: number, toId: number, fc?: FormContainer): Observable<any> {
        return this.acs.post(TreeMappingService.TreeMappingServiceAPI, { mapParent: fromId + '', mapChild: toId + '' }, fc);
    }
}
