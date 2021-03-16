/* tslint:disable */
import { InstrumentDto } from './instrument-dto';
export interface InstrumentWithChildDto {
    children: InstrumentDto;
    code: number;
    id: number;
    name: string;
    nameEn: string;
}
