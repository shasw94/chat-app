import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './groups.repository';
import { GroupUserRepository } from './group_user.respository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ GroupRepository, GroupUserRepository ]),
    AuthModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
