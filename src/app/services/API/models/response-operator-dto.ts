/* tslint:disable */
import { ResponseOperatorItemDto } from './response-operator-item-dto';

export interface ResponseOperatorDto {
    items: Array<ResponseOperatorItemDto>;
    limit?: number;
    skip?: number;
    total: number;
}
