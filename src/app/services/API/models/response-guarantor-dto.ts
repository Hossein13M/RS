/* tslint:disable */
import { GuarantorDtoWithId } from './guarantor-dto-with-id';
export interface ResponseGuarantorDto {
    items: Array<GuarantorDtoWithId>;
    limit?: number;
    skip?: number;
    total: number;
}
