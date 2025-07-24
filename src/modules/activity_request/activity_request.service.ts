import { Injectable, NotFoundException } from '@nestjs/common';
import ActivityRequestRepository from './activity_request.repository';
import { ActivityRequest } from 'src/models/activity-request.model';
import ActivityRequestDto from './dtos/createActivity.dto';
import { UpdateActivityDto } from './dtos/updateActivity.dto';

@Injectable()
export class ActivityRequestService {
    
    constructor(
        private readonly activityRepository: ActivityRequestRepository
    ){}

    async findAll():Promise<ActivityRequest[]>{
        return this.activityRepository.FindAll();
    }

    async findById(id_request:number):Promise<ActivityRequest | null >{
        
        const activity = await this.activityRepository.findByIdActivity(id_request)

        if (!activity) {
            throw new NotFoundException(`Evento no encontrado ${id_request}`);
        }
        return activity
    }

    async findByEmail(email:string):Promise<ActivityRequest|null>{
         return this.activityRepository.findByEmail(email);
    }

    async createActivity(data:ActivityRequestDto):Promise<ActivityRequest>{
        try {
            
            const Exist = await this.findByEmail(data.correo_contacto);
        
            if (Exist) {
                throw new NotFoundException(`ya hay una actividad registrada con este correo ${Exist}`);
            }

            return this.activityRepository.CreateActivity(data);
        
        } catch (error) {
            
            console.error(error);
            throw error;
        }
    }


    async UpdateActivity(id_request:number, updateActivityDto:UpdateActivityDto):Promise<ActivityRequest | null> {
        try {
            
            const ExistActivity = await this.activityRepository.findByIdActivity(id_request)

            if (!ExistActivity) {
                throw new NotFoundException(
                `No se pudo actualizar la actividad con ID ${id_request}`
                );
            }

            return this.activityRepository.UpdateActivity(id_request,updateActivityDto);
        
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async DeleteActivity(id_request:number):Promise<void>{
        const success = await this.activityRepository.DeleteActivity(id_request);
        if (!success) {
            throw new NotFoundException(`no se pudo eliminar la actividad con id ${id_request}`);
        }
    }

}
