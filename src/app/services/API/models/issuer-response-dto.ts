/* tslint:disable */
import { IssuerDto } from './issuer-dto';
export interface IssuerResponseDto {
    items: Array<IssuerDto>;
    limit?: number;
    skip?: number;
    total: number;
}
