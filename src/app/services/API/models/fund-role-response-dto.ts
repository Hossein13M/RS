/* tslint:disable */
import { FundRoleWithIdDto } from './fund-role-with-id-dto';
export interface FundRoleResponseDto {
    items: Array<FundRoleWithIdDto>;
    limit?: number;
    skip?: number;
    total: number;
}
