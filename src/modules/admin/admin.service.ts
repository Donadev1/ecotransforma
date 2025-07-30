import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePunctuationDto } from '../punctuation/dtos/createdto';
import { PunctuationService } from '../punctuation/punctuation.service';
import { CalculatePointsDto } from './dto/asignarpuntosdto';

@Injectable()
export class AdminService {
  constructor(private readonly punctuationService: PunctuationService) {}

  async assignPoints(dto: CreatePunctuationDto) {
   
    if (dto.person_id && dto.community_id) {
      throw new BadRequestException('Solo se puede asignar puntos a una persona o comunidad, no a ambas.');
    }

    if (!dto.person_id && !dto.community_id) {
      throw new BadRequestException('Debe asignar puntos a una persona o comunidad.');
    }

    return await this.punctuationService.createPunctuation(dto);
  }

 
  calculateFromAmount(dto: CalculatePointsDto) {
    const porcentajePresupuesto = 0.10;
    const valorPorPunto = 1000;

    const presupuesto = dto.monto * porcentajePresupuesto;
    const puntos = Math.floor(presupuesto / valorPorPunto);

    return { presupuesto, puntos };
  }
}
