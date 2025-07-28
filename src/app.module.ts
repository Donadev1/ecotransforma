import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';
import { ActivityRequestModule } from './modules/activity_request/activity_request.module';
import { VolunteersModule } from './modules/volunteers/volunteers.module';
import { PersonsModule } from './modules/persons/persons.module';
import { CommunityModule } from './modules/community/community.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { PunctuationModule } from './modules/punctuation/punctuation.module';

@Module({
  imports: [DatabaseModule, AuthModule, AdminModule, UsersModule, ActivityRequestModule, VolunteersModule, PersonsModule, CommunityModule, CompaniesModule, PunctuationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
