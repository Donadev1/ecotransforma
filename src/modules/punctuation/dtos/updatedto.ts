import { IsOptional, IsInt, IsString, IsNumber, Min, ValidateIf } from "class-validator";

export class UpdatePunctuationDto {
    @IsOptional()
    @ValidateIf(o => !o.community_id)
    @IsInt()
    @Min(1)
    person_id?: number;

    @IsOptional()
    @ValidateIf(o => !o.person_id)
    @IsInt()
    @Min(1)
    community_id?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    puntos?: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    presupuesto?: number;

    @IsOptional()
    @IsString()
    motivo?: string;

    @IsOptional()
    @IsString()
    observacion?: string;
}