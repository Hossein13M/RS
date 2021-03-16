/* tslint:disable */
export interface UpdateFundRoleDto {
    address?: string;
    agentName?: string;
    agentPhone?: string;
    hasSupervisor?: boolean;
    id: number;
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
