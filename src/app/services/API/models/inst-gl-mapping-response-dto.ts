/* tslint:disable */
import { InstGlMappingDto } from './inst-gl-mapping-dto';
export interface InstGlMappingResponseDto {
    items: Array<InstGlMappingDto>;
    limit?: number;
    skip?: number;
    total: number;
}
