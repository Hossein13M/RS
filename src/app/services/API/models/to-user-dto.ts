/* tslint:disable */
export interface ToUserDto {
    id: number;
    partyId: number;
    status: 'Unread' | 'Read' | 'Deleted';
}
