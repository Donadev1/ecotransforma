import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Volunteers } from 'src/models/voluntarios.model';
import { VolunteersController } from './volunteers.controller';
import { VolunteersService } from './volunteers.service';
import VolunteersRepository from './volunteers.respository';

@Module({
    imports: [
        SequelizeModule.forFeature([Volunteers])
    ],
    providers: [VolunteersService,VolunteersRepository],
    controllers: [VolunteersController]
})
export class VolunteersModule {}
