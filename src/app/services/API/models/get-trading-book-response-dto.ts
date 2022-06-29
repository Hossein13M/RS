/* tslint:disable */
import { GetTradingBookDetailsResponseDto } from './get-trading-book-details-response-dto';

export interface GetTradingBookResponseDto {
    details: Array<GetTradingBookDetailsResponseDto>;
    organization: string;
    totalAssets: string;
}
