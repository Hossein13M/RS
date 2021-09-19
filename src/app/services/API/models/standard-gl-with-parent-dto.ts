/* tslint:disable */
import { StandardGlDto } from './standard-gl-dto';

export interface StandardGlWithParentDto {
    accglcode?: number;
    glcode: number;
    gldesc?: string;
    gldescfa?: string;
    glparentcode?: number;
    id: number;
    parent: StandardGlDto;
}
