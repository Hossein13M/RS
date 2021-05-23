/* tslint:disable */
import { Compliance } from '../../../modules/compliance/compliance';
export interface ComplianceResponseDto {
    items: Array<Compliance>;
    limit?: number;
    skip?: number;
    total: number;
}
