/* tslint:disable */
import { EventInformPartyForGetEventResponseDto } from './event-inform-party-for-get-event-response-dto';
import { EventLevelAndEventTitleResponseDto } from './event-level-and-event-title-response-dto';
import { EventRelationForGetEventDto } from './event-relation-for-get-event-dto';
import { EventReminderForUpdateEventDto } from './event-reminder-for-update-event-dto';

export interface GetEventsResponseDto {
    code?: string;
    comment?: string;
    endDate?: string;
    entityId: number;
    eventLevel: EventLevelAndEventTitleResponseDto;
    eventRelation: Array<EventRelationForGetEventDto>;
    eventReminder: Array<EventReminderForUpdateEventDto>;
    eventTitle: EventLevelAndEventTitleResponseDto;
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
