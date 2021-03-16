import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BourseInstrumentDetailService {
    private static bourseInstruApi = '/api/v1/bourse-instrument-detail';

    getBonds(fc?: FormContainer) {
        return this.apiClientService.get(BourseInstrumentDetailService.bourseInstruApi + '/bonds?limit=5000&skip=0&status=true', fc);
    }

    constructor(private apiClientService: ApiClientService) {}
}
