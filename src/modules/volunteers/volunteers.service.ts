import { Injectable, NotFoundException } from '@nestjs/common';
import VolunteersRepository from './volunteers.respository';
import { Volunteers } from 'src/models/voluntarios.model';
import CreateVolunteersDto from './dtos/create.volunteersdto';
import { UpdateVolunteersDto } from './dtos/update.volunteersdto';

@Injectable()
export class VolunteersService {
    constructor(
        private readonly volunteerRepository:VolunteersRepository
    ){}

    async findAll(): Promise<Volunteers[]> {
        return this.volunteerRepository.findAll();
      }
    
      // Obtener usuario por ID
      async findById(id_volunteer: number): Promise<Volunteers> {
        const user = await this.volunteerRepository.findByIdVolunteer(id_volunteer);
        if (!user) {
          throw new NotFoundException(`Usuario con ID ${id_volunteer} no encontrado`);
        }
        return user;
      }
    
      // Obtener usuario por correo (para login o validaciones)
      async findByEmail(email: string): Promise<Volunteers| null> {
      return await this.volunteerRepository.findByEmail(email);
    }
    
    
      // Crear nuevo usuario
      async createVolunteer(data:CreateVolunteersDto):Promise<Volunteers>{
              try {
                  
                  const Exist = await this.findByEmail(data.email);
              
                  if (Exist) {
                      throw new NotFoundException(`ya hay un registrado con este correo ${Exist}`);
                  }
      
                  return this.volunteerRepository.createVolunteer(data);
              
              } catch (error) {
                  
                  console.error(error);
                  throw error;
              }
          }
    
      // Actualizar usuario por ID
      async update(id_volunteer: number, userData: UpdateVolunteersDto): Promise<Volunteers|null > {

       try {
            
            const ExistVolunteer = await this.volunteerRepository.findByIdVolunteer(id_volunteer)

            if (!ExistVolunteer) {
                throw new NotFoundException(
                `No se pudo actualizar la actividad con ID ${id_volunteer}`
                );
            }

            return this.volunteerRepository.UpdateVolunteer(id_volunteer, userData);
        
        } catch (error) {
            console.error(error);
            throw error;
        }
      }
    
      // Eliminar usuario por ID
      async delete(id_volunteer: number): Promise<boolean> {
        const success = await this.volunteerRepository.findByIdVolunteer(id_volunteer);
        if (!success) {
          throw new NotFoundException(
            `No se pudo eliminar el usuario con ID ${id_volunteer}`,
          );
        }
        return await this.volunteerRepository.DeleteVolunteer(id_volunteer)
      }
}
