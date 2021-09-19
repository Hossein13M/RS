/* tslint:disable */
import { OrganiztionSupervisorItem } from './organiztion-supervisor-item';

export interface FundRoleWithIdDto {
    address?: string;
    agentName?: string;
    agentPhone?: string;
    hasSupervisor?: boolean;
    id: number;
    name: string;
    nationalId: string;
    organizationSupervisors: Array<OrganiztionSupervisorItem>;
    organizationTypeName?: string;
    phone?: string;

    /**
     * 2020-01-04
     */
    regDate?: string;
    regNumber: string;
}
