/* tslint:disable */
import { GetFlowResponseCategoryDto } from './get-flow-response-category-dto';

export interface GetFlowResponseDto {
    _id: string;
    attributes: {};
    category: GetFlowResponseCategoryDto;
    date: string;
    isActive: boolean;
    name: string;
}
