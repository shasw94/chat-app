import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Messages } from "src/messages/message.entity";
import { GroupUser } from "src/groups/group_user.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Messages, message => message.sender, {eager: true})
    senders: Messages[];

    @OneToMany(type => GroupUser, gu => gu.users, {eager: true})
    groupUser: GroupUser[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash == this.password;
    }
}
