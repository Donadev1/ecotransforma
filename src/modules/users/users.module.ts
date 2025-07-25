import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { UsersRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { Persons } from 'src/models/persons.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Users,Persons]),
    forwardRef(() => AuthModule)
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
