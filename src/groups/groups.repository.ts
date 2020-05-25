import { Repository, EntityRepository } from "typeorm";
import { Groups } from "./groups.entity";
import { CreateGroupDto } from "./dto/create-group-dto";

@EntityRepository(Groups)
export class GroupRepository extends Repository<Groups> {
    async createGroup(createGroupDto: CreateGroupDto): Promise<Groups> {
        const {name} = createGroupDto;
        const group = new Groups();
        group.name = name;

        await group.save();

        return group;
    }
}