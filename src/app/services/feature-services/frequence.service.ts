import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class FrequenceService {
    private static frequenceApi = '/api/v1/frequence';

    constructor(private apiClientService: ApiClientService) {}

    getAllFrequences(fc?: FormContainer) {
        return this.apiClientService.get(FrequenceService.frequenceApi, fc);
    }
}
