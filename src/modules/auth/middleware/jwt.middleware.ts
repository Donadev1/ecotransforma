// src/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_jwt_secret'), // Asegúrate de tenerlo en tu .env
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.sub);

    if (!user) {
      return null;
    }

    return {
      id_user: user.id_user,
      nombre: user.nombre,
      rol: user.rol,
    };
  }
}
