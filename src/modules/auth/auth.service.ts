import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Users } from 'src/models/users.model';
import { CreateUserDto } from '../users/dto/createuser.dto';
import { dot } from 'node:test/reporters';
import LoginDto from './dto/LoginDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida credenciales de login
  async validateUser(email: string, contrasena: string): Promise<Users> {
    
    const user = await this.usersService.findByEmail(email);

    //depracion
     //console.log('Usuario encontrado:', user);
     //console.log('Password recibido:', contrasena);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  async login(dto:LoginDto) {
    try {
      const user = await this.validateUser(dto.email, dto.contrasena);

      const payload = {
        username: user.nombre,
        rol: user.rol,
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          nombre: user.nombre,
          rol: user.rol,
        },
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      console.error('Error inesperado en login:', error);
      throw new InternalServerErrorException(
        'Error interno al intentar iniciar sesión',
      );
    }
  }

  async validateUserById(userId: number): Promise<Users | null> {
    return this.usersService.findById(userId);
  }

  
  // Registro de nuevos usuarios
  async register(createUserDto: CreateUserDto) {
  try {
    console.log('Intentando registrar usuario:', createUserDto);

    const existUser = await this.usersService.findByEmail(createUserDto.email);
    if (existUser) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.contrasena, 10);

    const userData = {
      ...createUserDto,
      contrasena: hashedPassword,
    };

    const user = await this.usersService.create(userData);

    // Excluye la contraseña antes de devolver la respuesta
    const { contrasena, ...safeUser } = user.toJSON();
    return safeUser;
    
  } catch (error) {
    console.error('Error durante el registro:', error);
    
    // Reenvía errores conocidos o lanza un error genérico
    if (error instanceof BadRequestException) {
      throw error;
    }

    throw new InternalServerErrorException('Error al registrar el usuario');
  }
}

}

