import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CompaniesRepositoy } from './companies.repository';
import { CreateCompaniesDto } from './dtos/create.companies.dto';
import { UpdateCompaniesDto } from './dtos/update.companies.dto';
import { Companies } from 'src/models/companies.model';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly companiesRepository: CompaniesRepositoy
    ) {}

    async findAll(): Promise<Companies[]> {
        return this.companiesRepository.findall();
    }

    async findOne(id_company: number): Promise<Companies> {
        const company = await this.companiesRepository.findByIdCompany(id_company);
        
        if (!company) {
            throw new NotFoundException(`Company with ID ${id_company} not found`);
        }
        
        return company;
    }

    async findByNit(nit: string): Promise<Companies | null> {
        return this.companiesRepository.findByNit(nit);
    }

    async createCompany(createCompaniesDto: CreateCompaniesDto): Promise<Companies> {
        try {
            // Verificar si ya existe una empresa con ese NIT
            const existingCompany = await this.findByNit(createCompaniesDto.nit);
            
            if (existingCompany) {
                throw new ConflictException(`A company with NIT ${createCompaniesDto.nit} already exists`);
            }

            console.log('Creating company with data:', createCompaniesDto);
            const result = await this.companiesRepository.CreateCompanies(createCompaniesDto);
            console.log('Company created successfully:', result.toJSON());
            
            return result;
        } catch (error) {
            console.error('Error creating company:', error);
            throw error;
        }
    }

    async updateCompany(id_company: number, updateCompaniesDto: UpdateCompaniesDto): Promise<Companies> {
        try {
            // Verificar que la empresa existe
            const existingCompany = await this.companiesRepository.findByIdCompany(id_company);
            
            if (!existingCompany) {
                throw new NotFoundException(`Company with ID ${id_company} not found`);
            }

            // Si se está actualizando el NIT, verificar que no exista otro con ese NIT
            if (updateCompaniesDto.nit && updateCompaniesDto.nit !== existingCompany.nit) {
                const companyWithSameNit = await this.findByNit(updateCompaniesDto.nit);
                
                if (companyWithSameNit) {
                    throw new ConflictException(`Another company with NIT ${updateCompaniesDto.nit} already exists`);
                }
            }

            console.log(`Updating company ${id_company} with data:`, updateCompaniesDto);
            const result = await this.companiesRepository.UpdateCompanies(id_company, updateCompaniesDto);
            
            if (!result) {
                throw new NotFoundException(`Failed to update company with ID ${id_company}`);
            }

            console.log('Company updated successfully:', result.toJSON());
            return result;
        } catch (error) {
            console.error(`Error updating company ${id_company}:`, error);
            throw error;
        }
    }

    async deleteCompany(id_company: number): Promise<{ message: string }> {
        
        const existingCompany = await this.companiesRepository.findByIdCompany(id_company);
        
        if (!existingCompany) {
            throw new NotFoundException(`Company with ID ${id_company} not found`);
        }

        const deleted = await this.companiesRepository.DeleteCompanies(id_company);
        
        if (!deleted) {
            throw new NotFoundException(`Failed to delete company with ID ${id_company}`);
        }

        return { message: `Company with ID ${id_company} deleted successfully` };
    }
}