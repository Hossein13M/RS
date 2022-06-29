/* tslint:disable */
import { NewInstrumentDto } from './new-instrument-dto';

export interface NewInstrumentListResponseDto {
    items: Array<NewInstrumentDto>;
    limit?: number;
    skip?: number;
    total: number;
}
