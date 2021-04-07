import { Injectable } from '@angular/core';
import { FormContainer } from '#shared/models/FromContainer';
import { Specification } from '#shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BranchSettingService extends Specification {
    private static createBranch = '/api/v1/bank-branch';

    constructor(private apiClientService: ApiClientService) {
        super();
    }

    post(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.post(BranchSettingService.createBranch, model, fc);
    }

    put(model, fc?: FormContainer): Observable<any> {
        return this.apiClientService.put(BranchSettingService.createBranch, fc, model);
    }

    getBankBranch(fc?: FormContainer): Observable<any> {
        const api = BranchSettingService.createBranch + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    public delete(id, fc?: FormContainer): Observable<any> {
        const api = BranchSettingService.createBranch + '/' + id;
        return this.apiClientService.delete(api, fc);
    }
}
