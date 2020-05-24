import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { SocketsModule } from './sockets/sockets.module';
import { SocketsGateway } from './sockets/sockets.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    SocketsModule
  ],
  providers: [SocketsGateway],
})
export class AppModule {}
