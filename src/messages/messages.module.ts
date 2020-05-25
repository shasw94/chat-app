import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ MessageRepository ])
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
