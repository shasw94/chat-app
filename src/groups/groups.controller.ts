import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { GroupRepository } from './groups.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from './groups.entity';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateGroupUserDto } from './dto/create-group_user-dto';
import { GroupUser } from './group_user.entity';

@Controller('groups')
export class GroupsController {
    constructor (private groupService: GroupsService) {}
   
    @Get('/:id')
    getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Groups> {
        return this.groupService.getGroupById(id);
    }

    @Post('/createGroup')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createGroup(@Body() createGroupDto: CreateGroupDto, @GetUser() user): Promise<Groups> {
        return this.groupService.createGroup(createGroupDto, user);
    }

    @Post('/creatGroupUser')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createGroupUser(@Body() createGroupUserDto: CreateGroupUserDto): Promise<GroupUser> {
        return this.groupService.createGroupUser(createGroupUserDto);
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
