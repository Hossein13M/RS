/* tslint:disable */
import { StandardGlDto } from './standard-gl-dto';

export interface StandardGlWithChildDto {
    accglcode?: number;
    children: StandardGlDto;
    glcode: number;
    gldesc?: string;
    gldescfa?: string;
    glparentcode?: number;
    id: number;
}
