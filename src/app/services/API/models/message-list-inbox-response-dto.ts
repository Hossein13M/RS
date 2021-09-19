/* tslint:disable */
import { ItemMessageInboxDto } from './item-message-inbox-dto';

export interface MessageListInboxResponseDto {
    items: Array<ItemMessageInboxDto>;
    limit?: number;
    skip?: number;
    total: number;
}
