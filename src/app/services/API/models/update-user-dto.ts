/* tslint:disable */
export interface UpdateUserDto {
    mobileNumber?: string;
    status?: 'Active' | 'Inactive' | 'Blocked';
    userId: number;
    userName?: string;
}
