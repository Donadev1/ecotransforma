import {Controller,Get,Post,Put,Delete,Body,Param,ParseIntPipe,HttpException,HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios
  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error al obtener los usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Obtener usuario por ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Usuario no encontrado',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  // Obtener usuario por email (si lo usas como endpoint directo)
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      return await this.usersService.findByEmail(email);
    } catch (error) {
      throw new HttpException(
        error.message || 'Usuario no encontrado',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  // Crear nuevo usuario
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar usuario
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar el usuario',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  // Eliminar usuario
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.delete(id);
      return { message: `Usuario con ID ${id} eliminado correctamente` };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar el usuario',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }
}
