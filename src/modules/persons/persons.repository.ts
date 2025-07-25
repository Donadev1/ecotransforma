import { InjectModel } from "@nestjs/sequelize";
import { Persons } from "src/models/persons.model";
import { CreatePersonDto } from "./dtos/createpersondto";
import { UpdatePersonDto } from "./dtos/updatepersondto";

export default class PersonRepository{

    constructor(
        @InjectModel(Persons)

        private readonly personModel: typeof Persons
    ){}

    async findAllPersons():Promise <Persons[]> {
        return this.personModel.findAll();
    }

    async findbyIdPerson (id_person:number):Promise <Persons | null>  {
        return this.personModel.findByPk(id_person);
    }

    async findphone(phone:string):Promise<Persons | null>{
        return this.personModel.findOne({
            where:{phone}
        });
    }
    async CreatePerson(createPerson:CreatePersonDto):Promise<Persons>{
        return this.personModel.create(createPerson)
    }

    async updatePerson(id_person:number ,updatePerson:UpdatePersonDto):Promise<Persons| null>{
        const [affectedCount] = await this.personModel.update(updatePerson, {
                where: {id_person}
            });
    
            if (affectedCount === 0) {
                return null;
            }
    
        return this.findbyIdPerson(id_person);
    }

    async DeletePerson(id_person:number):Promise <Boolean>{
         const deletedCount = await this.personModel.destroy({
                where: { id_person },
            });

        return deletedCount > 0;
    }
}
  
