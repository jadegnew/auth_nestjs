import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthenticationModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AppModule {}
