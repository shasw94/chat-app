import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from './groups.repository';
import { Groups } from './groups.entity';
import { CreateGroupDto } from './dto/create-group-dto';
import { User } from 'src/auth/user.entity';
import { GroupUser } from './group_user.entity';
import { GroupUserRepository } from './group_user.respository';
import { CreateGroupUserDto } from './dto/create-group_user-dto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(GroupRepository)
        @InjectRepository(GroupUserRepository)
        private groupRepository: GroupRepository,
        private groupUserRepository: GroupUserRepository
    ){ }

    async getGroupById(id: number) : Promise<Groups>{
        const found = await this.groupRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Group with ID "${id}" not found` );
        }
        return found;
    }

    async createGroup(createGroupDto: CreateGroupDto, users): Promise<Groups> {
        const groups = this.groupRepository.createGroup(createGroupDto);
        console.log("users", users.id);
        
        const usersid = users.id;
        let grpUser = new CreateGroupUserDto()
        grpUser.usersid = usersid;
        grpUser.groupsid = (await groups).id;
        console.log(grpUser.groupsid);
        const temp = await this.groupUserRepository.createGroupUser(grpUser);
        return groups;
    }

    async createGroupUser(createGroupUserDto: CreateGroupUserDto): Promise<GroupUser> {
        return this.groupUserRepository.createGroupUser(createGroupUserDto);
    }

    async getGroupsOfUser(user: User): Promise<GroupUser[]> {

        // const groups = await this.groupUserRepository.find({
        //     join: { alias: 'groupusers', innerJoin: { groups: 'groupusers.groups'} },
        //     where: qb => {
        //         qb.where('groups.isPrivate = :bool', {bool: false})
        //         .andWhere('groupusers.usersId = :id', { id: user.id});
        //     }, relations:['groups']
        // });

        // const groups = await this.groupUserRepository.find({})


        const groups = await (await GroupUser.find({where: {usersId: user.id}, relations:['groups']}))
        if (!groups) {
            throw new NotFoundException(`User not associated with any room`);
        }
        
        return groups;
    }

    async getUsersOfGroup(user: User): Promise<GroupUser[]> {

        const users: GroupUser[] = await GroupUser.find({where: {groupsId: user.id}, relations:['users']})
        if (!users) {
            throw new NotFoundException(`User not associated with any room`);
        }
        return users;
    }

}
