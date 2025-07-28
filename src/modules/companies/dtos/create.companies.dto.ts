import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateCompaniesDto {


    @IsNotEmpty()
    @IsInt()
    @Min(1)
    user_id:number;

    @IsNotEmpty()
    @IsString()
    razon_social:string;

    @IsNotEmpty()
    @IsString()
    nit:string;

    @IsNotEmpty()
    @IsString()
    address:string;

    @IsNotEmpty()
    @IsString()
    phone:string;


}