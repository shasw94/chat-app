import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { GroupRepository } from './groups.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from './groups.entity';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('groups')
export class GroupsController {
    constructor (private groupService: GroupsService) {}
   
    @Get('/:id')
    getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Groups> {
        return this.groupService.getGroupById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Groups> {
        return this.groupService.createGroup(createGroupDto);
    }

    @Post('/listGroupsOfUser')
    @UseGuards(AuthGuard())
    getGroupsOfUser(@GetUser() user) {
        return this.groupService.getGroupsOfUser(user);
    }

    @Post('/listUsersOfGroup')
    @UseGuards(AuthGuard())
    getUsersOfGroup(@GetUser() user) {
        return this.groupService.getUsersOfGroup(user);
    }

}
