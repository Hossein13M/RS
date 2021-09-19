/* tslint:disable */
import { Envelope } from './envelope';

export interface ResponseEmailDto {
    accepted: Array<string>;
    envelope: Envelope;
    messageId: string;
    rejected: Array<string>;
}
