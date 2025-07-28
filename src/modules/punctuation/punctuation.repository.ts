import { InjectModel } from "@nestjs/sequelize";
import { Punctuation } from "src/models/punctuation.model";
import { Persons } from "src/models/persons.model";
import { Community } from "src/models/community.model";
import { CreatePunctuationDto } from './dtos/createdto'
import { UpdatePunctuationDto } from "./dtos/updatedto";

export class PunctuationRepository {
    constructor(
        @InjectModel(Punctuation)
        private readonly punctuationModel: typeof Punctuation
    ) {}

    async findAll(): Promise<Punctuation[]> {
        return this.punctuationModel.findAll({
            include: [
                {
                    model: Persons,
                    as: 'person',
                    required: false
                },
                {
                    model: Community,
                    as: 'community',
                    required: false
                }
            ],
            order: [['fecha', 'DESC']]
        });
    }

    async findByIdPunctuation(id_punctuation: number): Promise<Punctuation | null> {
        return this.punctuationModel.findByPk(id_punctuation, {
            include: [
                {
                    model: Persons,
                    as: 'person',
                    required: false
                },
                {
                    model: Community,
                    as: 'community',
                    required: false
                }
            ]
        });
    }

    async findByPersonId(person_id: number): Promise<Punctuation[]> {
        return this.punctuationModel.findAll({
            where: { person_id },
            include: [
                {
                    model: Persons,
                    as: 'person'
                }
            ],
            order: [['fecha', 'DESC']]
        });
    }

    async findByCommunityId(community_id: number): Promise<Punctuation[]> {
        return this.punctuationModel.findAll({
            where: { community_id },
            include: [
                {
                    model: Community,
                    as: 'community'
                }
            ],
            order: [['fecha', 'DESC']]
        });
    }

    async createPunctuation(createPunctuationDto: CreatePunctuationDto): Promise<Punctuation> {
        return this.punctuationModel.create(createPunctuationDto);
    }

    async updatePunctuation(id_punctuation: number, updatePunctuationDto: UpdatePunctuationDto): Promise<Punctuation | null> {
        const [affectedCount] = await this.punctuationModel.update(updatePunctuationDto, {
            where: { id_punctuation }
        });

        if (affectedCount === 0) {
            return null;
        }

        return this.findByIdPunctuation(id_punctuation);
    }

    async deletePunctuation(id_punctuation: number): Promise<boolean> {
        const deletedCount = await this.punctuationModel.destroy({
            where: { id_punctuation }
        });
        return deletedCount > 0;
    }

    // Métodos adicionales para estadísticas
    async getTotalPointsByPersonId(person_id: number): Promise<number> {
        const result = await this.punctuationModel.sum('puntos', {
            where: { person_id }
        });
        return result || 0;
    }

    async getTotalPointsByCommunityId(community_id: number): Promise<number> {
        const result = await this.punctuationModel.sum('puntos', {
            where: { community_id }
        });
        return result || 0;
    }

    async getTotalBudgetByPersonId(person_id: number): Promise<number> {
        const result = await this.punctuationModel.sum('presupuesto', {
            where: { person_id }
        });
        return result || 0;
    }

    async getTotalBudgetByCommunityId(community_id: number): Promise<number> {
        const result = await this.punctuationModel.sum('presupuesto', {
            where: { community_id }
        });
        return result || 0;
    }
}