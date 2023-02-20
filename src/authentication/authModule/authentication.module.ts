import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from '../LocalStrategy/local.strategy';
import { JwtStrategy } from '../JwtStrategy/jwt.strategy';
import { RefreshStrategy } from '../RefreshStrategy/refresh.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_ACCESS_EXPIRATION_TIME'),
                },
            }),
        })
    ],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy, RefreshStrategy],
    controllers: [AuthenticationController],
})
export class AuthenticationModule { }
