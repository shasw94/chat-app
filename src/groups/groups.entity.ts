import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Messages } from "src/messages/message.entity";
import { User } from "src/auth/user.entity";

@Entity()
export class Groups extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Messages, message => message.receiver, { eager: true })
    messages: Messages[];

    @ManyToMany(type => User)
    @JoinTable()
    users: User[]
}