import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Min } from "sequelize-typescript";

export class createCommunityDto{
    
    @IsNotEmpty()
    @IsInt() 
    @Min(1) 
    user_id:number

    @IsNotEmpty()
    @IsString()
    name_community:string;

    @IsNotEmpty()
    @IsString()
    ubicacion:string
    
    @IsNotEmpty()
    @IsString()
    representante:string
}