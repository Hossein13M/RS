/* tslint:disable */
import { GetEventFieldDto } from './get-event-field-dto';
import { GetEventTitleDto } from './get-event-title-dto';

export interface GetEventTitleFieldDto {
    deletedAt: string;
    eventField: GetEventFieldDto;
    eventTitle: GetEventTitleDto;
    id: number;
}
