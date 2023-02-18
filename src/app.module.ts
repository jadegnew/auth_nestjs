import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
  providers: [AuthenticationService],
  controllers: [AppController],
})
export class AppModule {}
