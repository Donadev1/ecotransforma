import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createuser.dto';
import LoginDto from './dto/LoginDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
}


  
  @Post('register')
async register(@Body() createUserDto: CreateUserDto) {
  return this.authService.register(createUserDto);
}

}
