/* tslint:disable */
import { Compliance } from '../../../modules/compliance/compliance.model';
export interface ComplianceResponseDto {
    items: Array<Compliance>;
    limit?: number;
    skip?: number;
    total: number;
}
