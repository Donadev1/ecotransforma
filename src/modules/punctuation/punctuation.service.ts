import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PunctuationRepository } from './punctuation.repository';
import { CreatePunctuationDto } from './dtos/createdto';
import { UpdatePunctuationDto } from './dtos/updatedto';
import { Punctuation } from 'src/models/punctuation.model';

@Injectable()
export class PunctuationService {
    constructor(
        private readonly punctuationRepository: PunctuationRepository
    ) {}

    async findAll(): Promise<Punctuation[]> {
        return this.punctuationRepository.findAll();
    }

    async findOne(id_punctuation: number): Promise<Punctuation> {
        const punctuation = await this.punctuationRepository.findByIdPunctuation(id_punctuation);
        
        if (!punctuation) {
            throw new NotFoundException(`Punctuation with ID ${id_punctuation} not found`);
        }
        
        return punctuation;
    }

    async findByPersonId(person_id: number): Promise<Punctuation[]> {
        return this.punctuationRepository.findByPersonId(person_id);
    }

    async findByCommunityId(community_id: number): Promise<Punctuation[]> {
        return this.punctuationRepository.findByCommunityId(community_id);
    }

    async createPunctuation(createPunctuationDto: CreatePunctuationDto): Promise<Punctuation> {
        try {
            // Validar que solo se envíe person_id O community_id, no ambos
            if (createPunctuationDto.person_id && createPunctuationDto.community_id) {
                throw new BadRequestException('Cannot assign punctuation to both person and community. Choose only one.');
            }

            // Validar que al menos uno esté presente
            if (!createPunctuationDto.person_id && !createPunctuationDto.community_id) {
                throw new BadRequestException('Must assign punctuation to either a person or a community.');
            }

            console.log('Creating punctuation with data:', createPunctuationDto);
            const result = await this.punctuationRepository.createPunctuation(createPunctuationDto);
            console.log('Punctuation created successfully:', result.toJSON());
            
            return result;
        } catch (error) {
            console.error('Error creating punctuation:', error);
            throw error;
        }
    }

    async updatePunctuation(id_punctuation: number, updatePunctuationDto: UpdatePunctuationDto): Promise<Punctuation> {
        try {
            // Verificar que la puntuación existe
            const existingPunctuation = await this.punctuationRepository.findByIdPunctuation(id_punctuation);
            
            if (!existingPunctuation) {
                throw new NotFoundException(`Punctuation with ID ${id_punctuation} not found`);
            }

            // Validar que solo se envíe person_id O community_id, no ambos
            if (updatePunctuationDto.person_id && updatePunctuationDto.community_id) {
                throw new BadRequestException('Cannot assign punctuation to both person and community. Choose only one.');
            }

            // Si se está cambiando la asignación, asegurar que al menos uno esté presente
            const willHavePersonId = updatePunctuationDto.person_id !== undefined ? updatePunctuationDto.person_id : existingPunctuation.person_id;
            const willHaveCommunityId = updatePunctuationDto.community_id !== undefined ? updatePunctuationDto.community_id : existingPunctuation.community_id;

            if (!willHavePersonId && !willHaveCommunityId) {
                throw new BadRequestException('Must assign punctuation to either a person or a community.');
            }

            console.log(`Updating punctuation ${id_punctuation} with data:`, updatePunctuationDto);
            const result = await this.punctuationRepository.updatePunctuation(id_punctuation, updatePunctuationDto);
            
            if (!result) {
                throw new NotFoundException(`Failed to update punctuation with ID ${id_punctuation}`);
            }

            console.log('Punctuation updated successfully:', result.toJSON());
            return result;
        } catch (error) {
            console.error(`Error updating punctuation ${id_punctuation}:`, error);
            throw error;
        }
    }

    async deletePunctuation(id_punctuation: number): Promise<{ message: string }> {
        // Verificar que la puntuación existe antes de eliminar
        const existingPunctuation = await this.punctuationRepository.findByIdPunctuation(id_punctuation);
        
        if (!existingPunctuation) {
            throw new NotFoundException(`Punctuation with ID ${id_punctuation} not found`);
        }

        const deleted = await this.punctuationRepository.deletePunctuation(id_punctuation);
        
        if (!deleted) {
            throw new NotFoundException(`Failed to delete punctuation with ID ${id_punctuation}`);
        }

        return { message: `Punctuation with ID ${id_punctuation} deleted successfully` };
    }

    // Métodos para estadísticas
    async getPersonStats(person_id: number): Promise<{ totalPoints: number; totalBudget: number; punctuations: Punctuation[] }> {
        const [totalPoints, totalBudget, punctuations] = await Promise.all([
            this.punctuationRepository.getTotalPointsByPersonId(person_id),
            this.punctuationRepository.getTotalBudgetByPersonId(person_id),
            this.punctuationRepository.findByPersonId(person_id)
        ]);

        return {
            totalPoints,
            totalBudget,
            punctuations
        };
    }

    async getCommunityStats(community_id: number): Promise<{ totalPoints: number; totalBudget: number; punctuations: Punctuation[] }> {
        const [totalPoints, totalBudget, punctuations] = await Promise.all([
            this.punctuationRepository.getTotalPointsByCommunityId(community_id),
            this.punctuationRepository.getTotalBudgetByCommunityId(community_id),
            this.punctuationRepository.findByCommunityId(community_id)
        ]);

        return {
            totalPoints,
            totalBudget,
            punctuations
        };
    }
}