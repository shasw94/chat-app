import { EntityRepository, Repository } from "typeorm";
import { Messages } from "./message.entity";
import { CreateMessageDto } from "./dto/create-message-dto";

@EntityRepository(Messages)
export class MessageRepository extends Repository<Messages> {
    async createMessage(createMessageDto : CreateMessageDto) {
        const {message} = createMessageDto;
        const msg = new Messages();
        msg.message = name;

        await msg.save();

        return msg; 
    }
}