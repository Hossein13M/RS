/* tslint:disable */
import { UserRole } from './user-role';

export interface UserInfoWithTokenDto {
    accessToken: string;
    mobileNumber: string;
    refreshToken: string;
    status: string;
    userId: number;
    userName: string;
    userRoles: Array<UserRole>;
}
