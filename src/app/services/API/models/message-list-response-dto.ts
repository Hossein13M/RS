/* tslint:disable */
import { ItemMessageDto } from './item-message-dto';
export interface MessageListResponseDto {
    items: Array<ItemMessageDto>;
    limit?: number;
    skip?: number;
    total: number;
}
