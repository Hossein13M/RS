/* tslint:disable */
import { StandardGlWithIdDto } from './standard-gl-with-id-dto';

export interface StandardGlResponseDto {
    items: Array<StandardGlWithIdDto>;
    limit?: number;
    skip?: number;
    total: number;
}
