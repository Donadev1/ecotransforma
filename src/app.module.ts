import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, AdminModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
