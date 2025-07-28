import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { UsersRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { Persons } from 'src/models/persons.model';
import { Community } from 'src/models/community.model';
import { PersonsModule } from '../persons/persons.module';
import { CommunityModule } from '../community/community.module';
import { CompaniesModule } from '../companies/companies.module';
import { Companies } from 'src/models/companies.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Users,Persons,Community,Companies]),
    forwardRef(() => AuthModule),
    forwardRef(()=> PersonsModule),
    forwardRef(()=> CommunityModule),
    forwardRef(()=>CompaniesModule)
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
