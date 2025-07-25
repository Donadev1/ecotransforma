import { Module } from '@nestjs/common';
import databaseConfig from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { Volunteers } from 'src/models/voluntarios.model';
import { ActivityRequest } from 'src/models/activity-request.model';
import { Persons } from 'src/models/persons.model';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService
      ): Promise<SequelizeModuleOptions> => {
        return {
          dialect: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          autoLoadModels: true,
          models: [Users, Volunteers, ActivityRequest, Persons],
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
