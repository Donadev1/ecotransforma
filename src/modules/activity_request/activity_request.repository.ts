import { InjectModel } from "@nestjs/sequelize";
import { ActivityRequest } from "src/models/activity-request.model";
import ActivityRequestDto from "./dtos/createActivity.dto";
import { UpdateActivityDto } from "./dtos/updateActivity.dto";

export default class ActivityRequestRepository {


    constructor (
        @InjectModel(ActivityRequest)
        private readonly activityModel: typeof ActivityRequest
    ){}

     
    async FindAll(): Promise<ActivityRequest[]>{
        return this.activityModel.findAll();
    }

    async findByIdActivity(id_request:number): Promise<ActivityRequest|null>{
        return this.activityModel.findByPk(id_request);
    }

     async findByEmail(email:string):Promise<ActivityRequest|null>{
        return this.activityModel.findOne({
            where: { correo_contacto: email }
        });
    }
    
    async CreateActivity(data:ActivityRequestDto):Promise<ActivityRequest>{
        return this.activityModel.create(data);
    }
    
    async UpdateActivity(id_request:number , UpdateActivity:UpdateActivityDto):Promise<ActivityRequest|null>{
        
        const [affectedCount] = await this.activityModel.update(UpdateActivity, {
            where: {id_request}
        });

        if (affectedCount === 0) {
            return null;
        }

        return this.findByIdActivity(id_request);
    }
    
    async DeleteActivity(id_request:number ):Promise<boolean>{
        const deletedCount = await this.activityModel.destroy({
            where:{id_request}
        });

        return deletedCount > 0
    }

   

}