/* tslint:disable */
import { ComplianceCalculatedValuesDto } from './compliance-calculated-values-dto';
export interface RsponceComplianceCalculatedDto {
    code: number;
    currentAmount: number;
    down: number;
    matched: boolean;
    title: string;
    up: number;
    values?: Array<ComplianceCalculatedValuesDto>;
    violationAmount: number;
}
