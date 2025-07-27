import { InjectModel } from "@nestjs/sequelize";
import { Community } from "src/models/community.model";
import { createCommunityDto } from "./dtos/createCommunity";
import { UpdateCommunityDto } from "./dtos/updateCommunity";

export class CommunityRepository {
    constructor(
            @InjectModel(Community)
    
            private readonly communityModel: typeof Community
        ){}
    
        async findAllPersons():Promise <Community[]> {
            return this.communityModel.findAll();
        }
    
        async findbyIdCommunity (id_community:number):Promise <Community | null>  {
            return this.communityModel.findByPk(id_community);
        }
    
        async findbyName(name_community:string):Promise<Community|null>{
            return this.communityModel.findOne({
                where:{name_community}
            })
        }

        async CreatePerson(createCommunity:createCommunityDto):Promise<Community>{
            return this.communityModel.create(createCommunity)
        }
    
        async updatePerson(id_community:number ,updateCommunity:UpdateCommunityDto):Promise<Community| null>{
            const [affectedCount] = await this.communityModel.update(updateCommunity, {
                    where: {id_community}
                });
        
                if (affectedCount === 0) {
                    return null;
                }
        
            return this.findbyIdCommunity(id_community);
        }
    
        async DeletePerson(id_community:number):Promise <Boolean>{
             const deletedCount = await this.communityModel.destroy({
                    where: { id_community },
                });
    
            return deletedCount > 0;
        }
}