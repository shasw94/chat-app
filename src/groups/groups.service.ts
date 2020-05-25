import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from './groups.repository';
import { Groups } from './groups.entity';
import { CreateGroupDto } from './dto/create-group-dto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(GroupRepository)
        private groupRepository: GroupRepository,
    ){ }

    async getGroupById(id: number) : Promise<Groups>{
        const found = await this.groupRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Group with ID "${id}" not found` );
        }
        return found;
    }

    async createGroup(createGroupDto: CreateGroupDto): Promise<Groups> {
        return this.groupRepository.createGroup(createGroupDto);
    }
}
