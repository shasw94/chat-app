import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from './groups.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ GroupRepository ])
  ],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
