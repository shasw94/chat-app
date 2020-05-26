import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Messages } from "src/messages/message.entity";
import { User } from "src/auth/user.entity";
import { GroupUser } from "./group_user.entity";

@Entity()
export class Groups extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('boolean', {default: true})
    isPrivate: boolean;

    @OneToMany(type => Messages, message => message.receiver, { eager: true })
    messages: Messages[];

    @OneToMany(type=>GroupUser, gu => gu.groups, {eager: true})
    groupUsers: GroupUser[];

}