import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { Messages } from './message.entity';

@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createGroup(@Body() createGroupDto: CreateMessageDto): Promise<Messages> {
        return this.messageService.createMessage(createGroupDto);
    }
}
