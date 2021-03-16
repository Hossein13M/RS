/* tslint:disable */
import { EventInformPartyForUpdateEventDto } from './event-inform-party-for-update-event-dto';
import { EventRelationForCreateEventDto } from './event-relation-for-create-event-dto';
import { EventReminderForCreateEventDto } from './event-reminder-for-create-event-dto';
export interface CreateEventDto {
    code?: string;
    comment?: string;
    endDate?: string;
    entityId: number;
    eventLevel: number;
    eventTitle: number;
    informParty?: EventInformPartyForUpdateEventDto;
    isActive: boolean;
    isAuto: boolean;
    name: string;
    needReminder: boolean;
    relation: Array<EventRelationForCreateEventDto>;
    reminder?: Array<EventReminderForCreateEventDto>;
    repeatPeriod?: number;
    startDate: string;
    subject?: string;
}
