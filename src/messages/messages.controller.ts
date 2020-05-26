import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { Messages } from './message.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetMessageDto } from './dto/get-message-dto';

@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService) {}

    @Post('/createMessage')
    @UsePipes(ValidationPipe)
    createGroup(@Body() createMessageDto: CreateMessageDto): Promise<Messages> {
        return this.messageService.createMessage(createMessageDto);
    }

    @Post('/getMessages')
    @UseGuards(AuthGuard())
    getMessagesOfRoom(@Body() getMessageDto: GetMessageDto): Promise<Messages[]>{
        return this.messageService.getMessagesOfGroup(getMessageDto);
    }
    
}
