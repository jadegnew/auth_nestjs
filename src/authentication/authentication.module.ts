import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                },
            }),
        })
    ],
    providers: [AuthenticationService, LocalStrategy],
    controllers: [AuthenticationController],
})
export class AuthenticationModule { }
