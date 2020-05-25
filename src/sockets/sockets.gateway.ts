import { SubscribeMessage, WebSocketGateway,  WebSocketServer } from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import * as socketioJwt from 'socketio-jwt';


@WebSocketGateway(1080, { namespace: 'groups' })
export class SocketsGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;

  onModuleInit(): void {
    this.server.use(socketioJwt.authorize({
      secret: 'superSecretKey',
      handshake: true,
    }));
  }

  

}
