import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Persons } from 'src/models/persons.model';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { Users } from 'src/models/users.model';

@Module({
    imports:[
        SequelizeModule.forFeature([Persons])
        
    ],
    controllers: [PersonsController],
    providers: [PersonsService]
})
export class PersonsModule {}
