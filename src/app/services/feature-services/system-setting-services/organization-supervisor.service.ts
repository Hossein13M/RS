import { Injectable } from '@angular/core';
import { FormContainer } from '../../../shared/models/FromContainer';
import { Specification } from '../../../shared/models/Specification';
import { ApiClientService } from '../../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class OrganizationSupervisorService extends Specification {
    private static organizationSupervisorApi = '/api/v1/organization-supervisor';

    get(fc?: FormContainer) {
        const api = OrganizationSupervisorService.organizationSupervisorApi + this.generateSpecificationString();
        return this.apiClientService.get(api, fc);
    }

    delete(id, fc?: FormContainer) {
        const api = OrganizationSupervisorService.organizationSupervisorApi + '/' + id;
        return this.apiClientService.delete(api, fc);
    }

    update(model, fc?: FormContainer) {
        return this.apiClientService.put(OrganizationSupervisorService.organizationSupervisorApi, fc, model);
    }

    create(model, fc?: FormContainer) {
        return this.apiClientService.post(OrganizationSupervisorService.organizationSupervisorApi, model, fc);
    }

    constructor(private apiClientService: ApiClientService) {
        super();
    }
}
