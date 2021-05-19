/* tslint:disable */
import { ComplianceModel } from '../../../modules/compliance/compliance.model';
export interface ComplianceResponseDto {
    items: Array<ComplianceModel>;
    limit?: number;
    skip?: number;
    total: number;
}
