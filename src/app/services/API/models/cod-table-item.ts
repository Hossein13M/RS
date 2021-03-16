/* tslint:disable */
import { CodDetail } from './cod-detail';
export interface CodTableItem {
    averageInterst?: number;
    details?: Array<CodDetail>;
    name?: string;
    percentOfTotal?: number;
    sum?: number;
}
