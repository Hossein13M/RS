/* tslint:disable */
import { FieldsForEventTitleDto } from './fields-for-event-title-dto';
import { GetEventTitleDto } from './get-event-title-dto';

export interface FindEventTitleFieldDto {
    eventFields: Array<FieldsForEventTitleDto>;
    eventTitle: GetEventTitleDto;
}
