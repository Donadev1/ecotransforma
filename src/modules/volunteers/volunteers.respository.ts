import { InjectModel } from "@nestjs/sequelize";
import { Volunteers } from "src/models/voluntarios.model";
import CreateVolunteersDto from "./dtos/create.volunteersdto";
import { UpdateVolunteersDto } from "./dtos/update.volunteersdto";


export default class VolunteersRepository{

    constructor(
        @InjectModel(Volunteers)
        private  readonly VolunteersModel: typeof Volunteers
    ){}

    async findAll():Promise<Volunteers[]>{
        return this.VolunteersModel.findAll();
    }

    async getByIdVolunteer(id_volunteer:number):Promise<Volunteers|null>{
        return this.VolunteersModel.findByPk(id_volunteer)
    }

    async findByIdVolunteer(id_volunteer:number): Promise<Volunteers|null>{
            return this.VolunteersModel.findByPk(id_volunteer);
    }
    async findByEmail(email: string): Promise<Volunteers | null> {
        return this.VolunteersModel.findOne({
          where: { email },
        });
    }
    async createVolunteer(userData: CreateVolunteersDto): Promise<Volunteers> {
        return this.VolunteersModel.create(userData);
    }
    async UpdateVolunteer(id_volunteer:number , UpdateActivity:UpdateVolunteersDto):Promise<Volunteers|null>{
            
            const [affectedCount] = await this.VolunteersModel.update(UpdateActivity, {
                where: {id_volunteer}
            });
    
            if (affectedCount === 0) {
                return null;
            }
    
            return this.findByIdVolunteer(id_volunteer);
        }

        async DeleteVolunteer(id_volunteer:number ):Promise<boolean>{
        const deletedCount = await this.VolunteersModel.destroy({
            where:{id_volunteer}
        });

        return deletedCount > 0
    }

}