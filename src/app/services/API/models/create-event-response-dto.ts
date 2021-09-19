/* tslint:disable */
import { EventLevelAndEventTitleResponseDto } from './event-level-and-event-title-response-dto';

export interface CreateEventResponseDto {
    code?: string;
    comment?: string;
    endDate?: string;
    entityId: number;
    eventLevel: EventLevelAndEventTitleResponseDto;
    eventTitle: EventLevelAndEventTitleResponseDto;
    id: number;
    isActive: boolean;
    isAuto: boolean;
    isDeleted: boolean;
    name: string;
    repeatPeriod?: number;
    startDate: string;
    subject?: string;
}
