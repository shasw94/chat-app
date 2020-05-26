import { IsNumber } from "class-validator";

export class GetMessageDto {

    @IsNumber()
    id: number;
}