import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BourseBoardService {
    private static bourseBoardApi = '/api/v1/bourse-board';

    constructor(private apiClientService: ApiClientService) {}

    getBourseBorad(fc?: FormContainer) {
        return this.apiClientService.get(BourseBoardService.bourseBoardApi, fc);
    }

    createBourseBorad(model, fc?: FormContainer) {
        return this.apiClientService.post(BourseBoardService.bourseBoardApi, model, fc);
    }

    updateBourseBorad(model, fc?: FormContainer) {
        return this.apiClientService.put(BourseBoardService.bourseBoardApi, fc, model);
    }

    deleteBourseBorad(id, fc?: FormContainer) {
        const api = BourseBoardService.bourseBoardApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }
}
