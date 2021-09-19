/* tslint:disable */
import { EventFieldsForEventDetailDto } from './event-fields-for-event-detail-dto';
import { EventsForEventDetailsDto } from './events-for-event-details-dto';

export interface GetEventDetailsResponseDto {
    eventFields: Array<EventFieldsForEventDetailDto>;
    events: Array<EventsForEventDetailsDto>;
}
