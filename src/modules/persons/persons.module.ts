import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Persons } from 'src/models/persons.model';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { Users } from 'src/models/users.model';
import { UsersModule } from '../users/users.module';
import PersonRepository from './persons.repository';

@Module({
    imports:[
        SequelizeModule.forFeature([Persons,Users]),
        forwardRef(()=> UsersModule)
        
    ],
    controllers: [PersonsController],
    providers: [PersonsService,PersonRepository]
})
export class PersonsModule {}
