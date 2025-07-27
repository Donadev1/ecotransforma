import { forwardRef, Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Community } from 'src/models/community.model';
import { Users } from 'src/models/users.model';
import { UsersModule } from '../users/users.module';
import { CommunityRepository } from './community.repository';

@Module({
  imports:[
    SequelizeModule.forFeature([Community, Users]),
    forwardRef(()=> UsersModule)
  ],
  providers: [CommunityService, CommunityRepository],
  controllers: [CommunityController]
})
export class CommunityModule {}
