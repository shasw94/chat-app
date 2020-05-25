import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}