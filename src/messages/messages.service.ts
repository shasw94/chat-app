import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import { CreateMessageDto } from './dto/create-message-dto';
import { Messages } from './message.entity';
import { GetMessageDto } from './dto/get-message-dto';

@Injectable()
export class MessagesService {

    constructor (
        @InjectRepository(MessageRepository)
        private messageRepository: MessageRepository,
    ){}

    async createMessage(createMessageDto: CreateMessageDto): Promise<Messages> {
        return this.messageRepository.createMessage(createMessageDto);
    }
    
    async getMessagesOfGroup( getMessageDto: GetMessageDto ) : Promise<Messages[]> {
        return this.messageRepository.getMessagesOfGroup(getMessageDto);
    }
}
