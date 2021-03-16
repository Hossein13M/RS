/* tslint:disable */
export interface UserDto {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    partyId: number;
    status: 'Unread' | 'Read' | 'Deleted';
}
