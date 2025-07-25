import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/auth/auth.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import CreateVolunteersDto from './dtos/create.volunteersdto';
import { UpdateVolunteersDto } from './dtos/update.volunteersdto';

@Controller('volunteers')
export class VolunteersController {
    constructor(
            private readonly volunteerService: VolunteersService
        ){}
    
        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles('administrador')
        @Get()
        async findAll(){
            return await this.volunteerService.findAll()
        }
    
        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles('administrador')
        @Get(':id_volunteer')
        async findById(@Param('id_volunteer', ParseIntPipe) id_volunteer:number){
            return await this.volunteerService.findById(id_volunteer);
        }
    
        
        @Post()
        async createVolunteer(@Body()createVolunteers:CreateVolunteersDto){
            return await this.volunteerService.createVolunteer(createVolunteers);
        }

        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles('administrador')
        @Put(':id_volunteer')
        async UpdateVolunteer(@Param('id_volunteer',ParseIntPipe) id_volunteer:number , @Body()updatevolunteer:UpdateVolunteersDto){
            return await this.volunteerService.update(id_volunteer, updatevolunteer);
        }
    
        @UseGuards(JwtAuthGuard, RolesGuard)
        @Roles('administrador')
        @Delete(':id_volunteer')
        async DeleteActivity(@Param('id_volunteer',ParseIntPipe) id_volunteer:number){
            return  await this.volunteerService.delete(id_volunteer);
        }
    }
    

