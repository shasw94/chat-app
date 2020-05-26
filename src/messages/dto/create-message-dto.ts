import { IsString, IsNumber } from "class-validator";

export class CreateMessageDto {
    @IsString()
    message: string;

    @IsNumber()
    senderId: number;

    @IsNumber()
    receiverId: number;
}