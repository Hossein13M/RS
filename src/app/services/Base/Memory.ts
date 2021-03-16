import { environment } from '../../../environments/environment';

export function GetAPI(relative) {
    return environment.serviceUrl + relative;
}

// TODO:
