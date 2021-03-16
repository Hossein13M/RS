/* tslint:disable */
import { EventInformPartyForGetEventResponseDto } from './event-inform-party-for-get-event-response-dto';
import { EventLevelAndEventTitleResponseDto } from './event-level-and-event-title-response-dto';
import { EventRelationForGetEventDto } from './event-relation-for-get-event-dto';
import { EventReminderForUpdateEventDto } from './event-reminder-for-update-event-dto';
import { GetEventFieldValueDto } from './get-event-field-value-dto';
export interface EventsForEventDetailsDto {
    code?: string;
    comment?: string;
    endDate?: string;
    entityId: number;
    eventLevel: EventLevelAndEventTitleResponseDto;
    eventRelation: Array<EventRelationForGetEventDto>;
    eventReminder: Array<EventReminderForUpdateEventDto>;
    eventTitle: EventLevelAndEventTitleResponseDto;
    fieldValues: Array<GetEventFieldValueDto>;
    id: number;
    informPartyId: Array<EventInformPartyForGetEventResponseDto>;
    isActive: boolean;
    isAuto: boolean;
    isDeleted: boolean;
    name: string;
    repeatPeriod?: number;
    startDate: string;
    subject?: string;
}
