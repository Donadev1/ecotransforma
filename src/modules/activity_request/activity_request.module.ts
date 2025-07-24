import { Module } from '@nestjs/common';
import { ActivityRequestController } from './activity_request.controller';
import { ActivityRequestService } from './activity_request.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ActivityRequest } from 'src/models/activity-request.model';
import ActivityRequestRepository from './activity_request.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([ActivityRequest])
  ],
  controllers: [ActivityRequestController],
  providers: [ActivityRequestService,ActivityRequestRepository]
})
export class ActivityRequestModule {}
