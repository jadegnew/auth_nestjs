import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthenticationModule],
})
export class AppModule {}
