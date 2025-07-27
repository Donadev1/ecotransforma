import { Injectable, NotFoundException } from '@nestjs/common';
import PersonRepository from './persons.repository';
import { Persons } from 'src/models/persons.model';
import { CreatePersonDto } from './dtos/createpersondto';
import { UpdatePersonDto } from './dtos/updatepersondto';

@Injectable()
export class PersonsService {
    constructor(
        private readonly personRepository: PersonRepository
    ){}

    async findAllPersons():Promise <Persons[]>{
        return this.personRepository.findAllPersons()
    }

    async findbyIdPerson (id_person:number):Promise <Persons | null>{
        return this.personRepository.findbyIdPerson(id_person)
    }

    async findphone(phone:string):Promise<Persons | null>{
        return this.personRepository.findphone(phone)
    }

    async CreatePerson(createPerson:CreatePersonDto):Promise<Persons>{
        try {

            const Exist = await this.findphone(createPerson.phone)
            
            if (Exist) {
                throw new NotFoundException(`ya hay un registrado con este correo ${Exist}`);
            }

            return this.personRepository.CreatePerson(createPerson)

        } catch (error) {

            console.error(error);
            throw error;
        
        }
    }

    async updatePerson(id_person:number ,updatePerson:UpdatePersonDto):Promise<Persons| null>{
        try {
            const ExistPerson = await this.findbyIdPerson(id_person);

            if (!ExistPerson) {
                throw new NotFoundException(`No hay un registro con este este id ${ExistPerson}`);
            }

            return this.personRepository.updatePerson(id_person ,updatePerson);

        } catch (error) {
            
            console.error(error);
            
            throw error;
        
        }
    }

    async delete(id_person: number): Promise<Boolean>{

        const success = await this.personRepository.findbyIdPerson(id_person)

        if (!success) {
            throw new NotFoundException(
            `No existe persona con ID ${id_person}`,
            );   
        }
        return await this.personRepository.DeletePerson(id_person)
    }


}
