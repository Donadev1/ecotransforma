import { IsNotEmpty, IsInt, IsString, Min } from "class-validator";

export class CreatePersonDto{

    @IsNotEmpty()
    @IsInt() 
    @Min(1) // Mayor a 0
    user_id: number;
    
    @IsNotEmpty()
    @IsString()
    address: string;
    
    @IsNotEmpty()
    @IsString()
    phone: string;
    
    @IsNotEmpty()
    @IsString()
    neighborhood: string;
}