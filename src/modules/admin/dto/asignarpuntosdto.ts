import { IsNumber, Min } from 'class-validator';

export class CalculatePointsDto {
  @IsNumber()
  @Min(0)
  monto: number;
}
