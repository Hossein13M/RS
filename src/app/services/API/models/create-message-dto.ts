/* tslint:disable */
export interface CreateMessageDto {
    body: string;
    systemMessage?: boolean;
    title: string;
    toUsers: Array<number>;
}
