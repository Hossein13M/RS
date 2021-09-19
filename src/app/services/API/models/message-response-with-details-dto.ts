/* tslint:disable */
import { UserDto } from './user-dto';

export interface MessageResponseWithDetailsDto {
    body: string;
    fromUser: UserDto;
    id: number;
    submitDate: string;
    systemMessage?: boolean;
    title: string;
    toUsers: Array<UserDto>;
}
