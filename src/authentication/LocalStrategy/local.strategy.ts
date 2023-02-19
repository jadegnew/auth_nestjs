import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authModule/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authenticationService: AuthenticationService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string) {
        return this.authenticationService.login(email, password);
    }
}