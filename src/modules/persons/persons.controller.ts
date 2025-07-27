import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { JwtAuthGuard } from '../auth/guards/auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { CreatePersonDto } from './dtos/createpersondto';
import { UpdatePersonDto } from './dtos/updatepersondto';

@Controller('persons')
export class PersonsController {
    constructor(
        private readonly personService:PersonsService
    ){}

            @UseGuards(JwtAuthGuard, RolesGuard)
            @Roles('administrador')
            @Get()
            async findAll(){
                return await this.personService.findAllPersons()
            }

            @UseGuards(JwtAuthGuard, RolesGuard)
            @Roles('administrador')
            @Get(':id_person')
            async findById(@Param('id_person', ParseIntPipe) id_person:number){
                return await this.personService.findbyIdPerson(id_person);
            }

            @UseGuards(JwtAuthGuard, RolesGuard)
            @Roles('administrador')
            @Post()
            async CreatePerson(@Body() createPerson:CreatePersonDto){
                 console.log('=== CONTROLLER ===');
                 console.log('Body recibido:', createPerson);
                return await this.personService.CreatePerson(createPerson);
            }

            @UseGuards(JwtAuthGuard, RolesGuard)
            @Roles('administrador')
            @Put(':id_person')
            async updatePerson(@Param('id_person', ParseIntPipe) id_person:number ,@Body() updatePerson:UpdatePersonDto){
                return await this.personService.updatePerson(id_person , updatePerson)
            }

            @UseGuards(JwtAuthGuard, RolesGuard)
            @Roles('administrador')
            @Delete(':id_person')
            async delete(@Param('id_person', ParseIntPipe) id_person: number){
                return await this.personService.delete(id_person)
            }



}
