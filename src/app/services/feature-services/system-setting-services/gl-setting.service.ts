import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class GlSettingService extends Specification {
    private static glSettingApi = '/api/v1/inst-gl-mapping';

    createGlSetting(model, fc?: FormContainer) {
        return this.apiClientService.post(GlSettingService.glSettingApi, model, fc);
    }

    public deleteGlSetting(id, fc?: FormContainer) {
        const api = GlSettingService.glSettingApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    updateGlSetting(model, fc?: FormContainer) {
        return this.apiClientService.put(GlSettingService.glSettingApi, fc, model);
    }

    getGlSetting(fc?: FormContainer) {
        const api = GlSettingService.glSettingApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
