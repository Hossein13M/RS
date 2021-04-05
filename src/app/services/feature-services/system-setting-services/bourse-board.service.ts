import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { ApiClientService } from '../../Base/api-client.service';
import { PageEvent } from '#shared/models/Specification';

@Injectable({
    providedIn: 'root',
})
export class BourseBoardService {
    private static bourseBoardApi = '/api/v1/bourse-board';

    public pageEvent: PageEvent = {
        currentIndex: 0,
        pageSize: 10,
    };

    constructor(private apiClientService: ApiClientService) {}

    get(fc?: FormContainer) {
        return this.apiClientService.get(BourseBoardService.bourseBoardApi, fc);
    }

    create(model, fc?: FormContainer) {
        return this.apiClientService.post(BourseBoardService.bourseBoardApi, model, fc);
    }

    update(model, fc?: FormContainer) {
        return this.apiClientService.put(BourseBoardService.bourseBoardApi, fc, model);
    }

    delete(id, fc?: FormContainer) {
        const api = BourseBoardService.bourseBoardApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    public setPageDetailData(res): void {
        this.pageEvent.length = res.limit;
        this.pageEvent.currentIndex = res.skip / res.limit;
        this.pageEvent.length = res.total;
    }
}
