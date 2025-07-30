import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePunctuationDto } from '../punctuation/dtos/createdto';
import { CalculatePointsDto } from './dto/asignarpuntosdto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Ruta para asignar puntos
  @Post('assign')
  async assignPoints(@Body() dto: CreatePunctuationDto) {
    return this.adminService.assignPoints(dto);
  }

  // Ruta tipo calculadora que devuelve puntos y presupuesto
  @Post('calculate')
  calculate(@Body() dto: CalculatePointsDto) {
    return this.adminService.calculateFromAmount(dto);
  }
}
