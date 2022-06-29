import { Injectable } from '@angular/core';
import { FormContainer } from '../../shared/models/FromContainer';
import { ApiClientService } from '../Base/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class BourseInstrumentDetailService {
    private static bourseInstruApi = '/api/v1/bourse-instrument-detail';

    constructor(private apiClientService: ApiClientService) {}

    getBonds(searchKeyword: string, fc?: FormContainer) {
        return this.apiClientService.get(
            BourseInstrumentDetailService.bourseInstruApi +
                '/bonds?limit=5000&skip=0&status=true' +
                (searchKeyword !== undefined ? `&searchKeyword=${searchKeyword}` : ''),
            fc
        );
    }
}
