/* tslint:disable */
import { InstrumentDto } from './instrument-dto';
export interface InstrumentWithParentDto {
    code: number;
    id: number;
    name: string;
    nameEn: string;
    parent: InstrumentDto;
}
