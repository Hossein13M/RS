/* tslint:disable */
import { FromUserDto } from './from-user-dto';
import { ToUserDto } from './to-user-dto';
export interface MessageResponseDto {
    body: string;
    fromUser: FromUserDto;
    id: number;
    submitDate: string;
    systemMessage?: boolean;
    title: string;
    toUsers: Array<ToUserDto>;
}
