import { IsString, MinLength, MaxLength, IsNumber } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}