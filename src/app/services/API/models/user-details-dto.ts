/* tslint:disable */
import { UserRoleDetails } from './user-role-details';
export interface UserDetailsDto {
    mobileNumber: string;
    status: string;
    userId: number;
    userName: string;
    userRoles: Array<UserRoleDetails>;
}
