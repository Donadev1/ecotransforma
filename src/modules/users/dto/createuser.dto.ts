import { Rol } from '../../../types/rol';

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  contrasena: string;

  @IsNotEmpty()
  rol: Rol;
}
