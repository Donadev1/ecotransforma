import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ActivityRequestService } from './activity_request.service';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { JwtAuthGuard } from '../auth/guards/auth/auth.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import ActivityRequestDto from './dtos/createActivity.dto';
import { UpdateActivityDto } from './dtos/updateActivity.dto';

@Controller('activity-request')
export class ActivityRequestController {
    constructor(
        private readonly activityService: ActivityRequestService
    ){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Get()
    async findAll(){
        return await this.activityService.findAll()
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Get(':id_request')
    async findById(@Param('id_request', ParseIntPipe) id_request:number){
        return await this.activityService.findById(id_request);
    }

    //aqui no va los guards porque este seria el que consumirias en el front despues no te dejaria enviarlo si no estas logueado    
    @Post()
    async createActivity(@Body()createActivity:ActivityRequestDto){
        return await this.activityService.createActivity(createActivity);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Put(':id_request')
    async UpdateActivity(@Param('id_request',ParseIntPipe) id_request:number , @Body()updateActivity:UpdateActivityDto){
        return await this.activityService.UpdateActivity(id_request, updateActivity);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Delete(':id_request')
    async DeleteActivity(@Param('id_request',ParseIntPipe) id_request:number){
        return  await this.activityService.DeleteActivity(id_request);
    }
}
