import { forwardRef, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Companies } from 'src/models/companies.model';
import { UsersModule } from '../users/users.module';
import { Users } from 'src/models/users.model';
import { CompaniesRepositoy } from './companies.repository';

@Module({
  imports:[
    SequelizeModule.forFeature([Companies,Users]),
    forwardRef(()=>UsersModule)
  ],
  providers: [CompaniesService,CompaniesRepositoy],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
