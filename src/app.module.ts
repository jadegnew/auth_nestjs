import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authModule/authentication.module';
import * as Joi from 'joi';


@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      JWT_ACCESS_SECRET: Joi.string().required(),
      JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
      JWT_REFRESH_SECRET: Joi.string().required(),
      JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
    })
  }), DatabaseModule, UserModule, AuthenticationModule],
})
export class AppModule {}
