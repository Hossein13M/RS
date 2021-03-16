/* tslint:disable */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Global configuration
 */
@Injectable({
    providedIn: 'root',
})
export class ApiConfiguration {
    // // rootUrl: string = 'http://dev.management-api.iirms.ir';
    // // rootUrl: string = 'http://dev.iirms.ir:3003';
    // // rootUrl: string = 'http://infra_managementapi:3003';
    // rootUrl: string = 'http://dev.management-api.iirms.ir';
    // // rootUrl: string = 'http://172.20.200.131:3003';
    rootUrl: string = environment.serviceUrl;
}

// #### Minio ####
export class MinioEnv {
    public static MINIO_ENDPOINT = '192.168.10.86';
    public static MINIO_PORT = 9000;
    public static MINIO_ACCESS_KEY = '5D0EN4B8SF7EYUJH1V8I';
    public static MINIO_SECRET_KEY = 'BjtgRNuLHBSEUU4e2Yzz/lBVjoFVnIvCr6rGFRXo';
    public static MINIO_REGION_NAME = 'Tamadon';
    public static MINIO_PRESIGNED_URL_EXPIRY = 3600;
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
    rootUrl?: string;
}
