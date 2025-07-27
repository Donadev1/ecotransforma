import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

 
 export default class CreateVolunteersDto{
    
   @IsNotEmpty()
    @IsString()
    nombre: string;
   
    @MaxLength(20)
    @IsNotEmpty()
    @IsString()
    phone: string;
    

    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsArray()
    @IsString({each:true})
    @IsNotEmpty()
    disponibilidad_dias: string[];
 
    @IsOptional()
    @IsString()
    mensaje?:string;
 }
