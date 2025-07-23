import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Users } from 'src/models/users.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // Obtener todos los usuarios
  async findAll(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  // Obtener usuario por ID
  async findById(id_user: number): Promise<Users> {
    const user = await this.usersRepository.findById(id_user);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id_user} no encontrado`);
    }
    return user;
  }

  // Obtener usuario por correo (para login o validaciones)
  async findByEmail(email: string): Promise<Users | null> {
  return await this.usersRepository.findByEmail(email);
}


  // Crear nuevo usuario
  async create(userData: CreateUserDto): Promise<Users> {
    return this.usersRepository.create(userData);
  }

  // Actualizar usuario por ID
  async update(id_user: number, userData: UpdateUserDto): Promise<Users> {
    const updatedUser = await this.usersRepository.update(id_user, userData);
    if (!updatedUser) {
      throw new NotFoundException(
        `No se pudo actualizar el usuario con ID ${id_user}`,
      );
    }
    return updatedUser;
  }

  // Eliminar usuario por ID
  async delete(id_user: number): Promise<void> {
    const success = await this.usersRepository.delete(id_user);
    if (!success) {
      throw new NotFoundException(
        `No se pudo eliminar el usuario con ID ${id_user}`,
      );
    }
  }
}
