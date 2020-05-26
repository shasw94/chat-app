import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Groups } from "./groups.entity";
import { User } from "src/auth/user.entity";

@Entity()
export class GroupUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    groupsId: number;

    @ManyToOne(type=> Groups, groups => groups.groupUsers, {eager: false})
    groups: Groups[];

    @ManyToOne(type=>User, user => user.groupUser, {eager: false})
    users: User[];

    @Column()
    usersId: number;
}