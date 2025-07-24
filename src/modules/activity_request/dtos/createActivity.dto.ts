import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { tipo_lugar } from 'src/types/tipo_lugar';
 
export default class ActivityRequestDto{

    @IsNotEmpty()
    tipo_lugar:tipo_lugar;

    @MaxLength(40)
    @IsString()
    @IsNotEmpty()
    nombre_contacto: string;

    @MaxLength(40)
    @IsString()
    @IsNotEmpty()
    nombre_lugar: string;
    
    @MaxLength(10)
    @IsString()
    @IsNotEmpty()
    telefono_contacto: string;
    
    @MaxLength(40)
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    correo_contacto: string;
    
    @MaxLength(40)
    @IsString()
    @IsNotEmpty()
    direccion: string;
    
    
    @IsString()
    @IsNotEmpty()
    actividades: string[];
    
    @IsOptional()
    @IsString()
    mensaje?: string;
}