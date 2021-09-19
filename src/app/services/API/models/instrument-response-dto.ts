/* tslint:disable */
import { InstrumentWithIdDto } from './instrument-with-id-dto';

export interface InstrumentResponseDto {
    items: Array<InstrumentWithIdDto>;
    limit?: number;
    skip?: number;
    total: number;
}
