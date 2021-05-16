import { HttpParams } from '@angular/common/http';

export class UtilityFunctions {
    constructor() {}

    static prepareParamsFromObjectsForAPICalls(searchParams: any): HttpParams {
        let params: HttpParams = new HttpParams();
        Object.keys(searchParams).map((key: string) => {
            if (Array.isArray(searchParams[key])) searchParams[key].forEach((element) => (params = params.append(key, element)));
            else if (searchParams[key] !== '') params = params.append(key, searchParams[key]);
        });
        return params;
    }
}
