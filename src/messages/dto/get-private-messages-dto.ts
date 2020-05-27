import { IsNumber } from "class-validator";

export class GetPrivateMessageDto {

    @IsNumber()
    userId: number

    @IsNumber()
    groups: number[];

}