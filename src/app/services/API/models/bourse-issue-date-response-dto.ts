/* tslint:disable */
import { BourseIssueDateDto } from './bourse-issue-date-dto';
export interface BourseIssueDateResponseDto {
    items: Array<BourseIssueDateDto>;
    limit?: number;
    skip?: number;
    total: number;
}
