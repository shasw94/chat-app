import { EntityRepository, Repository } from "typeorm";
import { GroupUser } from "./group_user.entity";
import { CreateGroupUserDto } from "./dto/create-group_user-dto";
import { NotFoundException } from "@nestjs/common";


@EntityRepository(GroupUser)
export class GroupUserRepository extends Repository<GroupUser> {
    async createGroupUser(createGroupUserDto: CreateGroupUserDto): Promise<GroupUser> {
        const { groupsid, usersid } = createGroupUserDto;
        const groupuser = new GroupUser();
        try {
            groupuser.usersId = usersid;
            groupuser.groupsId = groupsid;
            await groupuser.save();

        } catch {
            throw new NotFoundException(`Invalid ids provided`);
        }
        return groupuser;
    }
}