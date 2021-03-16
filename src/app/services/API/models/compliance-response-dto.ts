/* tslint:disable */
import { ComplianceDto } from './compliance-dto';
export interface ComplianceResponseDto {
    items: Array<ComplianceDto>;
    limit?: number;
    skip?: number;
    total: number;
}
