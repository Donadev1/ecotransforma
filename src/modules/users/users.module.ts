import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { UsersRepository } from './user.repository';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
