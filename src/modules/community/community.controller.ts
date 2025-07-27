import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from '../auth/guards/auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { createCommunityDto } from './dtos/createCommunity';
import { UpdateCommunityDto } from './dtos/updateCommunity';

@Controller('community')
export class CommunityController {
    constructor(
        private readonly community: CommunityService
    ){}


                @UseGuards(JwtAuthGuard, RolesGuard)
                @Roles('administrador')
                @Get()
                async getAll(){
                return await this.community.findAll()
                }

                @UseGuards(JwtAuthGuard, RolesGuard)
                @Roles('administrador')
                @Get(':id_community')
                async findbyIdCommunity(@Param('id_community',ParseIntPipe) id_community:number){
                    return await this.community.findbyIdCommunity(id_community);
                }

                @UseGuards(JwtAuthGuard, RolesGuard)
                @Roles('administrador')
                @Post()
                async CreateCommunity(@Body() Create:createCommunityDto){
                    return await this.community.CreateCommunity(Create);
                }
                
                @UseGuards(JwtAuthGuard, RolesGuard)
                @Roles('administrador')
                @Put('id_community')
                async updateCommunity(@Param('id_community',ParseIntPipe) id_community:number , @Body() update:UpdateCommunityDto){
                    return await this.community.updateCommunity(id_community, update)
                }
                @UseGuards(JwtAuthGuard, RolesGuard)
                @Roles('administrador')
                @Delete('id_community')
                async DeleteCommunity(@Param('id_community', ParseIntPipe) id_community:number){
                    return await this.community.deleteCommunity(id_community)
                }


}
