/* tslint:disable */
import { InstrumentTypeDto } from './instrument-type-dto';
export interface InstrumentTypeListResponseDto {
    items: Array<InstrumentTypeDto>;
    limit?: number;
    skip?: number;
    total: number;
}
