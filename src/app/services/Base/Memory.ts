import { environment } from '#env/environment';

export function GetAPI(relative) {
    return environment.serviceUrl + relative;
}

// TODO:
