import { EntityRepository, Repository } from "typeorm";
import { Messages } from "./message.entity";
import { CreateMessageDto } from "./dto/create-message-dto";
import { NotFoundException } from "@nestjs/common";
import { GetMessageDto } from "./dto/get-message-dto";

@EntityRepository(Messages)
export class MessageRepository extends Repository<Messages> {
    async createMessage(createMessageDto : CreateMessageDto) {
        const {message, senderId, receiverId } = createMessageDto;
        const msg = new Messages();
        msg.message = message;
        msg.senderId = senderId;
        msg.receiverId = receiverId;
        await msg.save();

        return msg; 
    }

    async getMessagesOfGroup(getMessageDto: GetMessageDto) : Promise<Messages[]> {
        const groupId = getMessageDto.id;

        const messages : Messages[] = await this.find({where: {receiverId: groupId}, relations:['sender', 'receiver']});

        if (!messages) {
            throw new NotFoundException('No messages were found')
        }

        return messages;
    }
}