import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class SocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private logger: Logger = new Logger('SocketsGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: '  ${client.id}`);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: '  ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    // client.emit('msgToClient, text)---> equivalent below with type safety
    return {event: 'msgToServer', data: text};
  }
}
