import { SubscribeMessage, WebSocketGateway,  WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as socketioJwt from 'socketio-jwt';
import { CreateMessageDto } from 'src/messages/dto/create-message-dto';
import { Messages } from 'src/messages/message.entity';


@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit {

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SocketGateway');

  afterInit(server: any) {
    this.logger.log('INITIALIZED');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: {sender: string, group: string, text: string, username: string, room: string}): void {
    console.log(payload, client.id);
    // this.server.emit('chatToClient', payload);
    this.server.to(payload.room).emit('chatToClient', payload);
    let dto = new CreateMessageDto();
    dto.message = payload.text;
    dto.senderId = +payload.sender;
    dto.receiverId = +payload.group;
    this.createMessage(dto);
  }

  async createMessage(createMessageDto: CreateMessageDto ) : Promise<Messages>{
    const {message, senderId, receiverId } = createMessageDto;
        const msg = new Messages();
        msg.message = message;
        msg.senderId = senderId;
        msg.receiverId = receiverId;
        await msg.save();

        return msg; 
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, group: string) {
    console.log('someone joined' , group);
    client.join(group);
    client.emit('joinedRoom', group);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, group: string ) {
    console.log('someone left' , group);
    client.leave(group)
    client.emit('leftRoom', group);
  }

}
