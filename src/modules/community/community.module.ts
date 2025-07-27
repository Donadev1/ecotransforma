import { forwardRef, Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Community } from 'src/models/community.model';
import { Users } from 'src/models/users.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    SequelizeModule.forFeature([Community, Users]),
    forwardRef(()=> UsersModule)
  ],
  providers: [CommunityService],
  controllers: [CommunityController]
})
export class CommunityModule {}
