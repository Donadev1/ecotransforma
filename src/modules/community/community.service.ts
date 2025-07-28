import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunityRepository } from './community.repository';
import { Community } from 'src/models/community.model';
import { createCommunityDto } from './dtos/createCommunity';
import { UpdateCommunityDto } from './dtos/updateCommunity';

@Injectable()
export class CommunityService {
    constructor(
        private readonly communityRepository: CommunityRepository
    ){}

        async findAll():Promise <Community[]>{
           return this.communityRepository.findAll()
       }
   
        async findbyIdCommunity(id_person:number):Promise <Community | null>{
           return this.communityRepository.findbyIdCommunity(id_person)
       }
   
        async findnameCommunity(name_community:string):Promise<Community | null>{
           return this.communityRepository.findbyName(name_community)
       }
   
        async CreateCommunity(create:createCommunityDto):Promise<Community>{
           try {
   
               const Exist = await this.findnameCommunity(create.name_comumnity)
               
               if (Exist) {
                   throw new NotFoundException(`ya hay una comunidad registrado con este correo`);
               }
   
               return this.communityRepository.CreatePerson(create)
   
           } catch (error) {
   
               console.error(error);
               throw error;
           
           }
       }
   
        async updateCommunity(id_community:number ,update:UpdateCommunityDto):Promise<Community| null>{
           try {
               const ExistPerson = await this.findbyIdCommunity(id_community);
   
               if (!ExistPerson) {
                   throw new NotFoundException(`No hay un registro con este este id ${ExistPerson}`);
               }
   
               return this.communityRepository.updatePerson(id_community ,update);
   
           } catch (error) {
               
               console.error(error);
               
               throw error;
           
           }
       }
   
        async deleteCommunity(id_community: number): Promise<Boolean>{
   
           const success = await this.communityRepository.findbyIdCommunity(id_community)
   
           if (!success) {
               throw new NotFoundException(
               `No existe persona con ID ${id_community}`,
               );   
           }
           return await this.communityRepository.DeletePerson(id_community)
       }

}
