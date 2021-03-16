import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class OrganizationTypeService extends Specification {
    private static organizationTypeApi = '/api/v1/organization-type';

    getOrganizationType(fc?: FormContainer) {
        return this.apiClientService.get(OrganizationTypeService.organizationTypeApi, fc);
    }

    deleteOrganizationType(id, fc?: FormContainer) {
        const api = OrganizationTypeService.organizationTypeApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    updateOrganizationType(model, fc?: FormContainer) {
        return this.apiClientService.put(OrganizationTypeService.organizationTypeApi, fc, model);
    }

    createOrganizationType(model, fc?: FormContainer) {
        return this.apiClientService.post(OrganizationTypeService.organizationTypeApi, model, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
