import { IsNumber } from "class-validator";

export class CreateGroupUserDto {
    @IsNumber()
    usersid: number;
    
    @IsNumber()
    groupsid: number;
}