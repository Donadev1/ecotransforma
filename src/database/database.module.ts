import { Module } from '@nestjs/common';
import databaseConfig from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import {  Volunteers } from 'src/models/voluntarios.model';
import { ActivityRequest } from 'src/models/activity-request.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        //console.log(configService.get('database')); // para verificar si se carga
        return {
          dialect: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          autoLoadModels: true,
          models: [Users, Volunteers, ActivityRequest],
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
