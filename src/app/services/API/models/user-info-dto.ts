/* tslint:disable */
import { UserRole } from './user-role';
export interface UserInfoDto {
    mobileNumber: string;
    status: string;
    userId: number;
    userName: string;
    userRoles: Array<UserRole>;
}
