/* tslint:disable */
import { CustomerInfoDto } from './customer-info-dto';
export interface ResponseCustomerDto {
    items: Array<CustomerInfoDto>;
    limit?: number;
    skip?: number;
    total: number;
}
