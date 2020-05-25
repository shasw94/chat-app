import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsModule } from 'src/groups/groups.module';
import { SocketsGateway } from './sockets.gateway';

@Module({
    imports: [AuthModule, GroupsModule],
    providers: [SocketsGateway]
})
export class SocketsModule {}
