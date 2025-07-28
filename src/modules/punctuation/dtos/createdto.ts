import { IsNotEmpty, IsInt, IsString, IsOptional, IsNumber, Min, ValidateIf, IsDecimal } from "class-validator";

export class CreatePunctuationDto {
    @ValidateIf(o => !o.community_id) // Requerido si no hay community_id
    @IsOptional()
    @IsInt()
    @Min(1)
    person_id?: number;

    @ValidateIf(o => !o.person_id) // Requerido si no hay person_id
    @IsOptional()
    @IsInt()
    @Min(1)
    community_id?: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    puntos: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    presupuesto: number;

    @IsNotEmpty()
    @IsString()
    motivo: string;

    @IsOptional()
    @IsString()
    observacion?: string;
}