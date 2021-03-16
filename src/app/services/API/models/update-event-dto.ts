/* tslint:disable */
import { EventInformPartyForUpdateEventDto } from './event-inform-party-for-update-event-dto';
import { EventRelationForUpdateEventDto } from './event-relation-for-update-event-dto';
import { EventReminderForUpdateEventDto } from './event-reminder-for-update-event-dto';
export interface UpdateEventDto {
    code?: string;
    comment?: string;
    endDate?: string;
    entityId: number;
    eventLevel: number;
    eventTitle: number;
    informParty: EventInformPartyForUpdateEventDto;
    isActive: boolean;
    isAuto: boolean;
    isDeleted: boolean;
    name: string;
    relation: Array<EventRelationForUpdateEventDto>;
    reminder: Array<EventReminderForUpdateEventDto>;
    repeatPeriod?: number;
    startDate: string;
    subject?: string;
}
