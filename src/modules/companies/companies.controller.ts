import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompaniesDto } from './dtos/create.companies.dto';
import { UpdateCompaniesDto } from './dtos/update.companies.dto';
import { Roles } from '../auth/decorators/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Get()
    async getAllCompanies() {
        return this.companiesService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Get(':id_company')
    async getCompanyById(@Param('id_company', ParseIntPipe) id_company: number) {
        return this.companiesService.findOne(id_company);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Get('nit/:nit')
    async getCompanyByNit(@Param('nit') nit: string) {
        return this.companiesService.findByNit(nit);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCompany(@Body() createCompaniesDto: CreateCompaniesDto) {
        return this.companiesService.createCompany(createCompaniesDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Put(':id_company')
    async updateCompany(
        @Param('id_company', ParseIntPipe) id_company: number,
        @Body() updateCompaniesDto: UpdateCompaniesDto
    ) {
        return this.companiesService.updateCompany(id_company, updateCompaniesDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('administrador')
    @Delete(':id_company')
    @HttpCode(HttpStatus.OK)
    async deleteCompany(@Param('id_company', ParseIntPipe) id_company: number) {
        return this.companiesService.deleteCompany(id_company);
    }
}