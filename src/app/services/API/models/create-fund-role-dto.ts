/* tslint:disable */
export interface CreateFundRoleDto {
    address?: string;
    agentName?: string;
    agentPhone?: string;
    hasSupervisor?: boolean;
    name: string;
    nationalId: string;
    organizationSupervisorIds?: Array<number>;
    organizationTypeId?: number;
    phone?: string;

    /**
     * 2020-01-04
     */
    regDate?: string;
    regNumber: string;
}
