import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthenticationService, LocalStrategy],
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}
