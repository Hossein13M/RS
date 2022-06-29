/* tslint:disable */
import { GlListDto } from './gl-list-dto';

export interface GlListResponseDto {
    date?: string;
    items: Array<GlListDto>;
    limit: number;
    skip: number;
    total: number;
}
