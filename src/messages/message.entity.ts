import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";
import { Groups } from "src/groups/groups.entity";

@Entity()
export class Messages extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;
    
    @ManyToOne(type => User, user => user.senders, {eager: false})
    sender: User;

    @Column()
    senderId: number;


    @ManyToOne(type=> Groups, group => group.messages, {eager: false})
    receiver: Groups;

    @Column()
    receiverId: number;
}